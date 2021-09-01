import Environment from '../config/environment';
import nestProfile from '../utils/nest-profile';

const { SupportServiceHost } = Environment;

const SELECTION_API_URL = (geotype = 'boroughs', geoid = 'NYC') => `${SupportServiceHost}/selection/${geotype}/${geoid}`;

const COMPARISON_GEO_OPTIONS_URL = `${SupportServiceHost}/geo-options`;

export default async function fetchExplorerModel(store, geotype, geoid, compareTo) {
  let selectionResponse = null;
  let profileResponse = null;

  selectionResponse = await fetch(SELECTION_API_URL(geotype, geoid));
  selectionResponse = await selectionResponse.json();

  profileResponse = await store.query('row', {geotype, geoid, compareTo});
  profileResponse = profileResponse.toArray();

  const nestedProfileModel = nestProfile(profileResponse, 'variable');

  let comparisonGeoOptions = await fetch(COMPARISON_GEO_OPTIONS_URL);
  comparisonGeoOptions = await comparisonGeoOptions.json();

  return {
    selectionOrGeoid: geoid,
    selection: selectionResponse,
    profile: nestedProfileModel,
    comparisonGeoOptions
  };
}
