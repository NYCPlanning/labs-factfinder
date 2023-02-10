import Environment from '../config/environment';

const { SupportServiceHost } = Environment;

const SELECTION_SUMMARY_API_URL = (survey = 'decennial', summaryVars = 'pop1,hunits', geoid = '0') => `${SupportServiceHost}/summary/${survey}/${summaryVars}/${geoid}`;
const SELECTION_SUMMARY_API_URL_POST = (survey = 'decennial', summaryVars = 'pop1,hunits') => `${SupportServiceHost}/summary/${survey}/${summaryVars}`;

export default async function fetchSelectionSummary(survey, summaryVars, geoid) {
  // to ensure we don't receive errors from the URLs being too long, we do multiple queries of 500 items each
  if (geoid.length > 7000) {
    let selectionResponse = {totals: { hunits: 0, pop1: 0 }};
    let partialSelectionResponse = null;

    for (let i=0; i<geoid.length; i+=7000) {
      partialSelectionResponse = await fetch(SELECTION_SUMMARY_API_URL_POST(survey, summaryVars), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',

        },
        body: JSON.stringify(geoid.slice(i, i+6999)),
      });

      partialSelectionResponse = await partialSelectionResponse.json();
      selectionResponse.totals.hunits += partialSelectionResponse.totals.hunits;
      selectionResponse.totals.pop1 += partialSelectionResponse.totals.pop1;
    }

    return selectionResponse;

  } else if (geoid.length > 500) {
    const response = await fetch(SELECTION_SUMMARY_API_URL_POST(survey, summaryVars), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify(geoid),
    });

    return response.json();

  } else if (geoid.length) {
    let selectionResponse = null;
    selectionResponse = await fetch(SELECTION_SUMMARY_API_URL(survey, summaryVars, geoid));
    selectionResponse = await selectionResponse.json();

    return selectionResponse;
  }

  return null;
}
