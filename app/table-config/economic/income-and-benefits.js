import interpolate from '../../utils/interpolate';
import calculateMedianError from '../../utils/calculate-median-error';
import calculator from '../../utils/calculator';
import formula from '../../utils/formula';

export default [
  {
    title: 'Total households',
    highlight: true,
    data: 'hh2',
  },
  {
    title: 'Household income of less than $10,000',
    data: 'hhiu10',
  },
  {
    title: '$10,000 to $14,999',
    data: 'hhi10t14',
  },
  {
    title: '$15,000 to $24,999',
    data: 'hhi15t24',
  },
  {
    title: '$25,000 to $34,999',
    data: 'hhi25t34',
  },
  {
    title: '$35,000 to $49,999',
    data: 'hhi35t49',
  },
  {
    title: '$50,000 to $74,999',
    data: 'hhi50t74',
  },
  {
    title: '$75,000 to $99,999',
    data: 'hhi75t99',
  },
  {
    title: '$100,000 to $149,999',
    data: 'hi100t149',
  },
  {
    title: '$150,000 to $199,999',
    data: 'hi150t199',
  },
  {
    title: '$200,000 or more',
    data: 'hhi200pl',
  },
  {
    title: 'Median household income (dollars)',
    tooltip: 'Medians are calculated using linear interpolation, which may result in top- and bottom-coded values',
    data: 'mdhhinc',
    special: true,
    specialCalculations: [
      {
        column: 'sum',
        aggregator: interpolate,
        options: {
          bins: [
            ['mdhhiu10', [0, 9999]],
            ['mdhhi10t14', [10000, 14999]],
            ['mdhhi15t19', [15000, 19999]],
            ['mdhhi20t24', [20000, 24999]],
            ['mdhhi25t29', [25000, 29999]],
            ['mdhhi30t34', [30000, 34999]],
            ['mdhhi35t39', [35000, 39999]],
            ['mdhhi40t44', [40000, 44999]],
            ['mdhhi45t49', [45000, 49999]],
            ['mdhhi50t59', [50000, 59999]],
            ['mdhhi60t74', [60000, 74999]],
            ['mdhhi75t99', [75000, 99999]],
            ['mdhi100t124', [100000, 124999]],
            ['mdhi125t149', [125000, 149999]],
            ['mdhi150t199', [150000, 199999]],
            ['mdhhi200pl', [200000, 9999999]],
          ],
        },
      },
      {
        column: 'm',
        aggregator: calculateMedianError,
        options: {
          designFactor: 1.5,
          bins: [
            ['mdhhiu10', [0, 9999]],
            ['mdhhi10t14', [10000, 14999]],
            ['mdhhi15t19', [15000, 19999]],
            ['mdhhi20t24', [20000, 24999]],
            ['mdhhi25t29', [25000, 29999]],
            ['mdhhi30t34', [30000, 34999]],
            ['mdhhi35t39', [35000, 39999]],
            ['mdhhi40t44', [40000, 44999]],
            ['mdhhi45t49', [45000, 49999]],
            ['mdhhi50t59', [50000, 59999]],
            ['mdhhi60t74', [60000, 74999]],
            ['mdhhi75t99', [75000, 99999]],
            ['mdhi100t124', [100000, 124999]],
            ['mdhi125t149', [125000, 149999]],
            ['mdhi150t199', [150000, 199999]],
            ['mdhhi200pl', [200000, 9999999]],
          ],
        },
      },
      {
        column: 'cv',
        aggregator: formula,
        options: {
          formula: '((GET("mdhhinc.m")/ 1.645) / GET("mdhhinc.sum") * 100)',
        },
      },
      {
        column: 'comparison_sum',
        aggregator: interpolate,
        options: {
          bins: [
            ['mdhhiu10', [0, 9999]],
            ['mdhhi10t14', [10000, 14999]],
            ['mdhhi15t19', [15000, 19999]],
            ['mdhhi20t24', [20000, 24999]],
            ['mdhhi25t29', [25000, 29999]],
            ['mdhhi30t34', [30000, 34999]],
            ['mdhhi35t39', [35000, 39999]],
            ['mdhhi40t44', [40000, 44999]],
            ['mdhhi45t49', [45000, 49999]],
            ['mdhhi50t59', [50000, 59999]],
            ['mdhhi60t74', [60000, 74999]],
            ['mdhhi75t99', [75000, 99999]],
            ['mdhi100t124', [100000, 124999]],
            ['mdhi125t149', [125000, 149999]],
            ['mdhi150t199', [150000, 199999]],
            ['mdhhi200pl', [200000, 9999999]],
          ],
        },
      },
      {
        column: 'comparison_m',
        aggregator: calculateMedianError,
        options: {
          designFactor: 1.5,
          bins: [
            ['mdhhiu10', [0, 9999]],
            ['mdhhi10t14', [10000, 14999]],
            ['mdhhi15t19', [15000, 19999]],
            ['mdhhi20t24', [20000, 24999]],
            ['mdhhi25t29', [25000, 29999]],
            ['mdhhi30t34', [30000, 34999]],
            ['mdhhi35t39', [35000, 39999]],
            ['mdhhi40t44', [40000, 44999]],
            ['mdhhi45t49', [45000, 49999]],
            ['mdhhi50t59', [50000, 59999]],
            ['mdhhi60t74', [60000, 74999]],
            ['mdhhi75t99', [75000, 99999]],
            ['mdhi100t124', [100000, 124999]],
            ['mdhi125t149', [125000, 149999]],
            ['mdhi150t199', [150000, 199999]],
            ['mdhhi200pl', [200000, 9999999]],
          ],
        },
      },
      {
        column: 'comparison_cv',
        aggregator: formula,
        options: {
          formula: '((GET("mdhhinc.comparison_m")/ 1.645) / GET("mdhhinc.comparison_sum") * 100)',
        },
      },
    ],
  },
  {
    title: 'Mean household income (dollars)',
    tooltip: 'Aggregate household income in the past 12 months, divided by total households',
    data: 'mnhhinc',
    special: true,
    specialCalculations: [
      {
        column: 'sum',
        aggregator: calculator,
        options: {
          procedure: ['aghhinc.sum', 'divide', 'hh.sum'],
        },
      },
      {
        column: 'comparison_sum',
        aggregator: calculator,
        options: {
          procedure: ['aghhinc.comparison_sum', 'divide', 'hh.comparison_sum'],
        },
      },
      {
        column: 'cv',
        aggregator: formula,
        options: {
          formula: '(462)*((GET("uwhusmpl2.sum"))^-0.754)',
        },
      },
      {
        column: 'comparison_cv',
        aggregator: formula,
        options: {
          formula: '(462)*((GET("uwhusmpl2.comparison_sum"))^-0.754)',
        },
      },
      {
        column: 'm',
        aggregator: formula,
        options: {
          formula: '((((GET("mnhhinc.cv"))/(100))*(1.645))*(GET("mnhhinc.sum")))',
        },
      },
      {
        column: 'comparison_m',
        aggregator: formula,
        options: {
          formula: '((((GET("mnhhinc.comparison_cv"))/(100))*(1.645))*(GET("mnhhinc.comparison_sum")))',
        },
      },
    ],
  },
  {
    divider: true,
  },
  {
    title: 'Households with Social Security',
    data: 'inc_sosec',
  },
  {
    title: 'Households with retirement income',
    data: 'inc_rtrmt',
  },
  {
    title: 'Households with Supplemental Security Income',
    data: 'inc_spsec',
  },
  {
    title: 'Households with cash public assistance income',
    data: 'inc_cpba',
  },
  {
    title: 'Households with Food Stamp/SNAP benefits in the past 12 months',
    data: 'inc_snap',
  },
  {
    divider: true,
  },
  {
    title: 'Family households',
    highlight: true,
    data: 'fam2',
  },
  {
    title: 'Family income of less than $10,000',
    data: 'famiu10',
  },
  {
    title: '$10,000 to $14,999',
    data: 'fami10t14',
  },
  {
    title: '$15,000 to $24,999',
    data: 'fami15t24',
  },
  {
    title: '$25,000 to $34,999',
    data: 'fami25t34',
  },
  {
    title: '$35,000 to $49,999',
    data: 'fami35t49',
  },
  {
    title: '$50,000 to $74,999',
    data: 'fami50t74',
  },
  {
    title: '$75,000 to $99,999',
    data: 'fami75t99',
  },
  {
    title: '$100,000 to $149,999',
    data: 'fi100t149',
  },
  {
    title: '$150,000 to $199,999',
    data: 'fi150t199',
  },
  {
    title: '$200,000 or more',
    data: 'fami200pl',
  },
  {
    title: 'Median family income (dollars)',
    tooltip: 'Medians are calculated using linear interpolation, which may result in top- and bottom-coded values',
    data: 'mdfaminc',
    special: true,
    specialCalculations: [
      {
        column: 'sum',
        aggregator: interpolate,
        options: {
          bins: [
            ['mdfamiu10', [0, 9999]],
            ['mdfami10t14', [10000, 14999]],
            ['mdfami15t19', [15000, 19999]],
            ['mdfami20t24', [20000, 24999]],
            ['mdfami25t29', [25000, 29999]],
            ['mdfami30t34', [30000, 34999]],
            ['mdfami35t39', [35000, 39999]],
            ['mdfami40t44', [40000, 44999]],
            ['mdfami45t49', [45000, 49999]],
            ['mdfami50t59', [50000, 59999]],
            ['mdfami60t74', [60000, 74999]],
            ['mdfami75t99', [75000, 99999]],
            ['mdfi100t124', [100000, 124999]],
            ['mdfi125t149', [125000, 149999]],
            ['mdfi150t199', [150000, 199999]],
            ['mdfami200pl', [200000, 9999999]],
          ],
        },
      },
      {
        column: 'm',
        aggregator: calculateMedianError,
        options: {
          designFactor: 1.5,
          bins: [
            ['mdfamiu10', [0, 9999]],
            ['mdfami10t14', [10000, 14999]],
            ['mdfami15t19', [15000, 19999]],
            ['mdfami20t24', [20000, 24999]],
            ['mdfami25t29', [25000, 29999]],
            ['mdfami30t34', [30000, 34999]],
            ['mdfami35t39', [35000, 39999]],
            ['mdfami40t44', [40000, 44999]],
            ['mdfami45t49', [45000, 49999]],
            ['mdfami50t59', [50000, 59999]],
            ['mdfami60t74', [60000, 74999]],
            ['mdfami75t99', [75000, 99999]],
            ['mdfi100t124', [100000, 124999]],
            ['mdfi125t149', [125000, 149999]],
            ['mdfi150t199', [150000, 199999]],
            ['mdfami200pl', [200000, 9999999]],
          ],
        },
      },
      {
        column: 'cv',
        aggregator: formula,
        options: {
          formula: '((GET("mdfaminc.m")/ 1.645) / GET("mdfaminc.sum") * 100)',
        },
      },
      {
        column: 'comparison_sum',
        aggregator: interpolate,
        options: {
          bins: [
            ['mdfamiu10', [0, 9999]],
            ['mdfami10t14', [10000, 14999]],
            ['mdfami15t19', [15000, 19999]],
            ['mdfami20t24', [20000, 24999]],
            ['mdfami25t29', [25000, 29999]],
            ['mdfami30t34', [30000, 34999]],
            ['mdfami35t39', [35000, 39999]],
            ['mdfami40t44', [40000, 44999]],
            ['mdfami45t49', [45000, 49999]],
            ['mdfami50t59', [50000, 59999]],
            ['mdfami60t74', [60000, 74999]],
            ['mdfami75t99', [75000, 99999]],
            ['mdfi100t124', [100000, 124999]],
            ['mdfi125t149', [125000, 149999]],
            ['mdfi150t199', [150000, 199999]],
            ['mdfami200pl', [200000, 9999999]],
          ],
        },
      },
      {
        column: 'comparison_m',
        aggregator: calculateMedianError,
        options: {
          designFactor: 1.5,
          bins: [
            ['mdfamiu10', [0, 9999]],
            ['mdfami10t14', [10000, 14999]],
            ['mdfami15t19', [15000, 19999]],
            ['mdfami20t24', [20000, 24999]],
            ['mdfami25t29', [25000, 29999]],
            ['mdfami30t34', [30000, 34999]],
            ['mdfami35t39', [35000, 39999]],
            ['mdfami40t44', [40000, 44999]],
            ['mdfami45t49', [45000, 49999]],
            ['mdfami50t59', [50000, 59999]],
            ['mdfami60t74', [60000, 74999]],
            ['mdfami75t99', [75000, 99999]],
            ['mdfi100t124', [100000, 124999]],
            ['mdfi125t149', [125000, 149999]],
            ['mdfi150t199', [150000, 199999]],
            ['mdfami200pl', [200000, 9999999]],
          ],
        },
      },
      {
        column: 'comparison_cv',
        aggregator: formula,
        options: {
          formula: '((GET("mdfaminc.comparison_m")/ 1.645) / GET("mdfaminc.comparison_sum") * 100)',
        },
      },
    ],
  },
  {
    divider: true,
  },
  {
    title: 'Nonfamily households',
    highlight: true,
    data: 'nfam2',
  },
  {
    title: 'Median nonfamily income (dollars)',
    tooltip: 'Medians are calculated using linear interpolation, which may result in top- and bottom-coded values',
    data: 'mdnfinc',
    special: true,
    specialCalculations: [
      {
        column: 'sum',
        aggregator: interpolate,
        options: {
          bins: [
            ['nfmiu10', [0, 9999]],
            ['nfmi10t14', [10000, 14999]],
            ['nfmi15t19', [15000, 19999]],
            ['nfmi20t24', [20000, 24999]],
            ['nfmi25t29', [25000, 29999]],
            ['nfmi30t34', [30000, 34999]],
            ['nfmi35t39', [35000, 39999]],
            ['nfmi40t44', [40000, 44999]],
            ['nfmi45t49', [45000, 49999]],
            ['nfmi50t59', [50000, 59999]],
            ['nfmi60t74', [60000, 74999]],
            ['nfmi75t99', [75000, 99999]],
            ['nf100t124', [100000, 124999]],
            ['nf125t149', [125000, 149999]],
            ['nf150t199', [150000, 199999]],
            ['nfi200pl', [200000, 9999999]],
          ],
        },
      },
      {
        column: 'm',
        aggregator: calculateMedianError,
        options: {
          designFactor: 1.5,
          bins: [
            ['nfmiu10', [0, 9999]],
            ['nfmi10t14', [10000, 14999]],
            ['nfmi15t19', [15000, 19999]],
            ['nfmi20t24', [20000, 24999]],
            ['nfmi25t29', [25000, 29999]],
            ['nfmi30t34', [30000, 34999]],
            ['nfmi35t39', [35000, 39999]],
            ['nfmi40t44', [40000, 44999]],
            ['nfmi45t49', [45000, 49999]],
            ['nfmi50t59', [50000, 59999]],
            ['nfmi60t74', [60000, 74999]],
            ['nfmi75t99', [75000, 99999]],
            ['nf100t124', [100000, 124999]],
            ['nf125t149', [125000, 149999]],
            ['nf150t199', [150000, 199999]],
            ['nfi200pl', [200000, 9999999]],
          ],
        },
      },
      {
        column: 'cv',
        aggregator: formula,
        options: {
          formula: '((GET("mdnfinc.m")/ 1.645) / GET("mdnfinc.sum") * 100)',
        },
      },
      {
        column: 'comparison_sum',
        aggregator: interpolate,
        options: {
          bins: [
            ['nfmiu10', [0, 9999]],
            ['nfmi10t14', [10000, 14999]],
            ['nfmi15t19', [15000, 19999]],
            ['nfmi20t24', [20000, 24999]],
            ['nfmi25t29', [25000, 29999]],
            ['nfmi30t34', [30000, 34999]],
            ['nfmi35t39', [35000, 39999]],
            ['nfmi40t44', [40000, 44999]],
            ['nfmi45t49', [45000, 49999]],
            ['nfmi50t59', [50000, 59999]],
            ['nfmi60t74', [60000, 74999]],
            ['nfmi75t99', [75000, 99999]],
            ['nf100t124', [100000, 124999]],
            ['nf125t149', [125000, 149999]],
            ['nf150t199', [150000, 199999]],
            ['nfi200pl', [200000, 9999999]],
          ],
        },
      },
      {
        column: 'comparison_m',
        aggregator: calculateMedianError,
        options: {
          designFactor: 1.5,
          bins: [
            ['nfmiu10', [0, 9999]],
            ['nfmi10t14', [10000, 14999]],
            ['nfmi15t19', [15000, 19999]],
            ['nfmi20t24', [20000, 24999]],
            ['nfmi25t29', [25000, 29999]],
            ['nfmi30t34', [30000, 34999]],
            ['nfmi35t39', [35000, 39999]],
            ['nfmi40t44', [40000, 44999]],
            ['nfmi45t49', [45000, 49999]],
            ['nfmi50t59', [50000, 59999]],
            ['nfmi60t74', [60000, 74999]],
            ['nfmi75t99', [75000, 99999]],
            ['nf100t124', [100000, 124999]],
            ['nf125t149', [125000, 149999]],
            ['nf150t199', [150000, 199999]],
            ['nfi200pl', [200000, 9999999]],
          ],
        },
      },
      {
        column: 'comparison_cv',
        aggregator: formula,
        options: {
          formula: '((GET("mdnfinc.comparison_m")/ 1.645) / GET("mdnfinc.comparison_sum") * 100)',
        },
      },
    ],
  },
  {
    divider: true,
  },
  {
    title: 'Per capita income (dollars)',
    tooltip: 'Aggregate income in the past 12 months, divided by total population',
    data: 'percapinc',
    special: true,
    specialCalculations: [
      {
        column: 'sum',
        aggregator: calculator,
        options: {
          procedure: ['agip15pl.sum', 'divide', 'pop_6.sum'],
        },
      },
      {
        column: 'comparison_sum',
        aggregator: calculator,
        options: {
          procedure: ['agip15pl.comparison_sum', 'divide', 'pop_6.comparison_sum'],
        },
      },
      {
        column: 'cv',
        aggregator: formula,
        options: {
          formula: '(1122)*((GET("uwpopsmpl.sum"))^-0.778)',
        },
      },
      {
        column: 'comparison_cv',
        aggregator: formula,
        options: {
          formula: '(1122)*((GET("uwpopsmpl.comparison_sum"))^-0.778)',
        },
      },
      {
        column: 'm',
        aggregator: formula,
        options: {
          formula: '((((GET("percapinc.cv"))/(100))*(1.645))*(GET("percapinc.sum")))',
        },
      },
      {
        column: 'comparison_m',
        aggregator: formula,
        options: {
          formula: '((((GET("percapinc.comparison_cv"))/(100))*(1.645))*(GET("percapinc.comparison_sum")))',
        },
      },
    ],
  },
];
