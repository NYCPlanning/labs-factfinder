export default [
  {
    title: 'Occupied housing units',
    highlight: true,
    data: 'ochu2',
  },
  {
    title: 'Owner-occupied',
    data: 'oochu1',
  },
  {
    title: 'Renter-occupied',
    data: 'rochu1',
  },
  {
    divider: true,
  },
  {
    title: 'Average household size of owner-occupied unit',
    tooltip: 'Population in owner-occupied housing units, divided by number of owner-occupied housing units',
    data: 'avghhsooc',
    special: true,
    decimal: 2,
  },
  {
    title: 'Average household size of renter-occupied unit',
    tooltip: 'Population in renter-occupied housing units, divided by number of renter-occupied housing units',
    data: 'avghhsroc',
    special: true,
    decimal: 2,
  },
];
