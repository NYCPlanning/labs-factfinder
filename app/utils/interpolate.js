import Ember from 'ember';

const { get, isArray } = Ember;

export default function interpolate(data, sumKey = 'sum', options) {
  const { bins, multipleBins } = options;
  let scenario = data;
  let foundBins = bins;

  // if we provide an array of bins in the configuration,
  // it's implied that the first bins should be used for the earlier
  // time period, and the last bin should be used for the later
  if (multipleBins) {
    const [earlySet, laterSet] = foundBins;

    // guess which year it is
    const [firstObject] = Object.keys(data) || [];
    const thisYear = get(data, `${firstObject}.dataset`).slice(-4);

    if (thisYear === '2000' || thisYear === '2016') {
      foundBins = laterSet;
    } else {
      foundBins = earlySet;
    }
  }

  // this is done in an effort to make this utility more generic
  // and therefore, testable
  if (!isArray(scenario)) {
    scenario = foundBins.map((bin) => {
      const [key, range] = bin;
      const [min, max] = range;
      const sum = get(data, `${key}.${sumKey}`);

      return {
        quantity: sum,
        bounds: {
          lower: min,
          upper: max,
        },
      };
    });
  }

  const medianOfRanges = (ranges) => {
    const rangeGroups = (() => {
      let upper = 0;

      return ranges.map((range) => {
        const lower = upper;
        upper += range.quantity;

        return { lower, upper };
      });
    })();

    const avg = ranges.map(range => range.quantity).reduce((a, b) => a + b) / 2;

    const medianGroupNum = (() => {
      let groupNum = null;

      rangeGroups.some((group, i) => {
        if (group.lower <= avg && avg <= group.upper) {
          groupNum = i;
          return true;
        }
        return false;
      });

      return groupNum;
    })();

    const medianRange = ranges[medianGroupNum];
    const medianRangeGroup = rangeGroups[medianGroupNum];

    const medianLocation = (
      (avg - medianRangeGroup.lower) / medianRange.quantity
    );

    const medianLocationMultiplier =
      Math.abs(medianRange.bounds.upper - medianRange.bounds.lower) + 1;

    const median = medianRange.bounds.lower + (medianLocation * medianLocationMultiplier);

    return median;
  };

  return medianOfRanges(scenario);
}
