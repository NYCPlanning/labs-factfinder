import formula from '../../utils/formula';

export default [
  {
    highlight: true,
    title: 'Total population',
    data: 'pop1',
  },
  {
    title: 'Population per acre',
    tooltip: 'Total population divided by land area (in acres)',
    data: 'popperacre',
    decimal: 1,
    special: true,
    specialCalculations: [
      {
        column: 'sum',
        aggregator: formula,
        options: {
          formula: '(GET("pop1.sum"))/(GET("landacres.sum"))',
        },
      },
      {
        column: 'comparison_sum',
        aggregator: formula,
        options: {
          formula: '(GET("pop1.comparison_sum"))/(GET("landacres.comparison_sum"))',
        },
      },
    ],
  },
];
