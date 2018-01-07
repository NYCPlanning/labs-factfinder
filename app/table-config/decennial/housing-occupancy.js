import formula from '../../utils/formula';

export default [
  {
    highlight: true,
    title: 'Total housing units',
    data: 'hunits',
  },
  {
    title: 'Occupied housing units',
    data: 'ochu_1',
  },
  {
    title: 'Vacant housing units',
    data: 'vachus',
  },
  {
    indent: 1,
    title: 'For rent',
    data: 'vhufrnt',
  },
  {
    indent: 1,
    title: 'For sale only',
    data: 'vhufslo',
  },
  {
    indent: 1,
    title: 'Rented or sold, not occupied',
    data: 'vhurosnoc',
  },
  {
    indent: 1,
    title: 'For seasonal, recreational, or occasional use',
    data: 'vhufsroou',
  },
  {
    indent: 1,
    title: 'Other vacant',
    data: 'vhuothvc',
  },
  {
    divider: true,
  },
  {
    title: 'Homeowner vacancy rate (percent)',
    tooltip: 'Number of vacant units "for sale only," divided by sum of owner-occupied units and vacant units "for sale only," multiplied by 100. (Used definition from 2000 for consistency in measuring change.)',
    data: 'hmownrvcrt',
    decimal: 1,
    special: true,
    specialCalculations: [
      {
        column: 'sum',
        aggregator: formula,
        options: {
          formula: '((GET("vhufslo.sum"))/((GET("vhufslo.sum"))+(GET("oochu1.sum"))))*100',
        },
      },
      {
        column: 'comparison_sum',
        aggregator: formula,
        options: {
          formula: '((GET("vhufslo.comparison_sum"))/((GET("vhufslo.comparison_sum"))+(GET("oochu1.comparison_sum"))))*100',
        },
      },
    ],
  },
  {
    title: 'Rental vacancy rate (percent)',
    tooltip: 'Number of vacant units "for rent," divided by sum of renter-occupied units and vacant units "for rent," multiplied by 100. (Used definition from 2000 for consistency in measuring change.)',
    data: 'rntvcrt',
    decimal: 1,
    special: true,
    specialCalculations: [
      {
        column: 'sum',
        aggregator: formula,
        options: {
          formula: '((GET("vhufrnt.sum"))/((GET("vhufrnt.sum"))+(GET("rochu_3.sum"))))*100',
        },
      },
      {
        column: 'comparison_sum',
        aggregator: formula,
        options: {
          formula: '((GET("vhufrnt.comparison_sum"))/((GET("vhufrnt.comparison_sum"))+(GET("rochu_3.comparison_sum"))))*100',
        },
      },
    ],
  },
];
