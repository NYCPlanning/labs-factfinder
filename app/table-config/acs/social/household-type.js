export default [
  {
    title: 'Total households',
    highlight: true,
    data: 'hh1',
  },
  {
    title: 'Family households (families)',
    data: 'fam1',
  },
  {
    indent: 2,
    title: 'With own children under 18 years',
    data: 'famchu18',
  },
  {
    indent: 1,
    title: 'Married-couple family',
    data: 'mrdfam',
  },
  {
    indent: 2,
    title: 'With own children under 18 years',
    data: 'mrdchu18',
  },
  {
    indent: 1,
    title: 'Male householder, no wife present, family',
    data: 'mhnw',
  },
  {
    indent: 2,
    title: 'With own children under 18 years',
    data: 'mhnwchu18',
  },
  {
    indent: 1,
    title: 'Female householder, no husband present, family',
    data: 'fhnh',
  },
  {
    indent: 2,
    title: 'With own children under 18 years',
    data: 'fhnhchu18',
  },
  {
    title: 'Nonfamily households',
    data: 'nfam1',
  },
  {
    indent: 1,
    title: 'Householder living alone',
    data: 'nfama',
  },
  {
    indent: 2,
    title: '65 years and over',
    data: 'nfama65pl',
  },
  {
    divider: true,
  },
  {
    title: 'Households with one or more people under 18 years',
    data: 'hh1plu18',
  },
  {
    title: 'Households with one or more people 65 years and over',
    data: 'hh1pl65pl',
  },
  {
    divider: true,
  },
  {
    title: 'Average household size',
    tooltip: 'Household population divided by number of households',
    data: 'avghhsz',
    special: true,
    decimal: 2,
  },
  {
    title: 'Average family size',
    tooltip: 'Population in family households, minus nonrelatives in family households, divided by number of family households',
    data: 'avgfmsz',
    special: true,
    decimal: 2,
  },
  {
    divider: true,
  },
];
