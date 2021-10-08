export default [
  {
    title: 'Total households',
    data: 'hh1',
    highlight: true,
  },
  {
    title: 'Family households (families)',
    data: 'fam1',
  },
  {
    title: 'With own children under 18 years',
    data: 'famchu18',
    indent: 2,
  },
  {
    title: 'Married-couple family',
    data: 'mrdfam',
    indent: 1,
  },
  {
    title: 'With own children under 18 years',
    data: 'mrdchu18',
    indent: 2,
  },
  {
    title: 'Male householder, no spouse present, family',
    data: 'mhns',
    indent: 1,
  },
  {
    title: 'With own children under 18 years',
    data: 'mhnschu18',
    indent: 2,
  },
  {
    title: 'Female householder, no spouse present, family',
    data: 'fhns',
    indent: 1,
  },
  {
    title: 'With own children under 18 years',
    data: 'fhnschu18',
    indent: 2,
  },
  {
    title: 'Nonfamily households',
    data: 'nfam1',
  },
  {
    title: 'Householder living alone',
    data: 'nfama',
    indent: 1,
  },
  {
    title: '65 years and over',
    data: 'nfama65pl',
    indent: 2,
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