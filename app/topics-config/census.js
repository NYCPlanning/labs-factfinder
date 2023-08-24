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
    charts: null,
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
    charts: null,
    children: [],
  },
  {
    id: 'householdSize',
    label: 'Household Size',
    selected: 'unselected',
    type: 'subtopic',
    tableConfig: censusTableConfig.householdSize,
    charts: null,
    children: [],
  }
];
