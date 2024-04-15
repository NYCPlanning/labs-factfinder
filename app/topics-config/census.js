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
      "Detailed race & ethnicity data represent the count of people identifying with each group. This count includes people identifying solely with a particular group and people identifying with multiple groups. Tract-level noise & suppression can result in compounded NTA-level error. See 'About' page for more.",
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
