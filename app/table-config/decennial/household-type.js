export default [
  {
    highlight: true,
    title: 'Total households',
    data: 'hh',
  },
  {
    indent: 1,
    title: 'Family households (families)',
    data: 'fam',
  },
  {
    indent: 1,
    title: 'With related children under 18 years',
    data: 'fmrelchu18',
  },
  {
    indent: 1,
    title: 'Married-couple family',
    data: 'mcfm',
  },
  {
    indent: 2,
    title: 'With related children under 18 years',
    data: 'mcfmrchu18',
  },
  {
    indent: 1,
    title: 'Female householder, no husband present',
    data: 'femnhsb',
  },
  {
    indent: 2,
    title: 'With related children under 18 years',
    data: 'fnhrchu18',
  },
  {
    indent: 1,
    title: 'Male householder, no wife present',
    data: 'malenwf',
  },
  {
    indent: 2,
    title: 'With related children under 18 years',
    data: 'mnwrchu18',
  },
  {
    title: 'Nonfamily households',
    data: 'nfamhh',
  },
  {
    indent: 1,
    title: 'Householder living alone',
    data: 'nfmlvgaln',
  },
  {
    indent: 2,
    title: 'Householder 65 years and over',
    data: 'nflval65p',
  },
  {
    divider: true,
  },
  {
    title: 'Households with individuals under 18 years',
    data: 'hhwindu18',
  },
  {
    title: 'Households with individuals 65 years and over',
    data: 'hhwind65p',
  },
];
