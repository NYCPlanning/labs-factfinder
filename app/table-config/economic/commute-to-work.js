import calculator from '../../utils/calculator';
import formula from '../../utils/formula';

export default [
  {
    title: 'Workers 16 years and over',
    highlight: true,
    data: 'wrkr16pl',
  },
  {
    title: 'Car, truck, or van -- drove alone',
    data: 'cw_drvaln',
  },
  {
    title: 'Car, truck, or van -- carpooled',
    data: 'cw_crpld',
  },
  {
    title: 'Public transportation',
    data: 'cw_pbtrns',
  },
  {
    title: 'Walked',
    data: 'cw_wlkd',
  },
  {
    title: 'Other means',
    data: 'cw_oth',
  },
  {
    title: 'Worked at home',
    data: 'cw_wrkdhm',
  },
  {
    divider: true,
  },
  {
    title: 'Mean travel time to work (minutes)',
    tooltip: 'Aggregate travel time to work, divided by workers 16 years and over who did not work at home',
    data: 'mntrvtm',
    special: true,
    specialCalculations: [
      {
        column: 'sum',
        aggregator: calculator,
        options: {
          procedure: ['agttm.sum', 'divide', ['wrkr16pl.sum', 'subtract', 'cw_wrkdhm.sum']],
        },
      },
      {
        column: 'comparison_sum',
        aggregator: calculator,
        options: {
          procedure: ['agttm.comparison_sum', 'divide', ['wrkr16pl.comparison_sum', 'subtract', 'cw_wrkdhm.comparison_sum']],
        },
      },
      {
        column: 'cv',
        aggregator: formula,
        options: {
          formula: '(316)*((GET("uwpopsmpl.sum"))^-0.679)',
        },
      },
      {
        column: 'comparison_cv',
        aggregator: formula,
        options: {
          formula: '(316)*((GET("uwpopsmpl.comparison_sum"))^-0.679)',
        },
      },
      {
        column: 'm',
        aggregator: formula,
        options: {
          formula: '((((GET("mntrvtm.cv"))/(100))*(1.645))*(GET("mntrvtm.sum")))',
        },
      },
      {
        column: 'comparison_m',
        aggregator: formula,
        options: {
          formula: '((((GET("mntrvtm.comparison_cv"))/(100))*(1.645))*(GET("mntrvtm.comparison_sum")))',
        },
      },
    ],
    decimal: 1,
  },
];
