import calculator from '../../utils/calculator';

export default [
  {
    title: 'Total housing units',
    highlight: true,
    data: 'hu1',
  },
  {
    title: 'Occupied housing units',
    data: 'ochu1',
  },
  {
    title: 'Vacant housing units',
    data: 'vachu',
  },
  {
    divider: true,
  },
  {
    title: 'Homeowner vacancy rate',
    tooltip: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    data: 'hovacrt',
    special: true,
    aggregator: calculator,
    procedure: [['vacsale', 'divide', 'hovacu'], 'multiply', 100],
    decimal: 1,
  },
  {
    title: 'Rental vacancy rate',
    tooltip: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    data: 'rntvacrt',
    special: true,
    aggregator: calculator,
    procedure: [['vacrnt', 'divide', 'rntvacu'], 'multiply', 100],
    decimal: 1,
  },
];
