import Environment from '../config/environment';
import nestProfile from '../utils/nest-profile';

const { SupportServiceHost } = Environment;

const SELECTION_API_URL = (geotype = 'boroughs', geoid = 'NYC') => `${SupportServiceHost}/selection/${geotype}/${geoid}`;

const COMPARISON_GEO_OPTIONS_URL = `${SupportServiceHost}/geo-options`;


export default async function fetchExplorerModel(store, geotype, geoid, compareTo = '0') {
  let selectionResponse = null;
  let acsProfileResponse = null;
  let decennialProfileResponse = null;

  selectionResponse = await fetch(SELECTION_API_URL(geotype, geoid));
  selectionResponse = await selectionResponse.json();

  acsProfileResponse = await store.query('acsRow', {geotype, geoid, compareTo });
  acsProfileResponse = acsProfileResponse.toArray();

  decennialProfileResponse = await store.query('decennialRow', { geotype, geoid, compareTo });
  decennialProfileResponse = decennialProfileResponse.toArray();

  const nestedACSModel = nestProfile(acsProfileResponse, 'variable');
  const nestedDecennialModel = nestProfile(decennialProfileResponse, 'variable');

  let comparisonGeoOptions = await fetch(COMPARISON_GEO_OPTIONS_URL);
  comparisonGeoOptions = await comparisonGeoOptions.json();

  return {
    selectionOrGeoid: geoid,
    selection: selectionResponse,
    acs: nestedACSModel,
    decennial: nestedDecennialModel,
    comparisonGeoOptions
  };
}
