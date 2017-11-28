import interpolate from '../../utils/interpolate';

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
    data: 'mdvl',
    special: true,
    aggregator: interpolate,
    options: {
      bins: [
        ['vlu50', [0, 50000]],
        ['vl50t99', [50000, 99000]],
        ['vl100t149', [100000, 149000]],
        ['vl150t199', [150000, 199000]],
        ['vl200t299', [200000, 299000]],
        ['vl300t499', [300000, 499000]],
        ['vl500t999', [500000, 999000]],
        ['vl1milpl', [1000000, 2000000]],
      ],
    },
  },
];
