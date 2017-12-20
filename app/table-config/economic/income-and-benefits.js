import interpolate from '../../utils/interpolate';
import calculator from '../../utils/calculator';

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
    data: 'mdhhinc',
    special: true,
    aggregator: interpolate,
    options: {
      bins: [
        ['HHIU10', [0, 9999]],
        ['HHI10t14', [10000, 14999]],
        ['HHI15t19', [15000, 19999]],
        ['HHI20t24', [20000, 24999]],
        ['HHI25t29', [25000, 29999]],
        ['HHI30t34', [30000, 34999]],
        ['HHI35t39', [35000, 39999]],
        ['HHI40t44', [40000, 44999]],
        ['HHI45t49', [45000, 49999]],
        ['HHI50t59', [50000, 59999]],
        ['HHI60t74', [60000, 74999]],
        ['HHI75t99', [75000, 99999]],
        ['HI100t124', [100000, 124999]],
        ['HI125t149', [125000, 149999]],
        ['HI150t199', [150000, 199999]],
        ['HHI200pl', [200000, 9999999]],
      ],
    },
  },
  {
    title: 'Mean household income (dollars)',
    data: 'mnhhinc',
    special: true,
    aggregator: calculator,
    procedure: ['hhi10t14', 'divide', 'hhi50t74'],
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
    data: 'mdfaminc',
    special: true,
    aggregator: interpolate,
    options: {
      bins: [
        ['FamIU10', [0, 9999]],
        ['FamI10t14', [10000, 14999]],
        ['FamI15t19', [15000, 19999]],
        ['FamI20t24', [20000, 24999]],
        ['FamI25t29', [25000, 29999]],
        ['FamI30t34', [30000, 34999]],
        ['FamI35t39', [35000, 39999]],
        ['FamI40t44', [40000, 44999]],
        ['FamI45t49', [45000, 49999]],
        ['FamI50t59', [50000, 59999]],
        ['FamI60t74', [60000, 74999]],
        ['FamI75t99', [75000, 99999]],
        ['FI100t124', [100000, 124999]],
        ['FI125t149', [125000, 149999]],
        ['FI150t199', [150000, 199999]],
        ['FamI200pl', [200000, 9999999]],
      ],
    },
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
    data: 'mdnfinc',
    aggregator: interpolate,
    options: {
      bins: [
        ['NFmIU10', [0, 9999]],
        ['NFmI10t14', [10000, 14999]],
        ['NFmI15t19', [15000, 19999]],
        ['NFmI20t24', [20000, 24999]],
        ['NFmI25t29', [25000, 29999]],
        ['NFmI30t34', [30000, 34999]],
        ['NFmI35t39', [35000, 39999]],
        ['NFmI40t44', [40000, 44999]],
        ['NFmI45t49', [45000, 49999]],
        ['NFmI50t59', [50000, 59999]],
        ['NFmI60t74', [60000, 74999]],
        ['NFmI75t99', [75000, 99999]],
        ['NF100t124', [100000, 124999]],
        ['NF125t149', [125000, 149999]],
        ['NF150t199', [150000, 199999]],
        ['NFI200pl', [200000, 9999999]],
      ],
    },
  },
  {
    divider: true,
  },
  {
    title: 'Per capita income (dollars)',
    data: 'percapinc',
    special: true,
    aggregator: calculator,
    procedure: ['agip15pl', 'divide', 'pop_6'],
  },
];
