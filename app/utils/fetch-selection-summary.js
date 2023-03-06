import Environment from '../config/environment';

const { SupportServiceHost } = Environment;

const SELECTION_SUMMARY_API_URL = (survey = 'decennial', summaryVars = 'pop1,hunits') => `${SupportServiceHost}/summary/${survey}/${summaryVars}`;

export default async function fetchSelectionSummary(survey, summaryVars, geoid) {
  let selectionResponse = {totals: { hunits: 0, pop1: 0 }};
  // to ensure we don't receive errors from the URLs being too long, we limit the selections to 500 geoids
  // The limit can be increased when indices are added to the geoids in the pff db
  if (geoid.length > 500) {
    selectionResponse = null;

    return selectionResponse;

  } else if (geoid.length) {
    const response = await fetch(SELECTION_SUMMARY_API_URL(survey, summaryVars), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(geoid),
    });

    selectionResponse = response.json();

    return selectionResponse;
  }

  return null;
}
