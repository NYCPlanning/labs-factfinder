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
        ['hhiu10', [0, 9999]],
        ['hhi10t14', [10000, 14000]],
        ['hhi15t24', [15000, 24000]],
        ['hhi25t34', [25000, 34000]],
        ['hhi35t49', [35000, 49000]],
        ['hhi50t74', [50000, 74000]],
        ['hhi75t99', [75000, 99000]],
        ['hi100t149', [100000, 149000]],
        ['hi150t199', [150000, 199000]],
        ['hhi200pl', [0, 250000]],
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
        ['famiu10', [0, 9999]],
        ['fami10t14', [10000, 14000]],
        ['fami15t24', [15000, 24000]],
        ['fami25t34', [25000, 34000]],
        ['fami35t49', [35000, 49000]],
        ['fami50t74', [50000, 74000]],
        ['fami75t99', [75000, 99000]],
        ['fi100t149', [100000, 149000]],
        ['fi150t199', [150000, 199000]],
        ['fami200pl', [0, 250000]],
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
        ['nfmiu10', [0, 10000]],
        ['nfmi10t14', [10001, 14999]],
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
        ['nf125t149', [250000, 149999]],
        ['nf150t199', [150000, 199999]],
        ['nfi200pl', [200000, 250000]],
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
