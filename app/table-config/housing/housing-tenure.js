import calculator from '../../utils/calculator';

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
    tooltip: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    data: 'avghhsooc',
    special: true,
    aggregator: calculator,
    procedure: ['popoochu', 'divide', 'oochu1'],
    decimal: 2,
  },
  {
    title: 'Average household size of renter-occupied unit',
    tooltip: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    data: 'avghhsroc',
    special: true,
    aggregator: calculator,
    procedure: ['poprtochu', 'divide', 'rochu1'],
    decimal: 2,
  },
];
