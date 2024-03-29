export default [
  {
    data: 'pop1',
    title: 'Total Population',
    highlight: true,
  },
  {
    data: 'male',
    title: 'Male',
  },
  {
    data: 'fem',
    title: 'Female',
  },
  { divider: true,},
  {
    data: 'popu5',
    title: 'Under 5 years',
  },
  {
    data: 'pop5t9',
    title: '5 to 9 years',
  },
  {
    data: 'pop10t14',
    title: '10 to 14 years',
  },
  {
    data: 'pop15t19',
    title: '15 to 19 years',
  },
  {
    data: 'pop20t24',
    title: '20 to 24 years',
  },
  {
    data: 'pop25t29',
    title: '25 to 29 years',
  },
  {
    data: 'pop30t34',
    title: '30 to 34 years',
  },
  {
    data: 'pop35t39',
    title: '35 to 39 years',
  },
  {
    data: 'pop40t44',
    title: '40 to 44 years',
  },
  {
    data: 'pop45t49',
    title: '45 to 49 years',
  },
  {
    data: 'pop50t54',
    title: '50 to 54 years',
  },
  {
    data: 'pop55t59',
    title: '55 to 59 years',
  },
  {
    data: 'pop60t64',
    title: '60 to 64 years',
  },
  {
    data: 'pop65t69',
    title: '65 to 69 years',
  },
  {
    data: 'pop70t74',
    title: '70 to 74 years',
  },
  {
    data: 'pop75t79',
    title: '75 to 79 years',
  },
  {
    data: 'pop80t84',
    title: '80 to 84 years',
  },
  {
    data: 'pop85pl',
    title: '85 years and over',
  },
  { divider: true,},
  {
    data: 'mdage',
    title: 'Median age (years)',
    tooltip:
      'Medians are calculated using linear interpolation, which may result in top-coded values.',
    decimal: 1,
    special: true,
  },
  { divider: true,},
  {
    data: 'popu18',
    title: 'Under 18 years',
  },
  {
    data: 'pop65pl',
    title: '65 years and over',
  },
  { divider: true,},
  {
    data: 'agdpdrt',
    title: 'Age dependency ratio',
    tooltip:
      'Derived by dividing the combined under-18 and 65-and-over populations by the 18-to-64 population and multiplying by 100',
    decimal: 1,
    special: true,
  },
  {
    data: 'odagdpdrt',
    title: 'Old-age dependency ratio',
    tooltip:
      'Derived by dividing the population 65 and over by the 18-to-64 population and multiplying by 100.',
    decimal: 1,
    special: true,
  },
  {
    data: 'chlddpdrt',
    title: 'Child dependency ratio',
    tooltip:
      'Derived by dividing the population under 18 by the 18-to-64 population and multiplying by 100.',
    decimal: 1,
    special: true,
  },
  { divider: true,},
  {
    data: 'popacre',
    title: 'Population per acre',
    tooltip: 'Total population divided by land area (acres)',
    decimal: 1,
    special: true,
  },
];
