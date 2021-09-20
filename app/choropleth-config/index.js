const color0 = '#f2f2a2';
const color1 = '#efc68a';
const color2 = '#e99963';
const color3 = '#e56d44';
const color4 = '#e54444';

const choroplethConfigs = [
  {
    group: 'Census',
    id: 'pop1',
    label: 'Population',
    tooltip: 'Total population, 2020',
    legendTitle: 'Total population, 2020',
    stops: [30000,40000,55000,70000,85000],
  },
  {
    group: 'Census',
    id: 'popperacre',
    label: 'Population Density',
    tooltip: 'Persons per acre',
    legendTitle: 'Persons per Acre',
    stops: [25, 50, 100, 150],
  },
  {
    group: 'Census',
    id: 'popu18_1',
    label: 'Under 18 Years',
    tooltip: 'Population under 18 years',
    legendTitle: 'Population under 18 years',
    stops: [8000, 10000, 15000, 20000],
  },
  {
    group: 'Demographic (ACS)',
    id: 'pop65pl1',
    label: '65 Years and Over',
    tooltip: 'Population 65 years and over',
    legendTitle: 'Population 65 years and over',
    stops: [5000, 8000, 11000, 14000],
  },
  {
    group: 'Social (ACS)',
    id: 'ea_bchdh',
    label: 'Bachelor\'s Degree or Higher',
    tooltip: 'Population 25 years and over with bachelor\'s degree or higher',
    legendTitle: 'Population 25 years and over with bachelor\'s degree or higher',
    stops: [10000, 20000, 30000, 45000],
  },
  {
    group: 'Social (ACS)',
    id: 'ea_bchdh_p',
    isPercent: true,
    label: 'Bachelor\'s Degree or Higher (percent)',
    tooltip: 'Percent of population 25 years and over with bachelor\'s degree or higher',
    legendTitle: 'Percent of population 25 years and over with bachelor\'s degree or higher',
    stops: [25, 40, 50, 80],
  },
  {
    group: 'Social (ACS)',
    id: 'fb1_p',
    isPercent: true,
    label: 'Foreign-born (percent)',
    tooltip: 'Percent of population that is foreign-born',
    legendTitle: 'Percent foreign-born population',
    stops: [30, 40, 50, 60],
  },
  {
    group: 'Social (ACS)',
    id: 'lgoenlep',
    label: 'Limited English Proficiency (LEP)',
    tooltip: 'Population 5 years and over who speak English "less than very well"',
    legendTitle: 'Population 5 years and over who speak English "less than very well"',
    stops: [8000, 16000, 24000, 32000],
  },
  {
    group: 'Economic (ACS)',
    id: 'pbwpv',
    label: 'Below Poverty',
    tooltip: 'Population whose income is below the poverty level',
    legendTitle: 'Population below poverty level',
    stops: [5000, 10000, 15000, 21000],
  },
  {
    group: 'Economic (ACS)',
    id: 'pbwpv_p',
    isPercent: true,
    label: 'Below Poverty (percent)',
    tooltip: 'Percent of population whose income is below the poverty level',
    legendTitle: 'Percent of population below poverty level',
    stops: [15,25,32,44]
  },
  {
    group: 'Housing (ACS)',
    id: 'mdgr',
    label: 'Median Gross Rent',
    tooltip: 'Median gross rent (in 2018 inflation-adjusted dollars)',
    legendTitle: 'Median Gross Rent',
    stops: [1200, 1500, 2000, 2500],
  },
  // Racial Group
  {
    group: 'Census',
    id: 'wnh',
    label: 'White Non-Hispanic',
    tooltip: 'White non-Hispanic population, 2020',
    legendTitle: 'White Non-Hispanic',
    stops: [5000,10000,20000,30000,40000],
  },
  {
    group: 'Census',
    id: 'bnh',
    label: 'Black Non-Hispanic',
    tooltip: 'Black non-Hispanic population, 2020',
    legendTitle: 'Black Non-Hispanic',
    stops: [5000,10000,20000,30000,40000],
  },
  {
    group: 'Census',
    id: 'anh',
    label: 'Asian Non-Hispanic',
    tooltip: 'Asian non-Hispanic population, 2020',
    legendTitle: 'Asian Non-Hispanic',
    stops: [5000,10000,20000,30000,40000],
  },
  {
    group: 'Census',
    id: 'hsp1',
    label: 'Hispanic',
    tooltip: 'Hispanic population, 2020',
    legendTitle: 'Hispanic',
    stops: [5000,10000,20000,30000,40000],
  },
  // Racial Group (percent)
  {
    group: 'Census',
    id: 'wnhp',
    label: 'White Non-Hispanic (percent)',
    tooltip: 'Percent of the population that is White non-Hispanic, 2020',
    legendTitle: 'White Non-Hispanic (percent)',
    stops: [20,35,50,65,80],
  },
  {
    group: 'Census',
    id: 'bnhp',
    label: 'Black Non-Hispanic (percent)',
    tooltip: 'Percent of the population that is Black non-Hispanic, 2020',
    legendTitle: 'Black Non-Hispanic (percent)',
    stops: [20,35,50,65,80],
  },
  {
    group: 'Census',
    id: 'anhp',
    label: 'Asian Non-Hispanic (percent)',
    tooltip: 'Percent of the population that is Asian non-Hispanic, 2020',
    legendTitle: 'Asian Non-Hispanic (percent)',
    stops: [20,35,50,65,80],
  },
  {
    group: 'Census',
    id: 'hsp1p',
    label: 'Hispanic (percent)',
    tooltip: 'Percent of the population that is Hispanic, 2020',
    legendTitle: 'Hispanic (percent)',
    stops: [20,35,50,65,80],
  },
  // Racial Group (change)
  {
    group: 'Census',
    id: 'wnh_c',
    label: 'White Non-Hispanic (change)',
    tooltip: 'White non-Hispanic population change, 2010 to 2020',
    legendTitle: 'White Non-Hispanic (change)',
    stops: [-5000,-1000,-500,500,1000,5000,10000]
  },
  {
    group: 'Census',
    id: 'bnh_c',
    label: 'Black Non-Hispanic (change)',
    tooltip: 'Black non-Hispanic population change, 2010 to 2020',
    legendTitle: 'Black Non-Hispanic (change)',
    stops: [-5000,-1000,-500,500,1000,5000,10000]
  },
  {
    group: 'Census',
    id: 'anh_c',
    label: 'Asian Non-Hispanic (change)',
    tooltip: 'Asian non-Hispanic population change, 2010 to 2020',
    legendTitle: 'Asian Non-Hispanic (change)',
    stops: [-5000,-1000,-500,500,1000,5000,10000]
  },
  {
    group: 'Census',
    id: 'hsp1_c',
    label: 'Hispanic (change)',
    tooltip: 'Hispanic population change, 2010 to 2020',
    legendTitle: 'Hispanic (change)',
    stops: [-5000,-1000,-500,500,1000,5000,10000]
  },
  // Racial Group (percent change)
  {
    group: 'Census',
    id: 'wnh_pc',
    label: 'White Non-Hispanic (change)',
    tooltip: 'White non-Hispanic population change, 2010 to 2020',
    legendTitle: 'White Non-Hispanic (change)',
    stops: [-5000,-1000,-500,500,1000,5000,10000]
  },
];

const builtConfigs = choroplethConfigs.map((config) => {
  const {
    group, id, label, legendTitle, isPercent, stops, tooltip,
  } = config;
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
        'step',
        ['get', id],
        color0, stops[0],
        color1, stops[1],
        color2, stops[2],
        color3, stops[3],
        color4,
      ],
    },
    paintLine: {
      'line-color': '#994d4d',
    },
  };
});

console.log({builtConfigs})

export default builtConfigs;
