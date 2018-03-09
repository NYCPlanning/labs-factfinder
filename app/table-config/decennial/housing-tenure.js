export default [
  {
    highlight: true,
    title: 'Occupied housing units',
    data: 'ochu_2',
  },
  {
    title: 'Owner-occupied housing units',
    data: 'oochu',
  },
  {
    title: 'Renter-occupied housing units',
    data: 'rochu_1',
  },
  {
    divider: true,
  },
  {
    title: 'Average household size of owner-occupied units',
    tooltip: 'Number of people living in owner-occupied housing units, divided by number of owner-occupied housing units',
    data: 'avhhszooc',
    decimal: 2,
    special: true,
  },
  {
    title: 'Average household size of renter-occupied units',
    tooltip: 'Number of people living in renter-occupied housing units, divided by number of renter-occupied housing units',
    data: 'avhhszroc',
    decimal: 2,
    special: true,
  },
];
