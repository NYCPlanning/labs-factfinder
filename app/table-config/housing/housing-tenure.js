import calculator from '../../utils/calculator';
import formula from '../../utils/formula';

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
    specialCalculations: [
      {
        column: 'sum',
        aggregator: calculator,
        options: {
          procedure: ['popoochu.sum', 'divide', 'oochu1.sum'],
        },
      },
      {
        column: 'comparison_sum',
        aggregator: calculator,
        options: {
          procedure: ['popoochu.sum', 'divide', 'oochu1.sum'],
        },
      },
      {
        column: 'cv',
        aggregator: formula,
        options: {
          formula: '(257)*((GET("uwhusmpl3.sum"))^-0.699)',
        },
      },
      {
        column: 'comparison_cv',
        aggregator: formula,
        options: {
          formula: '(257)*((GET("uwhusmpl3.comparison_sum"))^-0.699)',
        },
      },
      {
        column: 'm',
        aggregator: formula,
        options: {
          formula: '((((GET("avghhsooc.cv"))/(100))*1.645))*(GET("avghhsooc.sum"))',
        },
      },
      {
        column: 'comparison_m',
        aggregator: formula,
        options: {
          formula: '((((GET("avghhsooc.comparison_cv"))/(100))*1.645))*(GET("avghhsooc.comparison_sum"))',
        },
      },
    ],
  },
  {
    title: 'Average household size of renter-occupied unit',
    tooltip: 'Population in renter-occupied housing units, divided by number of renter-occupied housing units',
    data: 'avghhsroc',
    special: true,
    decimal: 2,
    specialCalculations: [
      {
        column: 'sum',
        aggregator: calculator,
        options: {
          procedure: ['poprtochu.sum', 'divide', 'rochu1.sum'],
        },
      },
      {
        column: 'comparison_sum',
        aggregator: calculator,
        options: {
          procedure: ['poprtochu.comparison_sum', 'divide', 'rochu1.comparison_sum'],
        },
      },
      {
        column: 'cv',
        aggregator: formula,
        options: {
          formula: '(257)*((GET("uwhusmpl3.sum"))^-0.699)',
        },
      },
      {
        column: 'comparison_cv',
        aggregator: formula,
        options: {
          formula: '(257)*((GET("uwhusmpl3.comparison_sum"))^-0.699)',
        },
      },
      {
        column: 'm',
        aggregator: formula,
        options: {
          formula: '((((GET("avghhsroc.cv"))/(100))*1.645))*(GET("avghhsroc.sum"))',
        },
      },
      {
        column: 'comparison_m',
        aggregator: formula,
        options: {
          formula: '((((GET("avghhsroc.comparison_cv"))/(100))*1.645))*(GET("avghhsroc.comparison_sum"))',
        },
      },
    ],
  },
];
