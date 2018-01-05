import calculator from '../../utils/calculator';

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
          procedure: ['agttm', 'divide', ['wrkr16pl', 'subtract', 'cw_wrkdhm']],
        },
      },
      {
        column: 'comparison_sum',
        aggregator: calculator,
        options: {
          procedure: ['agttm', 'divide', ['wrkr16pl', 'subtract', 'cw_wrkdhm']],
        },
      },
    ],
    decimal: 1,
  },
];
