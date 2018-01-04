import interpolate from '../../utils/interpolate';

export default [
  {
    title: 'Total population',
    highlight: true,
    data: 'pop2',
  },
  {
    title: 'Male',
    classNames: '',
    data: 'male',
  },
  {
    title: 'Female',
    classNames: '',
    data: 'fem',
  },
  {
    divider: true,
  },
  {
    title: 'Under 5 years',
    classNames: '',
    data: 'popu5',
  },
  {
    title: '5 to 9 years',
    classNames: '',
    data: 'pop5t9',
  },
  {
    title: '10 to 14 years',
    classNames: '',
    data: 'pop10t14',
  },
  {
    title: '15 to 19 years',
    classNames: '',
    data: 'pop15t19',
  },
  {
    title: '20 to 24 years',
    classNames: '',
    data: 'pop20t24',
  },
  {
    title: '25 to 29 years',
    classNames: '',
    data: 'pop25t29',
  },
  {
    title: '30 to 34 years',
    classNames: '',
    data: 'pop30t34',
  },
  {
    title: '35 to 39 years',
    classNames: '',
    data: 'pop35t39',
  },
  {
    title: '40 to 44 years',
    classNames: '',
    data: 'pop40t44',
  },
  {
    title: '45 to 49 years',
    classNames: '',
    data: 'pop45t49',
  },
  {
    title: '50 to 54 years',
    classNames: '',
    data: 'pop50t54',
  },
  {
    title: '55 to 59 years',
    classNames: '',
    data: 'pop55t59',
  },
  {
    title: '60 to 64 years',
    classNames: '',
    data: 'pop60t64',
  },
  {
    title: '65 to 69 years',
    classNames: '',
    data: 'pop65t69',
  },
  {
    title: '70 to 74 years',
    classNames: '',
    data: 'pop70t74',
  },
  {
    title: '75 to 79 years',
    classNames: '',
    data: 'pop75t79',
  },
  {
    title: '80 to 84 years',
    classNames: '',
    data: 'pop80t84',
  },
  {
    title: '85 years and over',
    classNames: '',
    data: 'pop85pl',
  },
  {
    divider: true,
  },
  {
    title: 'Median age (years)',
    tooltip: 'Medians are calculated using linear interpolation, which may result in top-coded values',
    classNames: '',
    data: 'mdage',
    special: true,
    decimal: 1,
    aggregator: interpolate,
    options: {
      bins: [
        ['popu5', [0, 5]],
        ['pop5t9', [5, 9]],
        ['pop10t14', [10, 14]],
        ['pop15t19', [15, 19]],
        ['pop20t24', [20, 24]],
        ['pop25t29', [25, 29]],
        ['pop30t34', [30, 34]],
        ['pop35t39', [35, 39]],
        ['pop40t44', [40, 44]],
        ['pop45t49', [45, 49]],
        ['pop50t54', [50, 54]],
        ['pop55t59', [55, 59]],
        ['pop60t64', [60, 64]],
        ['pop65t69', [65, 69]],
        ['pop70t74', [70, 74]],
        ['pop75t79', [75, 79]],
        ['pop80t84', [80, 84]],
        ['pop85pl', [85, 115]],
      ],
    },
  },
  {
    divider: true,
  },
  {
    title: '18 years and over',
    data: 'pop18pl',
  },
  {
    title: '21 years and over',
    data: 'pop21pl',
  },
  {
    title: '62 years and over',
    data: 'pop62pl',
  },
  {
    title: '65 years and over',
    data: 'pop65pl_1',
  },
  {
    indent: 1,
    title: 'Male',
    data: 'pop65plm',
  },
  {
    indent: 1,
    title: 'Female',
    data: 'pop65plf',
  },
];
