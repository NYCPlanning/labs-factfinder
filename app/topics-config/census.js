// Decennial Topics
import censusTableConfig from '../table-config/census';
import censusChartConfig from '../chart-config/census';

export default [
  {
    id: 'populationDensity',
    label: 'Population Density',
    selected: 'unselected',
    type: 'subtopic',
    tableConfig: censusTableConfig.populationDensity,
    charts: null,
    children: [],
  },
  {
    id: 'sexAndAge',
    label: 'Age and Sex',
    selected: 'unselected',
    type: 'subtopic',
    tableConfig: censusTableConfig.sexAndAge,
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
    id: 'housingOccupancy',
    label: 'Housing Occupancy',
    selected: 'unselected',
    type: 'subtopic',
    tableConfig: censusTableConfig.housingOccupancy,
    charts: null,
    children: [],
  }
];
