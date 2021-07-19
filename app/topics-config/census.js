// Decennial Topics
import censusTopics from '../table-config/census';
import censusChartConfig from '../chart-config/census';

export default [
  {
    id: 'populationDensity',
    label: 'Population Density',
    selected: 'unselected',
    type: 'subtopic',
    tableConfig: censusTopics.populationDensity,
    charts: null,
    children: [],
  },
  {
    id: 'sexAndAge',
    label: 'Age and Sex',
    selected: 'unselected',
    type: 'subtopic',
    tableConfig: censusTopics.sexAndAge,
    charts: null,
    children: [],
  },
  {
    id: 'mutuallyExclusiveRaceHispanicOrigin',
    label: 'Mutually Exclusive Race / Hispanic Origin',
    selected: 'unselected',
    type: 'subtopic',
    tableConfig: censusTopics.mutuallyExclusiveRaceHispanicOrigin,
    charts: [
      {
        chartConfig: censusChartConfig.raceGroup,
        chartLabel: 'Percent Distribution of Race/Hispanic Origin Groups',
      },
    ],
    children: [],
  },
  {
    id: 'hispanicSubgroup',
    label: 'Hispanic Subgroup',
    selected: 'unselected',
    type: 'subtopic',
    tableConfig: censusTopics.hispanicSubgroup,
    charts: null,
    children: [],
  },
  {
    id: 'asianSubgroup',
    label: 'Asian Subgroup',
    selected: 'unselected',
    type: 'subtopic',
    tableConfig: censusTopics.asianSubgroup,
    charts: null,
    children: [],
  },
  {
    id: 'relationshipToHeadOfHouseholdHouseholder',
    label: 'Relationship to Head of Household',
    selected: 'unselected',
    type: 'subtopic',
    tableConfig: censusTopics.relationshipToHeadOfHouseholdHouseholder,
    charts: null,
    children: [],
  },
  {
    id: 'householdType',
    label: 'Household Type',
    selected: 'unselected',
    type: 'subtopic',
    tableConfig: censusTopics.householdType,
    charts: null,
    children: [],
  },
  {
    id: 'housingOccupancy',
    label: 'Housing Occupancy',
    selected: 'unselected',
    type: 'subtopic',
    tableConfig: censusTopics.housingOccupancy,
    charts: null,
    children: [],
  },
  {
    id: 'housingTenure',
    label: 'Housing Tenure',
    selected: 'unselected',
    type: 'subtopic',
    tableConfig: censusTopics.housingTenure,
    charts: null,
    children: [],
  },
  {
    id: 'tenureByAgeOfHouseholder',
    label: 'Tenure by Age of Householder',
    selected: 'unselected',
    type: 'subtopic',
    tableConfig: censusTopics.tenureByAgeOfHouseholder,
    charts: null,
    children: [],
  },
  {
    id: 'householdSize',
    label: 'Household Size',
    selected: 'unselected',
    type: 'subtopic',
    tableConfig: censusTopics.householdSize,
    charts: null,
    children: [],
  },
];
