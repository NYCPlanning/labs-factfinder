import Ember from 'ember';

const { get, isArray } = Ember;

export default function interpolate(data, sumKey = 'sum') {
  const { bins } = this.options;

  let scenario = data;

  if (!isArray(scenario)) {
    scenario = bins.map((bin) => {
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
