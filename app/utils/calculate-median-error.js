import Ember from 'ember';

const { get, isArray } = Ember;
const { sqrt, ceil } = Math;
const DESIGN_FACTOR = 1.1;

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
  const { bins } = options;

  const sumKey = (function() {
    if (column.length === 1) return 'sum';
    return column.replace('_m', '_sum');
  }());

  let scenario = data;

  if (!isArray(scenario)) {
    scenario = bins.map((bin) => {
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
    DESIGN_FACTOR * sqrt(
      (95 / (5 * sum)) * (50 ** 2),
    );

  const pUpper = 50 + standardError;
  const pLower = 50 - standardError;

  const upperCategoryIndex =
    bins.findIndex(([, [min, max]]) => ceil(pUpper) >= min && ceil(pUpper) <= max);
  const lowerCategoryIndex =
    bins.findIndex(([, [min, max]]) => ceil(pLower) >= min && ceil(pLower) <= max);

  const upperCategory = bins[upperCategoryIndex];
  const lowerCategory = bins[lowerCategoryIndex];

  const inputs = {
    upper: {
      A1: upperCategory[1][0],
      A2: bins[upperCategoryIndex + 1][1][0],
      C1: findCumulativePercentage(scenario, sum, upperCategoryIndex),
      C2: findCumulativePercentage(scenario, sum, upperCategoryIndex + 1),
    },
    lower: {
      A1: lowerCategory[1][0],
      A2: bins[lowerCategoryIndex + 1][1][0],
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

  return marginOfError;
}
