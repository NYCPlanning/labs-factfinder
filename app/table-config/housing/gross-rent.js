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
        ['RU100', [0, 99]],
        ['R100t149', [100, 149]],
        ['R150t199', [150, 199]],
        ['R200t249', [200, 249]],
        ['R250t299', [250, 299]],
        ['R300t349', [300, 349]],
        ['R350t399', [350, 399]],
        ['R400t449', [400, 449]],
        ['R450t499', [450, 499]],
        ['R500t549', [500, 549]],
        ['R550t599', [550, 599]],
        ['R600t649', [600, 649]],
        ['R650t699', [650, 699]],
        ['R700t749', [700, 749]],
        ['R750t799', [750, 799]],
        ['R800t899', [800, 899]],
        ['R900t999', [900, 999]],
        ['R1kt1249', [1000, 1249]],
        ['R1250t1p5', [1250, 1499]],
        ['R1p5t1999', [1500, 1999]],
        ['R2kt2499', [2000, 2499]],
        ['R2p5t2999', [2500, 2999]],
        ['R3kt3499', [3000, 3499]],
        ['R3500pl', [3500, 9000]],
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
