import Environment from '../config/environment';
import nestSurvey from './nest-survey';

const { SupportServiceHost } = Environment;

// TODO: Rename endpoint to geography
const SELECTION_API_URL = (geotype = 'cities', geoid = 'NYC') => `${SupportServiceHost}/selection/${geotype}/${geoid}`;

const COMPARISON_GEO_OPTIONS_URL = `${SupportServiceHost}/geo-options`;


export default async function fetchExplorerModel(store, geotype, geoid, compareTo = '0') {
  let selectionResponse = null;
  let acsSurveyResponse = null;
  let decennialSurveyResponse = null;

  selectionResponse = await fetch(SELECTION_API_URL(geotype, geoid));
  selectionResponse = await selectionResponse.json();

  acsSurveyResponse = await store.query('acsRow', {geotype, geoid, compareTo });
  acsSurveyResponse = acsSurveyResponse.toArray();

  decennialSurveyResponse = await store.query('decennialRow', { geotype, geoid, compareTo });
  decennialSurveyResponse = decennialSurveyResponse.toArray();

  const nestedACSModel = nestSurvey(acsSurveyResponse, 'variable');
  const nestedDecennialModel = nestSurvey(decennialSurveyResponse, 'variable');

  let comparisonGeoOptions = await fetch(COMPARISON_GEO_OPTIONS_URL);
  comparisonGeoOptions = await comparisonGeoOptions.json();

  return {
    geoid,
    geotype,
    selection: selectionResponse,
    acs: nestedACSModel,
    decennial: nestedDecennialModel,
    comparisonGeoOptions
  };
}
