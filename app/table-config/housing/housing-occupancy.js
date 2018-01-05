import calculator from '../../utils/calculator';
import formula from '../../utils/formula';

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
    decimal: 1,
    specialCalculations: [
      {
        column: 'sum',
        aggregator: calculator,
        options: {
          procedure: [['vacsale.sum', 'divide', 'hovacu.sum'], 'multiply', 100],
        },
      },
      {
        column: 'comparison_sum',
        aggregator: calculator,
        options: {
          procedure: [['vacsale.comparison_sum', 'divide', 'hovacu.comparison_sum'], 'multiply', 100],
        },
      },
    ],
  },
  {
    title: 'Rental vacancy rate',
    tooltip: 'Number of vacant units “for rent,” divided by sum of renter-occupied units, vacant units that are “for rent,” and vacant units that have been rented but not yet occupied. Quotient is multiplied by 100.',
    data: 'rntvacrt',
    special: true,
    decimal: 1,
    specialCalculations: [
      {
        column: 'sum',
        aggregator: calculator,
        options: {
          procedure: [['vacrnt.sum', 'divide', 'rntvacu.sum'], 'multiply', 100],
        },
      },
      {
        column: 'comparison_sum',
        aggregator: calculator,
        options: {
          procedure: [['vacrnt.comparison_sum', 'divide', 'rntvacu.comparison_sum'], 'multiply', 100],
        },
      },
    ],
  },
];
