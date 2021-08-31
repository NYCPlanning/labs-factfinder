import Environment from '../config/environment';
import nestProfile from '../utils/nest-profile';

const { SupportServiceHost } = Environment;

const SELECTION_API_URL = id => `${SupportServiceHost}/selection/${id}`;

const COMPARISON_GEO_OPTIONS_URL = `${SupportServiceHost}/geo-options`;

export default async function fetchExplorerModel(store, id, compareTo = '0') {

  let selectionResponse = null;
  let acsSurveyResponse = null;
  let decennialSurveyResponse = null;
  let selectionId = id || "0"; // "0" maps to 'nyc'

  selectionResponse = await fetch(SELECTION_API_URL(id));
  selectionResponse = await selectionResponse.json();

  acsSurveyResponse = await store.query('acsRow', { selectionId, compareTo });
  acsSurveyResponse = acsSurveyResponse.toArray();

  decennialSurveyResponse = await store.query('decennialRow', { selectionId, compareTo });
  decennialSurveyResponse = decennialSurveyResponse.toArray();

  const nestedACSModel = nestProfile(acsSurveyResponse, 'variable');
  const nestedDecennialModel = nestProfile(decennialSurveyResponse, 'variable');

  let comparisonGeoOptions = await fetch(COMPARISON_GEO_OPTIONS_URL);
  comparisonGeoOptions = await comparisonGeoOptions.json();

  return {
    selectionOrGeoid: id,
    selection: selectionResponse,
    acs: nestedACSModel,
    decennial: nestedDecennialModel,
    comparisonGeoOptions
  };
}
