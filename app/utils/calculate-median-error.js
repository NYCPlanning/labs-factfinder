import Ember from 'ember';
import config from '../config/environment';

const { get, isArray } = Ember;
const { round } = Math;
const { environment } = config;
const DESIGN_FACTOR = 1.6;

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
  const { bins, multipleBins } = options;

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
    const [earlySet, laterSet] = foundBins;

    // guess which year it is
    const [firstObject] = Object.keys(data) || [];
    const thisYear = get(data, `${firstObject}.dataset`).slice(-4);

    if (thisYear === '2010' || thisYear === '2016') {
      foundBins = laterSet;
    } else {
      foundBins = earlySet;
    }
  }

  console.log(foundBins);

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
    DESIGN_FACTOR * ((
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

  const inputs = {
    upper: {
      A1: upperCategory[1][0],
      A2: foundBins[upperCategoryIndex + 1][1][0],
      C1: findCumulativePercentage(scenario, sum, upperCategoryIndex),
      C2: findCumulativePercentage(scenario, sum, upperCategoryIndex + 1),
    },
    lower: {
      A1: lowerCategory[1][0],
      A2: foundBins[lowerCategoryIndex + 1][1][0],
      C1: findCumulativePercentage(scenario, sum, lowerCategoryIndex),
      C2: findCumulativePercentage(scenario, sum, lowerCategoryIndex + 1),
    },
  };

  if ((inputs.upper.C1 === 0 && inputs.upper.C2 === 0) || (inputs.lower.C1 === 0 && inputs.lower.C2 === 0)) {
    console.log( // eslint-disable-line
      'Divide by zero for median MOE calculation: \n',
      '\nBins: ', foundBins,
      '\nEstimates: ', scenario,
      '\nInputs: ', inputs,
      '\npUpper: ', pUpper,
      '\npLower: ', pLower,
      '\nUpper Category: ', upperCategory,
      '\nLower Category: ', lowerCategory,
    );
  }

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
    );
  }

  return marginOfError;
}
