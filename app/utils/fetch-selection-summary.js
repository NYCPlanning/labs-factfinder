import Environment from '../config/environment';

const { SupportServiceHost } = Environment;

const SELECTION_SUMMARY_API_URL = (survey = 'decennial', summaryVars = 'pop1,hunits', geoid = '0') => `${SupportServiceHost}/summary/${survey}/${summaryVars}/${geoid}`;


export default async function fetchSelectionSummary(survey, summaryVars, geoid) {
  if(geoid.length) {
    let selectionResponse = null;
    selectionResponse = await fetch(SELECTION_SUMMARY_API_URL(survey, summaryVars, geoid));
    selectionResponse = await selectionResponse.json();
    return selectionResponse;
  }
  return null;
}
