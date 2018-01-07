import Ember from 'ember';
import config from '../config/environment';
import guessYear from '../utils/guess-year';

const { get, isArray } = Ember;
const { round } = Math;
const { environment } = config;
const DESIGN_FACTOR = 1.5;

const findCumulativePercentage = function(scenario, sum, index) {
  const copiedBins = scenario.copy();
  const slicedBins = copiedBins.slice(0, index);
  const cumulativeSum = slicedBins.reduce(
    (total, { quantity }) => total + quantity,
    0,
  );

  return (cumulativeSum / sum) * 100;
};

export default function calculateMedianError(data, column, options) {
  const { bins, multipleBins, designFactor = DESIGN_FACTOR } = options;

  let foundBins = bins;

  const sumKey = (function() {
    if (column.length === 1) return 'sum';
    return column.replace('_m', '_sum');
  }());

  let scenario = data;

  // if we provide an array of bins in the configuration,
  // it's implied that the first bins should be used for the earlier
  // time period, and the last bin should be used for the later
  if (multipleBins) {
    foundBins = guessYear(data, foundBins, environment);
  }

  if (!isArray(scenario)) {
    scenario = foundBins.map((bin) => {
      const [key] = bin;
      const sum = get(data, `${key}.${sumKey}`);

      return {
        quantity: sum,
      };
    });
  }

  const sum = scenario.reduce(
    (total, { quantity }) => total + quantity,
    0,
  );

  const standardError =
    designFactor * ((
      (93 / (7 * sum)) * 2500
    ) ** 0.5);

  const pUpper = 50 + standardError;
  const pLower = 50 - standardError;

  const upperCategoryIndex =
    foundBins.findIndex(
      (_, currentBin) =>
        round(pUpper) > findCumulativePercentage(scenario, sum, currentBin) &&
        round(pUpper) < findCumulativePercentage(scenario, sum, currentBin + 1),
    );

  const lowerCategoryIndex =
    foundBins.findIndex(
      (_, currentBin) =>
        round(pLower) > findCumulativePercentage(scenario, sum, currentBin) &&
        round(pLower) < findCumulativePercentage(scenario, sum, currentBin + 1),
    );

  const upperCategory = foundBins[upperCategoryIndex];
  const lowerCategory = foundBins[lowerCategoryIndex];

  const upperA2SubsequentBin =
    (foundBins[upperCategoryIndex + 1] || foundBins[upperCategoryIndex])[1][0];

  const lowerA2SubsequentBin =
    (foundBins[lowerCategoryIndex + 1] || foundBins[lowerCategoryIndex])[1][0];

  const inputs = {
    upper: {
      A1: upperCategory[1][0],
      A2: upperA2SubsequentBin,
      C1: findCumulativePercentage(scenario, sum, upperCategoryIndex),
      C2: findCumulativePercentage(scenario, sum, upperCategoryIndex + 1),
    },
    lower: {
      A1: lowerCategory[1][0],
      A2: lowerA2SubsequentBin,
      C1: findCumulativePercentage(scenario, sum, lowerCategoryIndex),
      C2: findCumulativePercentage(scenario, sum, lowerCategoryIndex + 1),
    },
  };

  const upperBound =
    (
      (
        (pUpper - inputs.upper.C1) / (inputs.upper.C2 - inputs.upper.C1)
      ) * (inputs.upper.A2 - inputs.upper.A1)
    ) + inputs.upper.A1;

  const lowerBound =
    (
      (
        (pLower - inputs.lower.C1) / (inputs.lower.C2 - inputs.lower.C1)
      ) * (inputs.lower.A2 - inputs.lower.A1)
    ) + inputs.lower.A1;

  const standardErrorOfMedian = 0.5 * (upperBound - lowerBound);
  const marginOfError = standardErrorOfMedian * 1.645;

  if (environment === 'development') {
    console.log( // eslint-disable-line
      'Environment for Median MOE calculations : \n',
      '\nBins: ', foundBins,
      '\nEstimates: ', scenario,
      '\nInputs: ', inputs,
      '\npUpper: ', pUpper,
      '\npLower: ', pLower,
      '\nUpper Category: ', upperCategory,
      '\nLower Category: ', lowerCategory,
      '\nUpper Bound: ', upperBound,
      '\nLower Bound: ', lowerBound,
      '\nMargin of Error: ', marginOfError,
      '\nStandard Error: ', standardError,
    );
  }

  return marginOfError;
}
