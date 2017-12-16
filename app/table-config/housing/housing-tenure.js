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
    data: 'avghhsooc',
    special: true,
    aggregator: calculator,
    procedure: ['popoochu', 'divide', 'oochu1'],
  },
  {
    title: 'Average household size of renter-occupied unit',
    data: 'avghhsroc',
    special: true,
    aggregator: calculator,
    procedure: ['poprtochu', 'divide', 'rochu1'],
  },
];
