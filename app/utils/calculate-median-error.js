import Ember from 'ember';

const { get, isArray } = Ember;
const { sqrt } = Math;
const DESIGN_FACTOR = 1.1;

const findCumulativePercentage = function(scenario, sum, index) {
  const slicedBins = scenario.slice(0, index);
  const cumulativeSum = slicedBins.reduce(
    (total, { quantity }) => total + quantity,
    0,
  );

  return (cumulativeSum / sum) * 100;
};

export default function calculateMedianError(data, sumKey, options) {
  const { bins } = options;

  let scenario = data;

  if (!isArray(scenario)) {
    scenario = bins.map((bin) => {
      const [key] = bin;
      const sum = get(data, `${key}.sum`);
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
    bins.findIndex(([, [min, max]]) => pUpper >= min && pUpper <= max);
  const lowerCategoryIndex =
    bins.findIndex(([, [min, max]]) => pLower >= min && pLower <= max);

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
        (pLower - inputs.upper.C1) / (inputs.upper.C2 - inputs.upper.C1)
      ) * (inputs.upper.A2 - inputs.upper.A1)
    ) + inputs.upper.A1;

  const standardErrorOfMedian = 0.5 * (upperBound - lowerBound);
  const marginOfError = standardErrorOfMedian * 1.645;

  return marginOfError;
}
