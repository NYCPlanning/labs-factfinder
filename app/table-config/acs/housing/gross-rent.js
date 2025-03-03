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
    title: 'Median gross rent (dollars)',
    tooltip: 'Medians are calculated using linear interpolation, which may result in top-coded values',
    data: 'mdgr',
    special: true,
  },
  {
    title: 'Mean gross rent (dollars)',
    tooltip: 'Aggregate gross rent, divided by total occupied units paying rent',
    data: 'mngr',
    special: true,
  },
  {
    divider: true,
  },
  {
    title: 'No rent paid',
    data: 'grnorntpd',
    special: true,
  },
];