const color0 = '#f2f2a2';
const color1 = '#efc68a';
const color2 = '#e99963';
const color3 = '#e56d44';
const color4 = '#e54444';

const choroplethConfigs = [
  {
    id: 'popperacre',
    label: 'Population Density',
    legendTitle: 'Persons per Acre',
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
    label: 'Under 18 Years',
    legendTitle: 'Population under 18 years',
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
    label: '65 Years and Over',
    legendTitle: 'Population 65 years and over',
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
    label: 'Bachelor\'s Degree or Higher',
    legendTitle: 'Population 25 years and over with bachelor\'s degree or higher',
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
    isPercent: true,
    label: 'Bachelor\'s Degree or Higher (percent)',
    legendTitle: 'Percent of population 25 years and over with bachelor\'s degree or higher',
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
    isPercent: true,
    label: 'Foreign Born (percent)',
    legendTitle: 'Percent foreign-born population',
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
    label: 'Limited English Proficiency (LEP)',
    legendTitle: 'Percent of population 5 years and over who speak English "less than very well"',
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
    legendTitle: 'Population below poverty level',
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
    isPercent: true,
    label: 'Below Poverty (percent)',
    legendTitle: 'Percent of population below poverty level',
    stops: [
      [14.9, color0],

      [15, color1],
      [24.9, color1],

      [25, color2],
      [34.9, color2],

      [35, color3],
      [49.9, color3],

      [50, color4],
    ],

  },
  {
    id: 'mdgr',
    label: 'Median Gross Rent',
    legendTitle: 'Median Gross Rent',
    stops: [
      [1299, color0],

      [1300, color1],
      [1599, color1],

      [1600, color2],
      [1999, color2],

      [2000, color3],
      [2499, color3],

      [2500, color4],
    ],

  },
];

const builtConfigs = choroplethConfigs.map((config) => {
  const { id, label, legendTitle, isPercent, stops } = config;
  return {
    id,
    label,
    legendTitle,
    isPercent,
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
