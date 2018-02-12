import formula from '../../utils/formula';

export default [
  {
    highlight: true,
    title: 'Total population',
    data: 'pop4',
  },
  {
    title: 'In households',
    data: 'popinhh',
  },
  {
    indent: 1,
    title: 'In family households',
    data: 'popinfhh',
  },
  {
    indent: 2,
    title: 'Householder',
    data: 'hhldr',
  },
  {
    indent: 2,
    title: 'Spouse',
    data: 'spouse',
  },
  {
    indent: 2,
    title: 'Own child under 18 years',
    data: 'owncu18',
  },
  {
    indent: 2,
    title: 'Other relatives',
    data: 'othrrel',
  },
  {
    indent: 2,
    title: 'Nonrelatives',
    data: 'nonrel',
  },
  {
    indent: 3,
    title: 'Unmarried partner',
    data: 'nrelumptnr',
  },
  {
    indent: 1,
    title: 'In nonfamily households',
    data: 'nonfamhh',
  },
  {
    indent: 2,
    title: 'Householder',
    data: 'nfhhldr',
  },
  {
    indent: 2,
    title: 'Nonrelatives',
    data: 'nfnonrel',
  },
  {
    indent: 3,
    title: 'Unmarried partner',
    data: 'nfunmptnr',
  },
  {
    title: 'In group quarters',
    data: 'ingrpqtrs',
  },
  {
    indent: 1,
    title: 'Institutionalized',
    data: 'institlzd',
  },
  {
    divider: true,
  },
  {
    title: 'Average household size',
    tooltip: 'Household population divided by number of households',
    data: 'avghhsz',
    decimal: 2,
    special: true,
    specialCalculations: [
      {
        column: 'sum',
        aggregator: formula,
        options: {
          formula: '(GET("popinhh.sum"))/(GET("hh1.sum"))',
        },
      },
      {
        column: 'comparison_sum',
        aggregator: formula,
        options: {
          formula: '(GET("popinhh.comparison_sum"))/(GET("hh1.comparison_sum"))',
        },
      },
    ],
  },
  {
    title: 'Average family size',
    tooltip: 'Population in family households, minus nonrelatives in family households, divded by number of family households',
    data: 'avgfamsz',
    decimal: 2,
    special: true,
    specialCalculations: [
      {
        column: 'sum',
        aggregator: formula,
        options: {
          formula: '(GET("popinfam.sum"))/(GET("fam1.sum"))',
        },
      },
      {
        column: 'comparison_sum',
        aggregator: formula,
        options: {
          formula: '(GET("popinfam.comparison_sum"))/(GET("fam1.comparison_sum"))',
        },
      },
    ],
  },
  {
    divider: true,
  },
  {
    highlight: true,
    title: 'Total persons under 18 years',
    data: 'popu18',
  },
  {
    title: 'Householder or spouse',
    data: 'hhldru18',
  },
  {
    title: 'Own child',
    data: 'ownchu18',
  },
  {
    indent: 1,
    title: 'In married-couple family',
    data: 'ocinmcfu18',
  },
  {
    indent: 1,
    title: 'In other family',
    data: 'ocinofu18',
  },
  {
    indent: 2,
    title: 'Female householder',
    data: 'ocinfhhu18',
  },
  {
    title: 'Other relatives',
    data: 'orelu18',
  },
  {
    indent: 1,
    title: 'Grandchild',
    data: 'grndchu18',
  },
  {
    title: 'Nonrelatives',
    data: 'nonrelu18',
  },
  {
    title: 'In group quarters',
    data: 'ingqu18',
  },
  {
    divider: true,
  },
  {
    highlight: true,
    title: 'Total persons 65 years and over',
    data: 'pop65pl_2',
  },
  {
    title: 'In family households',
    data: 'infmhh65p',
  },
  {
    indent: 1,
    title: 'Householder',
    data: 'ifhhldr65p',
  },
  {
    indent: 1,
    title: 'Spouse',
    data: 'ifsps65p',
  },
  {
    indent: 1,
    title: 'Other relatives',
    data: 'iforel65p',
  },
  {
    indent: 1,
    title: 'Nonrelatives',
    data: 'ifnrel65p',
  },
  {
    title: 'In nonfamily households',
    data: 'innfmhh65p',
  },
  {
    indent: 1,
    title: 'Householder',
    data: 'infhhlr65p',
  },
  {
    indent: 2,
    title: 'Living alone',
    data: 'inflval65p',
  },
  {
    indent: 1,
    title: 'Nonrelatives',
    data: 'infnrel65p',
  },
  {
    title: 'In group quarters',
    data: 'ingq65p',
  },
  {
    indent: 1,
    title: 'Institutionalized',
    data: 'instgq65p',
  },
];
