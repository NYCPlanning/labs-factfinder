import Environment from '../config/environment';

const { SupportServiceHost } = Environment;

const SELECTION_SUMMARY_API_URL = (survey = 'decennial', summaryVars = 'pop1,hunits', geoid = '0') => `${SupportServiceHost}/summary/${survey}/${summaryVars}/${geoid}`;

const maxGeoidLength = 500;

export default async function fetchSelectionSummary(survey, summaryVars, geoid) {
  try {
    let selectionResponse = {totals: { hunits: 0, pop1: 0 }};
    // to ensure we don't receive errors from the URLs being too long, we limit the selections to 500 geoids
    // The limit can be increased when indices are added to the geoids in the pff db
    if (geoid.length > maxGeoidLength) {
      selectionResponse = null;

      return selectionResponse

    } else if (geoid.length) {
      let selectionResponse = null;
      selectionResponse = await fetch(SELECTION_SUMMARY_API_URL(survey, summaryVars, geoid));
      selectionResponse = await selectionResponse.json();

      return selectionResponse;
    }

    return null;

  } catch (e) {
    throw Error(`Error in fetching selection summary`, e);
  }
}
