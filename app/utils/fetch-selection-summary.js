import Environment from '../config/environment';

const { SupportServiceHost } = Environment;

const SELECTION_SUMMARY_API_URL = (survey = 'decennial', summaryVars = 'pop1,hunits', geoid = '0') => `${SupportServiceHost}/summary/${survey}/${summaryVars}/${geoid}`;
const SELECTION_SUMMARY_API_URL_POST = (survey = 'decennial', summaryVars = 'pop1,hunits') => `${SupportServiceHost}/summary/${survey}/${summaryVars}`;

export default async function fetchSelectionSummary(survey, summaryVars, geoid) {
  let selectionResponse = {totals: { hunits: 0, pop1: 0 }};
  // to ensure we don't receive errors from the URLs being too long, we limit the selections to 1500 geoids
  if (geoid.length > 5000) {
    selectionResponse = null;

    return selectionResponse;

  } else if (geoid.length > 100) {
    const response = await fetch(SELECTION_SUMMARY_API_URL_POST(survey, summaryVars), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(geoid),
    });

    selectionResponse = response.json();

    return selectionResponse;
  } else if (geoid.length) {
      selectionResponse = await fetch(SELECTION_SUMMARY_API_URL(survey, summaryVars, geoid));
      selectionResponse = await selectionResponse.json();

      return selectionResponse;
  }

  return null;
}
