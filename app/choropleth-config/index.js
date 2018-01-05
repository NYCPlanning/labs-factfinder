const color0 = '#f2f2a2';
const color1 = '#efc68a';
const color2 = '#e99963';
const color3 = '#e56d44';
const color4 = '#e54444';

const choroplethConfigs = [
  {
    group: 'Census',
    id: 'popperacre',
    label: 'Population Density',
    tooltip: 'Persons per acre',
    legendTitle: 'Persons per Acre',
    stops: [25, 50, 100, 150, 1000000],
  },

  {
    group: 'Demographic (ACS)',
    id: 'popu181',
    label: 'Under 18 Years',
    tooltip: 'Population under 18 years',
    legendTitle: 'Population under 18 years',
    stops: [8000, 12000, 16000, 20000, 1000000],
  },
  {
    group: 'Demographic (ACS)',
    id: 'pop65pl1',
    label: '65 Years and Over',
    tooltip: 'Population 65 years and over',
    legendTitle: 'Population 65 years and over',
    stops: [5000, 8000, 11000, 14000, 1000000],
  },
  {
    group: 'Social (ACS)',
    id: 'ea_bchdh',
    label: 'Bachelor\'s Degree or Higher',
    tooltip: 'Population 25 years and over with bachelor\'s degree or higher',
    legendTitle: 'Population 25 years and over with bachelor\'s degree or higher',
    stops: [10000, 20000, 30000, 40000, 1000000],
  },
  {
    group: 'Social (ACS)',
    id: 'ea_bchdh_p',
    isPercent: true,
    label: 'Bachelor\'s Degree or Higher (percent)',
    tooltip: 'Percent of population 25 years and over with bachelor\'s degree or higher',
    legendTitle: 'Percent of population 25 years and over with bachelor\'s degree or higher',
    stops: [25, 40, 50, 80, 1000000],
  },
  {
    group: 'Social (ACS)',
    id: 'fb1_p',
    isPercent: true,
    label: 'Foreign-born (percent)',
    tooltip: 'Percent of population that is foreign-born',
    legendTitle: 'Percent foreign-born population',
    stops: [30, 40, 50, 60, 10000000],
  },
  {
    group: 'Social (ACS)',
    id: 'lgoenlep',
    label: 'Limited English Proficiency (LEP)',
    tooltip: 'Population 5 years and over who speak English "less than very well"',
    legendTitle: 'Population 5 years and over who speak English "less than very well"',
    stops: [8000, 16000, 24000, 32000, 1000000],
  },
  {
    group: 'Economic (ACS)',
    id: 'pbwpv',
    label: 'Below Poverty',
    tooltip: 'Population whose income is below the poverty level',
    legendTitle: 'Population below poverty level',
    stops: [5000, 10000, 15000, 20000, 1000000],
  },
  {
    group: 'Economic (ACS)',
    id: 'pbwpv_p',
    isPercent: true,
    label: 'Below Poverty (percent)',
    tooltip: 'Percent of population whose income is below the poverty level',
    legendTitle: 'Percent of population below poverty level',
    stops: [15, 25, 35, 50, 1000000],
  },
  {
    group: 'Housing (ACS)',
    id: 'mdgr',
    label: 'Median Gross Rent',
    tooltip: 'Median gross rent (in 2016 inflation-adjusted dollars)',
    legendTitle: 'Median Gross Rent',
    stops: [1300, 1600, 2000, 2500, 1000000],
  },
];

const builtConfigs = choroplethConfigs.map((config) => {
  const { group, id, label, legendTitle, isPercent, stops, tooltip } = config;
  return {
    group,
    id,
    label,
    legendTitle,
    tooltip,
    isPercent,
    colors: [
      color0,
      color1,
      color2,
      color3,
      color4,
    ],
    stops,
    paintFill: {
      'fill-color': [
        'curve',
        ['step'],
        [
          'number',
          ['get', id],
          1,
        ],
        color0, stops[0],
        color1, stops[1],
        color2, stops[2],
        color3, stops[3],
        color4, stops[4],
        '#FFF',
      ],
    },
    paintLine: {
      'line-color': '#994d4d',
    },
  };
});

export default builtConfigs;
