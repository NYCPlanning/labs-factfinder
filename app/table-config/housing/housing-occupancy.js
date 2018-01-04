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
    tooltip: 'Number of vacant units “for sale only,” divided by sum of owner-occupied units, vacant units that are “for sale only,” and vacant units that have been sold but not yet occupied. Quotient is multiplied by 100.',
    data: 'hovacrt',
    special: true,
    aggregator: calculator,
    procedure: [['vacsale', 'divide', 'hovacu'], 'multiply', 100],
    decimal: 1,
  },
  {
    title: 'Rental vacancy rate',
    tooltip: 'Number of vacant units “for rent,” divided by sum of renter-occupied units, vacant units that are “for rent,” and vacant units that have been rented but not yet occupied. Quotient is multiplied by 100.',
    data: 'rntvacrt',
    special: true,
    aggregator: calculator,
    procedure: [['vacrnt', 'divide', 'rntvacu'], 'multiply', 100],
    decimal: 1,
  },
];
