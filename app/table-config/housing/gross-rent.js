import interpolate from '../../utils/interpolate';

export default [
  {
    title: 'Occupied units paying rent',
    highlight: true,
    data: 'ochuprnt1',
  },
  {
    title: 'Less than $500',
    data: 'gru500',
  },
  {
    title: '$500 to $999',
    data: 'gr500t999',
  },
  {
    title: '$1,000 to $1499',
    data: 'gr1kt14k',
  },
  {
    title: '$1,500 to $1,999',
    data: 'gr15kt19k',
  },
  {
    title: '$2,000 to $2,499',
    data: 'gr20kt24k',
  },
  {
    title: '$2,500 to $2,999',
    data: 'gr25kt29k',
  },
  {
    title: '$3,000 or more',
    data: 'gr3kpl',
  },
  {
    title: 'Median (dollars)',
    data: 'mdgr',
    special: true,
    aggregator: interpolate,
    options: {
      bins: [
        ['gru500', [0, 500]],
        ['gr500t999', [500, 999]],
        ['gr1kt14k', [1000, 1499]],
        ['gr15kt19k', [1500, 1999]],
        ['gr20kt24k', [2000, 2499]],
        ['gr25kt29k', [2500, 2999]],
        ['gr3kpl', [3000, 35000]],
      ],
    },
  },
  {
    divider: true,
  },
  {
    title: 'No rent paid',
    data: 'grnorntpd',
  },
];
