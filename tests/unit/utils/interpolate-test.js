import interpolate from 'labs-nyc-factfinder/utils/interpolate';
import { module, test } from 'qunit';

module('Unit | Utility | interpolate');

const scenario = [
  {
    quantity: 10,
    bounds: {
      lower: 1,
      upper: 4,
    }
  },
  {
    quantity: 40,
    bounds: {
      lower: 5,
      upper: 6,
    }
  },
  {
    quantity: 30,
    bounds: {
      lower: 7,
      upper: 9,
    }
  },
  {
    quantity: 15,
    bounds: {
      lower: 10,
      upper: 19,
    }
  },
];

const config = {
  options: {
    bins: [
      ['popu5', [0, 5]],
      ['pop5t9', [5, 9]],
      ['pop10t14', [10, 14]],
      ['pop15t19', [15, 19]],
      ['pop20t24', [20, 24]],
      ['pop25t29', [25, 29]],
      ['pop30t34', [30, 34]],
      ['pop35t39', [35, 39]],
      ['pop40t44', [40, 44]],
      ['pop45t49', [45, 49]],
      ['pop50t54', [50, 54]],
      ['pop55t59', [55, 59]],
      ['pop60t64', [60, 64]],
      ['pop65t69', [65, 69]],
      ['pop70t74', [70, 74]],
      ['pop75t79', [75, 79]],
      ['pop80t84', [80, 84]],
      ['pop85pl', [85, 115]],
    ],
  },
};

// Replace this with your real tests.
test('it works', function(assert) {
  let result = interpolate.bind(config)(scenario);
  assert.equal(result, 6.875);
});
