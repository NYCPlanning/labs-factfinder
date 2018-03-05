import Ember from 'ember';

const { get } = Ember;

export default function guessYear(data, foundBins, environment = 'production') {
  const [earlySet, laterSet] = foundBins;

  // guess which year it is
  const [firstObject] = Object.keys(data) || [];
  const yearValue = get(data, `${firstObject}.dataset`);
  const thisYear = yearValue.slice(-4);

  if (thisYear === '2016') {
    if (environment === 'development') {
      console.log( // eslint-disable-line
        'Year Guessed for Median MOE: ', thisYear);
    }
    return laterSet;
  }

  return earlySet;
}
