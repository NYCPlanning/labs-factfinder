const color0 = '#E5E544';
const color1 = '#E5BD44';
const color2 = '#E59544';
const color3 = '#E56D44';
const color4 = '#E54444';

const choroplethConfigs = [
  {
    id: 'popperacre',
    label: 'Population Density',
    stops: [

      [24.9, color0],

      [25, color1],
      [49.9, color1],

      [50, color2],
      [99.9, color2],

      [100, color3],
      [149.9, color3],

      [150.0, color4],
    ],
  },

  {
    id: 'popu181',
    label: 'Population under 18',
    stops: [
      [7999, color0],

      [8000, color1],
      [11999, color1],

      [12000, color2],
      [15999, color2],

      [16000, color3],
      [19999, color3],

      [20000, color4],
    ],

  },
  {
    id: 'pop65pl1',
    label: 'Population over 65',
    stops: [
      [4999, color0],

      [5000, color1],
      [7999, color1],

      [8000, color2],
      [10999, color2],

      [11000, color3],
      [13999, color3],

      [14000, color4],
    ],

  },
  {
    id: 'ea_bchdh',
    label: 'Bachelors degree or higher',
    stops: [
      [9999, color0],

      [10000, color1],
      [19999, color1],

      [20000, color2],
      [29999, color2],

      [30000, color3],
      [39999, color3],

      [40000, color4],
    ],

  },
  {
    id: 'ea_bchdh_p',
    label: 'Bachelors degree or higher percent',
    stops: [
      [24.9, color0],

      [25, color1],
      [39.9, color1],

      [40, color2],
      [49.9, color2],

      [50, color3],
      [79.9, color3],

      [80, color4],
    ],

  },
  {
    id: 'fb1_p',
    label: 'Foreign Born Percent',
    stops: [
      [29.9, color0],

      [30, color1],
      [39.9, color1],

      [40, color2],
      [49.9, color2],

      [50, color3],
      [59.9, color3],

      [60, color4],
    ],

  },
  {
    id: 'lgoenlep',
    label: 'Limited English Proficiency',
    stops: [
      [7999, color0],

      [8000, color1],
      [15999, color1],

      [16000, color2],
      [23999, color2],

      [24000, color3],
      [31999, color3],

      [32000, color4],
    ],

  },
  {
    id: 'pbwpv',
    label: 'Below Poverty',
    stops: [
      [4999, color0],

      [5000, color1],
      [9999, color1],

      [10000, color2],
      [14999, color2],

      [15000, color3],
      [19999, color3],

      [20000, color4],
    ],

  },
  {
    id: 'pbwpv_p',
    label: 'Below Poverty percent',
    stops: [
      [14.9, color0],

      [15, color1],
      [29.9, color1],

      [30, color2],
      [39.9, color2],

      [40, color3],
      [49.9, color3],

      [50, color4],
    ],

  },
  {
    id: 'mdgr',
    label: 'Median Gross Rent',
    stops: [
      [1299, color0],

      [1300, color1],
      [1499, color1],

      [1500, color2],
      [1799, color2],

      [1800, color3],
      [2099, color3],

      [2100, color4],
    ],

  },
];

const builtConfigs = choroplethConfigs.map((config) => {
  const { id, label, stops } = config;
  return {
    id,
    label,
    paintFill: {
      'fill-color': {
        property: id,
        stops,
      },
    },
    paintLine: {
      'line-color': {
        property: id,
        stops,
      },
    },
  };
});

export default builtConfigs;
