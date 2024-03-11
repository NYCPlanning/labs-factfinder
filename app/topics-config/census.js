// Decennial Topics
import censusTableConfig from '../table-config/census';
import censusChartConfig from '../chart-config/census';

export default [
  {
    id: 'populationSexAgeDensity',
    label: 'Population, Sex, Age, and Density',
    selected: 'unselected',
    type: 'subtopic',
    tableConfig: censusTableConfig.populationSexAgeDensity,
    charts: null,
    children: [],
  },
  {
    id: 'mutuallyExclusiveRaceHispanicOrigin',
    label: 'Mutually Exclusive Race / Hispanic Origin',
    selected: 'unselected',
    type: 'subtopic',
    tableConfig: censusTableConfig.mutuallyExclusiveRaceHispanicOrigin,
    charts: [
      {
        chartConfig: censusChartConfig.raceGroup,
        chartLabel: 'Percent Distribution of Race/Hispanic Origin Groups',
      },
    ],
    children: [],
  },
  {
    id: 'detailedRaceAndEthnicity',
    label: 'Detailed Race and Ethnicity',
    labelText:
      'Detailed race and ethnicity data represent the group alone or in any combination. The Census Bureau only publishes detailed race and ethnicity data for NYC at a tract, county, and city level. All other geographies are calculated by the Department of City Planning. Because of suppression, aggregate counts incorporate nonsampling error.',
    selected: 'unselected',
    type: 'subtopic',
    tableConfig: censusTableConfig.detailedRaceAndEthnicity,
    charts: null,
    children: [],
  },
  {
    id: 'relationHeadHousehold',
    label: 'Relationship to Head of Household (Householder)',
    selected: 'unselected',
    type: 'subtopic',
    tableConfig: censusTableConfig.relationshipToHeadOfHouseholdHouseholder,
    charts: null,
    children: [],
  },
  {
    id: 'householdType',
    label: 'Household Type',
    selected: 'unselected',
    type: 'subtopic',
    tableConfig: censusTableConfig.householdType,
    charts: [
      {
        chartConfig: censusChartConfig.householdType,
        chartLabel: 'Percent Distribution of Household Types',
      },
    ],
    children: [],
  },
  {
    id: 'housingOccupancy',
    label: 'Housing Occupancy',
    selected: 'unselected',
    type: 'subtopic',
    tableConfig: censusTableConfig.housingOccupancy,
    charts: null,
    children: [],
  },
  {
    id: 'housingTenure',
    label: 'Housing Tenure',
    selected: 'unselected',
    type: 'subtopic',
    tableConfig: censusTableConfig.housingTenure,
    charts: [
      {
        chartConfig: censusChartConfig.housingTenure,
        chartLabel: 'Percent Distribution of Housing Tenure',
      },
    ],
    children: [],
  },
  {
    id: 'householdSize',
    label: 'Household Size',
    selected: 'unselected',
    type: 'subtopic',
    tableConfig: censusTableConfig.householdSize,
    charts: [
      {
        chartConfig: censusChartConfig.householdSize,
        chartLabel: 'Percent Distribution of Household Size',
      },
    ],
    children: [],
  },
];
