// ACS Profile Topics
import acsDemographicTableConfig from '../table-config/demographic';
import acsSocial from '../table-config/social';

import acsDemographicChartConfig from '../chart-config/demographic';

export default [
  {
    id: '123',
    label: 'Demographic',
    selected: true,
    type: 'topic',
    children: [
      {
        id: '124',
        label: 'Sex and Age',
        selected: true,
        type: 'subtopic',
        tableConfig: acsDemographicTableConfig.sexAndAge,
        chartConfig: null,
        children: [],
      },
      {
        id: '125',
        label: 'Mutually Exclusive Race / Hispanic Origin',
        selected: true,
        type: 'subtopic',
        tableConfig: acsDemographicTableConfig.mutuallyExclusiveRaceHispanicOrigin,
        chartConfig: acsDemographicChartConfig.raceGroupChartConfig,
        chartLabel: 'Percent Distribution of Race/Hispanic Origin Groups',
        children: [],
      },
      {
        id: '225',
        label: 'Hispanic Subgroup',
        selected: true,
        type: 'subtopic',
        tableConfig: acsDemographicTableConfig.hispanicSubgroup,
        chartConfig: acsDemographicChartConfig.hispanicSubgroupChartConfig,
        chartLabel: 'Percent Distribution of Hispanic Subgroups',
        children: [],
      },
      {
        id: '224',
        label: 'Asian Subgroup',
        selected: true,
        type: 'subtopic',
        tableConfig: acsDemographicTableConfig.asianSubgroup,
        chartConfig: acsDemographicChartConfig.asianSubgroupChartConfig,
        chartLabel: 'Percent Distribution of Asian Subgroups',
        children: [],
      }
    ],
  },
  {
    id: '126',
    label: 'Social',
    selected: false,
    type: 'topic',
    children: [
      {
        id: 'ancestry',
        label: 'Ancestry',
        selected: false,
        type: 'subtopic',
        tableConfig: acsSocial.ancestry,
        chartConfig: null,
        children: [],
      },
      {
        id: 'computersAndInternetUse',
        label: 'Computers and Internet Use',
        selected: false,
        type: 'subtopic',
        tableConfig: acsSocial.computersAndInternetUse,
        chartConfig: null,
        children: [],
      },
      {
        id: 'uSCitizenshipStatus',
        label: 'U.S. Citizenship Status',
        selected: false,
        type: 'subtopic',
        tableConfig: acsSocial.uSCitizenshipStatus,
        chartConfig: null,
        children: [],
      },
      {
        id: 'disabilityStatusOfTheCivilianNoninstitutionalizedPopulation',
        label: 'Disability Status Of The Civilian Noninstitutionalized Population',
        selected: false,
        type: 'subtopic',
        tableConfig: acsSocial.disabilityStatusOfTheCivilianNoninstitutionalizedPopulation,
        chartConfig: null,
        children: [],
      },
    ],
  },
];
