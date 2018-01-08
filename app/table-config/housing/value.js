import interpolate from '../../utils/interpolate';
import formula from '../../utils/formula';
import calculateMedianError from '../../utils/calculate-median-error';

// mdvl
const binsMedianValueEarly = [
  ['ovlu10', [0, 9999]],
  ['ovl10t14', [10000, 14999]],
  ['ovl15t19', [15000, 19999]],
  ['ovl20t24', [20000, 24999]],
  ['ovl25t29', [25000, 29999]],
  ['ovl30t34', [30000, 34999]],
  ['ovl35t39', [35000, 39999]],
  ['ovl40t49', [40000, 49999]],
  ['ovl50t59', [50000, 59999]],
  ['ovl60t69', [60000, 69999]],
  ['ovl70t79', [70000, 79999]],
  ['ovl80t89', [80000, 89999]],
  ['ovl90t99', [90000, 99999]],
  ['ov100t124', [100000, 124999]],
  ['ov125t149', [125000, 149999]],
  ['ov150t174', [150000, 174999]],
  ['ov175t199', [175000, 199999]],
  ['ov200t249', [200000, 249999]],
  ['ov250t299', [250000, 299999]],
  ['ov300t399', [300000, 399999]],
  ['ov400t499', [400000, 499999]],
  ['ov500t749', [500000, 749999]],
  ['ov750t999', [750000, 999999]],
  ['ov1milpl', [1000000, 9999999]],
];

const binsMedianValueLater = [
  ['ovlu10', [0, 9999]],
  ['ovl10t14', [10000, 14999]],
  ['ovl15t19', [15000, 19999]],
  ['ovl20t24', [20000, 24999]],
  ['ovl25t29', [25000, 29999]],
  ['ovl30t34', [30000, 34999]],
  ['ovl35t39', [35000, 39999]],
  ['ovl40t49', [40000, 49999]],
  ['ovl50t59', [50000, 59999]],
  ['ovl60t69', [60000, 69999]],
  ['ovl70t79', [70000, 79999]],
  ['ovl80t89', [80000, 89999]],
  ['ovl90t99', [90000, 99999]],
  ['ov100t124', [100000, 124999]],
  ['ov125t149', [125000, 149999]],
  ['ov150t174', [150000, 174999]],
  ['ov175t199', [175000, 199999]],
  ['ov200t249', [200000, 249999]],
  ['ov250t299', [250000, 299999]],
  ['ov300t399', [300000, 399999]],
  ['ov400t499', [400000, 499999]],
  ['ov500t749', [500000, 749999]],
  ['ov750t999', [750000, 999999]],
  ['ov1t149m', [1000000, 1499999]],
  ['ov150t199m', [1500000, 1999999]],
  ['ov2milpl', [2000000, 5000000]],
];

export default [
  {
    title: 'Owner-occupied units',
    highlight: true,
    data: 'oochu2',
  },
  {
    title: 'Less than $50,000',
    data: 'vlu50',
  },
  {
    title: '$50,000 to $99,999',
    data: 'vl50t99',
  },
  {
    title: '$100,000 to $149,999',
    data: 'vl100t149',
  },
  {
    title: '$150,000 to $199,999',
    data: 'vl150t199',
  },
  {
    title: '$200,000 to $299,999',
    data: 'vl200t299',
  },
  {
    title: '$300,000 to $499,999',
    data: 'vl300t499',
  },
  {
    title: '$500,000 to $999,999',
    data: 'vl500t999',
  },
  {
    title: '$1,000,000 or more',
    data: 'vl1milpl',
  },
  {
    title: 'Median (dollars)',
    tooltip: 'Medians are calculated using linear interpolation, which may result in top-coded values',
    data: 'mdvl',
    special: true,
    specialCalculations: [
      {
        column: 'sum',
        aggregator: interpolate,
        options: {
          multipleBins: true,
          bins: [binsMedianValueEarly, binsMedianValueLater],
        },
      },
      {
        column: 'm',
        aggregator: calculateMedianError,
        options: {
          designFactor: 1.4,
          multipleBins: true,
          bins: [binsMedianValueEarly, binsMedianValueLater],
        },
      },
      {
        column: 'cv',
        aggregator: formula,
        options: {
          formula: '((GET("mdvl.m")/ 1.645) / GET("mdvl.sum") * 100)',
        },
      },
      {
        column: 'comparison_sum',
        aggregator: interpolate,
        options: {
          multipleBins: true,
          bins: [binsMedianValueEarly, binsMedianValueLater],
        },
      },
      {
        column: 'comparison_m',
        aggregator: calculateMedianError,
        options: {
          designFactor: 1.4,
          multipleBins: true,
          bins: [binsMedianValueEarly, binsMedianValueLater],
        },
      },
      {
        column: 'comparison_cv',
        aggregator: formula,
        options: {
          formula: '((GET("mdvl.comparison_m")/ 1.645) / GET("mdvl.comparison_sum") * 100)',
        },
      },
    ],
  },
];
