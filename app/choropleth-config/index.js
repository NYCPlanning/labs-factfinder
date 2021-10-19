const choroplethConfigs = [
  
  {
    group: 'Census',
    id: 'popperacre',
    label: 'Population Density',
    tooltip: 'Persons per acre',
    legendTitle: 'Persons per Acre',
    stops: [
      '#f2f2a2', 25,
      '#efc68a', 50,
      '#e99963', 100,
      '#e56d44', 150,
      '#e54444'
    ],
  },
  {
    group: 'Demographic (ACS)',
    id: 'pop65pl1',
    label: '65 Years and Over',
    tooltip: 'Population 65 years and over',
    legendTitle: 'Population 65 years and over',
    stops: [
      '#f2f2a2', 5000,
      '#efc68a', 8000,
      '#e99963',11000,
      '#e56d44', 14000,
      '#e54444'
    ],
  },
  {
    group: 'Social (ACS)',
    id: 'ea_bchdh',
    label: 'Bachelor\'s Degree or Higher',
    tooltip: 'Population 25 years and over with bachelor\'s degree or higher',
    legendTitle: 'Population 25 years and over with bachelor\'s degree or higher',
    stops: [
      '#f2f2a2', 10000,
      '#efc68a', 20000,
      '#e99963', 30000,
      '#e56d44', 45000,
      '#e54444'
    ],
  },
  {
    group: 'Social (ACS)',
    id: 'ea_bchdh_p',
    isPercent: true,
    label: 'Bachelor\'s Degree or Higher (percent)',
    tooltip: 'Percent of population 25 years and over with bachelor\'s degree or higher',
    legendTitle: 'Percent of population 25 years and over with bachelor\'s degree or higher',
    stops: [
      '#f2f2a2', 25,
      '#efc68a', 40,
      '#e99963', 50,
      '#e56d44', 80,
      '#e54444'
    ],
  },
  {
    group: 'Social (ACS)',
    id: 'fb1_p',
    isPercent: true,
    label: 'Foreign-born (percent)',
    tooltip: 'Percent of population that is foreign-born',
    legendTitle: 'Percent foreign-born population',
    stops: [
      '#f2f2a2', 30,
      '#efc68a', 40,
      '#e99963', 50,
      '#e56d44', 60,
      '#e54444'
    ],
  },
  {
    group: 'Social (ACS)',
    id: 'lgoenlep1',
    label: 'Limited English Proficiency (LEP)',
    tooltip: 'Population 5 years and over who speak English "less than very well"',
    legendTitle: 'Population 5 years and over who speak English "less than very well"',
    stops: [
      '#f2f2a2', 8000,
      '#efc68a', 16000,
      '#e99963', 24000,
      '#e56d44', 32000,
      '#e54444'
    ],
  },
  {
    group: 'Economic (ACS)',
    id: 'pbwpv',
    label: 'Below Poverty',
    tooltip: 'Population whose income is below the poverty level',
    legendTitle: 'Population below poverty level',
    stops: [
      '#f2f2a2', 5000,
      '#efc68a', 10000,
      '#e99963', 15000,
      '#e56d44', 21000,
      '#e54444'
    ],
  },
  {
    group: 'Economic (ACS)',
    id: 'pbwpv_p',
    isPercent: true,
    label: 'Below Poverty (percent)',
    tooltip: 'Percent of population whose income is below the poverty level',
    legendTitle: 'Percent of population below poverty level',
    stops: [
      '#f2f2a2', 15,
      '#efc68a', 25,
      '#e99963', 32,
      '#e56d44', 44,
      '#e54444'
    ],
  },
  {
    group: 'Housing (ACS)',
    id: 'mdgr',
    label: 'Median Gross Rent',
    tooltip: 'Median gross rent (in 2018 inflation-adjusted dollars)',
    legendTitle: 'Median Gross Rent',
    stops: [
      '#f2f2a2', 1200,
      '#efc68a', 1500,
      '#e99963', 2000,
      '#e56d44', 2500,
      '#e54444'
    ],
  },
  // Count
  {
    group: 'Census',
    id: 'pop1',
    label: 'Population',
    tooltip: 'Total population, 2020',
    legendTitle: 'Total population, 2020',
    stops: ['#f2f2a2',30000,'#efc68a',40000,'#e99963',55000,'#e56d44',70000,'#e54444',85000,'#cb1d00']
  },
  {
    group: 'Census',
    id: 'popu18_1',
    label: 'Under 18',
    tooltip: 'Population under 18 years, 2020',
    legendTitle: 'Under 18',
    stops: [
      '#f2f2a2', 10000,
      '#efc68a', 15000,
      '#e99963', 20000,
      '#e56d44', 25000,
      '#e54444'
    ],
  },
  {
    group: 'Census',
    id: 'wnh',
    label: 'White Non-Hispanic',
    tooltip: 'White non-Hispanic population, 2020',
    legendTitle: 'White Non-Hispanic',
    stops: [
      '#f2f2a2', 5000,
      '#efc68a', 10000,
      '#e99963', 20000,
      '#e56d44', 30000,
      '#e54444', 40000,
      '#cb1d00'
    ]
  },
  {
    group: 'Census',
    id: 'bnh',
    label: 'Black Non-Hispanic',
    tooltip: 'Black non-Hispanic population, 2020',
    legendTitle: 'Black Non-Hispanic',
    stops: [
      '#f2f2a2', 5000,
      '#efc68a', 10000,
      '#e99963', 20000,
      '#e56d44', 30000,
      '#e54444', 40000,
      '#cb1d00'
    ]
  },
  {
    group: 'Census',
    id: 'anh',
    label: 'Asian Non-Hispanic',
    tooltip: 'Asian non-Hispanic population, 2020',
    legendTitle: 'Asian Non-Hispanic',
    stops: [
      '#f2f2a2', 5000,
      '#efc68a', 10000,
      '#e99963', 20000,
      '#e56d44', 30000,
      '#e54444', 40000,
      '#cb1d00'
    ],
  },
  {
    group: 'Census',
    id: 'hsp1',
    label: 'Hispanic',
    tooltip: 'Hispanic population, 2020',
    legendTitle: 'Hispanic',
    stops: [
      '#f2f2a2', 5000,
      '#efc68a', 10000,
      '#e99963', 20000,
      '#e56d44', 30000,
      '#e54444', 40000,
      '#cb1d00'
    ],
  },
  // Percent
  {
    group: 'Census',
    id: 'popu18_1p',
    label: 'Under 18 (percent)',
    tooltip: 'Percent of the population under 18 years, 2020',
    legendTitle: 'Under 18 (percent)',
    stops: [
      '#f2f2a2', 15,
      '#efc68a', 20,
      '#e99963', 25,
      '#e56d44', 30,
      '#e54444'
    ],
    isPercent: true,
  },
  {
    group: 'Census',
    id: 'wnhp',
    label: 'White Non-Hispanic (percent)',
    tooltip: 'Percent of the population that is White non-Hispanic, 2020',
    legendTitle: 'White Non-Hispanic (percent)',
    stops: [
      '#f2f2a2', 20,
      '#efc68a', 35,
      '#e99963', 50,
      '#e56d44', 65,
      '#e54444', 80,
      '#cb1d00'
    ],
    isPercent: true,
  },
  {
    group: 'Census',
    id: 'bnhp',
    label: 'Black Non-Hispanic (percent)',
    tooltip: 'Percent of the population that is Black non-Hispanic, 2020',
    legendTitle: 'Black Non-Hispanic (percent)',
    stops: [
      '#f2f2a2', 20,
      '#efc68a', 35,
      '#e99963', 50,
      '#e56d44', 65,
      '#e54444', 80,
      '#cb1d00'
    ],
    isPercent: true,
  },
  {
    group: 'Census',
    id: 'anhp',
    label: 'Asian Non-Hispanic (percent)',
    tooltip: 'Percent of the population that is Asian non-Hispanic, 2020',
    legendTitle: 'Asian Non-Hispanic (percent)',
    stops: [
      '#f2f2a2', 20,
      '#efc68a', 35,
      '#e99963', 50,
      '#e56d44', 65,
      '#e54444', 80,
      '#cb1d00'
    ],
    isPercent: true,
  },
  {
    group: 'Census',
    id: 'hsp1p',
    label: 'Hispanic (percent)',
    tooltip: 'Percent of the population that is Hispanic, 2020',
    legendTitle: 'Hispanic (percent)',
    stops: [
      '#f2f2a2', 20,
      '#efc68a', 35,
      '#e99963', 50,
      '#e56d44', 65,
      '#e54444', 80,
      '#cb1d00'
    ],
    isPercent: true,
  },
  // Change
  {
    group: 'Census',
    id: 'pop1_c',
    label: 'Population (change)',
    tooltip: 'Population change, 2010 to 2020',
    legendTitle: 'Population (change)',
    stops: ['#c81d00',-5000,'#f46c59',-1000,'#ffc0b4',-500,'#ffffff',500,'#b5d5e5',1000,'#0473ad',5000,'#0b5476',10000,'#012661'],
  },
  {
    group: 'Census',
    id: 'wnh_c',
    label: 'White Non-Hispanic (change)',
    tooltip: 'White non-Hispanic population change, 2010 to 2020',
    legendTitle: 'White Non-Hispanic (change)',
    stops: ['#c81d00',-5000,'#f46c59',-1000,'#ffc0b4',-500,'#ffffff',500,'#b5d5e5',1000,'#0473ad',5000,'#0b5476',10000,'#012661'],
  },
  {
    group: 'Census',
    id: 'bnh_c',
    label: 'Black Non-Hispanic (change)',
    tooltip: 'Black non-Hispanic population change, 2010 to 2020',
    legendTitle: 'Black Non-Hispanic (change)',
    stops: ['#c81d00',-5000,'#f46c59',-1000,'#ffc0b4',-500,'#ffffff',500,'#b5d5e5',1000,'#0473ad'],

  },
  {
    group: 'Census',
    id: 'anh_c',
    label: 'Asian Non-Hispanic (change)',
    tooltip: 'Asian non-Hispanic population change, 2010 to 2020',
    legendTitle: 'Asian Non-Hispanic (change)',
    stops: ['#c81d00',-5000,'#f46c59',-1000,'#ffc0b4',-500,'#ffffff',500,'#b5d5e5',1000,'#0473ad',5000,'#0b5476',10000,'#012661'],
  },
  {
    group: 'Census',
    id: 'hsp1_c',
    label: 'Hispanic (change)',
    tooltip: 'Hispanic population change, 2010 to 2020',
    legendTitle: 'Hispanic (change)',
    stops: ['#c81d00',-5000,'#f46c59',-1000,'#ffc0b4',-500,'#ffffff',500,'#b5d5e5',1000,'#0473ad',5000,'#0b5476'],
  },
  // Percent Change
  {
    group: 'Census',
    id: 'popu18_1_pc',
    label: 'Population (percent change)',
    tooltip: 'Percent change in population, 2010 to 2020',
    legendTitle: 'Population (percent change)',
    isPercent: true,
    stops: ['#ffc0b4',-5,'#ffffff',5,'#b5d5e5',10,'#5fa4cb',15,'#0473ad',25,'#0b5476',50,'#012661']
  },
  {
    group: 'Census',
    id: 'wnh_pc',
    label: 'White Non-Hispanic (percent change)',
    tooltip: 'Percent change in the White Non-Hispanic population, 2010 to 2020',
    legendTitle: 'White Non-Hispanic (percent change)',
    isPercent: true,
    stops: ['#c81d00', -15, '#f46c59',-10,'#ffc0b4',-5,'#ffffff',5,'#b5d5e5',10,'#5fa4cb',15,'#0473ad',25,'#0b5476',50,'#012661']
  },
  {
    group: 'Census',
    id: 'bnh_pc',
    label: 'Black Non-Hispanic (percent change)',
    tooltip: 'Percent change in the Black Non-Hispanic population, 2010 to 2020',
    legendTitle: 'Black Non-Hispanic (percent change)',
    isPercent: true,
    stops: ['#c81d00', -15, '#f46c59',-10,'#ffc0b4',-5,'#ffffff',5,'#b5d5e5',10,'#5fa4cb',15,'#0473ad',25,'#0b5476']
  },
  {
    group: 'Census',
    id: 'anh_pc',
    label: 'Asian Non-Hispanic (percent change)',
    tooltip: 'Percent change in the Asian Non-Hispanic population, 2010 to 2020',
    legendTitle: 'Asian Non-Hispanic (percent change)',
    isPercent: true,
    stops: ['#c81d00', -15, '#f46c59',-10,'#ffc0b4',-5,'#ffffff',5,'#b5d5e5',10,'#5fa4cb',15,'#0473ad',25,'#0b5476',50,'#012661']
  },
  {
    group: 'Census',
    id: 'hsp1_pc',
    label: 'Hispanic (percent change)',
    tooltip: 'Percent change in the Hispanic population, 2010 to 2020',
    legendTitle: 'Hispanic (percent change)',
    isPercent: true,
    stops: ['#c81d00', -15, '#f46c59',-10,'#ffc0b4',-5,'#ffffff',5,'#b5d5e5',10,'#5fa4cb',15,'#0473ad',25,'#0b5476',50,'#012661']
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
    colors: stops.filter(stop => typeof stop === 'string'),
    stops,
    paintFill: {
      'fill-color': [
        'step',
        ['get', id],
        ...stops,
      ],
    },
    paintLine: {
      'line-color': '#994d4d',
    },
  };
});

export default builtConfigs;
