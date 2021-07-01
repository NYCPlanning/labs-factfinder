// ACS Profile Topics
import acsDemographicTableConfig from '../table-config/demographic';
import acsEconomicTableConfig from '../table-config/economic';
import acsSocialTableConfig from '../table-config/social';

import acsDemographicChartConfig from '../chart-config/demographic';
import acsEconomicChartConfig from '../chart-config/economic';
import acsSocialChartConfig from '../chart-config/social';

export default [
  {
    id: 'acs-demographic-sexAndAge',
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
        charts: null,
        children: [],
      },
      {
        id: 'acs-demographic-mutuallyExclusiveRaceHispanicOrigin',
        label: 'Mutually Exclusive Race / Hispanic Origin',
        selected: true,
        type: 'subtopic',
        tableConfig: acsDemographicTableConfig.mutuallyExclusiveRaceHispanicOrigin,
        charts: [
          {
            chartConfig: acsDemographicChartConfig.raceGroup,
            chartLabel: 'Percent Distribution of Race/Hispanic Origin Groups',
          },
        ],
        children: [],
      },
      {
        id: 'acs-demographic-hispanicSubgroup',
        label: 'Hispanic Subgroup',
        selected: true,
        type: 'subtopic',
        tableConfig: acsDemographicTableConfig.hispanicSubgroup,
        charts: [
          {
            chartConfig: acsDemographicChartConfig.hispanicSubgroup,
            chartLabel: 'Percent Distribution of Hispanic Subgroups',
          },
        ],
        children: [],
      },
      {
        id: 'acs-demographic-asianSubgroup',
        label: 'Asian Subgroup',
        selected: true,
        type: 'subtopic',
        tableConfig: acsDemographicTableConfig.asianSubgroup,
        charts: [
          {
            chartConfig: acsDemographicChartConfig.asianSubgroup,
            chartLabel: 'Percent Distribution of Asian Subgroups',
          },
        ],
        children: [],
      }
    ],
  },
  {
    id: 'acs-economic',
    label: 'Economic',
    selected: false,
    type: 'topic',
    children: [
      {
        id: 'acs-economic-employmentStatus',
        label: 'Employment Status',
        selected: false,
        type: 'subtopic',
        tableConfig: acsEconomicTableConfig.employmentStatus,
        charts: null,
        children: [],
      },
      {
        id: 'acs-economic-commuteToWork',
        label: 'Commute to Work',
        selected: false,
        type: 'subtopic',
        tableConfig: acsEconomicTableConfig.commuteToWork,
        charts: [
          {
            chartConfig: acsEconomicChartConfig.commuteToWork,
            chartLabel: 'Percent Distribution of Workers by Means of Transportation to Work',
          }
        ],
        children: [],
      },
      {
        id: 'acs-economic-occupation',
        label: 'Occupation',
        selected: false,
        type: 'subtopic',
        tableConfig: acsEconomicTableConfig.occupation,
        charts: [
          {
            chartConfig: acsEconomicChartConfig.occupation,
            chartLabel: 'Percent Distribution of Workers by Occupation',
          }
        ],
        children: [],
      },
      {
        id: 'acs-economic-industry',
        label: 'Industry',
        selected: false,
        type: 'subtopic',
        tableConfig: acsEconomicTableConfig.industry,
        charts: null,
        children: [],
      },
      {
        id: 'acs-economic-classOfWorker',
        label: 'Class of Worker',
        selected: false,
        type: 'subtopic',
        tableConfig: acsEconomicTableConfig.classOfWorker,
        charts: [
          {
            chartConfig: acsEconomicChartConfig.classOfWorker,
            chartLabel: 'Percent Distribution of Workers by Class of Worker',
          }
        ],
        children: [],
      },
      {
        id: 'acs-economic-incomeAndBenefits',
        label: 'Income and Benefits',
        selected: false,
        type: 'subtopic',
        tableConfig: acsEconomicTableConfig.incomeAndBenefits,
        charts: [
          {
            chartConfig: acsEconomicChartConfig.incomeAndBenefits,
            chartLabel: 'Percent Distribution of Household Income',
          }
        ],
        children: [],
      },
      {
        id: 'acs-economic-earnings',
        label: 'Earnings',
        selected: false,
        type: 'subtopic',
        tableConfig: acsEconomicTableConfig.earnings,
        charts: null,
        children: [],
      },
      {
        id: 'acs-economic-healthInsuranceCoverage',
        label: 'Health Insurance Coverage',
        selected: false,
        type: 'subtopic',
        tableConfig: acsEconomicTableConfig.healthInsuranceCoverage,
        charts: null,
        children: [],
      },
      {
        id: 'acs-economic-incomeInPast12MonthsIsBelowThePovertyLevel',
        label: 'Income in the Past 12 Months Below Poverty Level',
        selected: false,
        type: 'subtopic',
        tableConfig: acsEconomicTableConfig.incomeInPast12MonthsIsBelowThePovertyLevel,
        charts: null,
        children: [],
      },
      {
        id: 'acs-economic-ratioOfIncomeToPovertyLevel',
        label: 'Ratio of Income to Poverty Level',
        selected: false,
        type: 'subtopic',
        tableConfig: acsEconomicTableConfig.ratioOfIncomeToPovertyLevel,
        charts: [
          {
            chartConfig: acsEconomicChartConfig.ratioOfIncomeToPovertyLevel,
            chartLabel: 'Percent Distribution of Population by Ratio of Income to Poverty Level',
          }
        ],
        children: [],
      },
    ],
  },
  {
    id: 'acs-social',
    label: 'Social',
    selected: false,
    type: 'topic',
    children: [
      {
        id: 'acs-social-householdType',
        label: 'Household Type',
        selected: false,
        type: 'subtopic',
        tableConfig: acsSocialTableConfig.householdType,
        charts: [
          {
            chartConfig: acsSocialChartConfig.householdType,
            chartLabel: 'Percent Distribution of Household Types',
          },
        ],
        children: [],
      },
      {
        id: 'acs-social-relationshipToHeadOfHouseholdHouseholder',
        label: 'Relationship To Head Of Household (Householder)',
        selected: false,
        type: 'subtopic',
        tableConfig: acsSocialTableConfig.relationshipToHeadOfHouseholdHouseholder,
        charts: null,
        children: [],
      },
      {
        id: 'acs-social-maritalStatus',
        label: 'Marital Status',
        selected: false,
        type: 'subtopic',
        tableConfig: acsSocialTableConfig.maritalStatus,
        charts: null,
        children: [],
      },
      {
        id: 'acs-social-grandparents',
        label: 'Grandparents',
        selected: false,
        type: 'subtopic',
        tableConfig: acsSocialTableConfig.grandparents,
        charts: null,
        children: [],
      },
      {
        id: 'acs-social-schoolEnrollment',
        label: 'School Enrollment',
        selected: false,
        type: 'subtopic',
        tableConfig: acsSocialTableConfig.schoolEnrollment,
        charts: [
          {
            chartConfig: acsSocialChartConfig.schoolEnrollment,
            chartLabel: 'Percent Distribution of Population 3 and Over by School Enrollment',
          },
        ],
        children: [],
      },
      {
        id: 'acs-social-educationalAttainmentHighestGradeCompleted',
        label: 'Educational Attainment (Highest Grade Completed)',
        selected: false,
        type: 'subtopic',
        tableConfig: acsSocialTableConfig.educationalAttainmentHighestGradeCompleted,
        charts: [
          {
            chartConfig: acsSocialChartConfig.educationalAttainment,
            chartLabel: 'Percent Distribution of Population 25 and Over by Educational Attainment',
          },
        ],
        children: [],
      },
      {
        id: 'acs-social-veteranStatus',
        label: 'Veteran Status',
        selected: false,
        type: 'subtopic',
        tableConfig: acsSocialTableConfig.veteranStatus,
        charts: null,
        children: [],
      },
      {
        id: 'acs-social-disabilityStatusOfTheCivilianNoninstitutionalizedPopulation',
        label: 'Disability Status Of The Civilian Noninstitutionalized Population',
        selected: false,
        type: 'subtopic',
        tableConfig: acsSocialTableConfig.disabilityStatusOfTheCivilianNoninstitutionalizedPopulation,
        charts: null,
        children: [],
      },
      {
        id: 'acs-social-residence1YearAgo',
        label: 'Residence 1 Year Ago',
        selected: false,
        type: 'subtopic',
        tableConfig: acsSocialTableConfig.residence1YearAgo,
        charts: [
          {
            chartConfig: acsSocialChartConfig.residence1YearAgo,
            chartLabel: 'Percent Distribution of Population who Lived in a Different House 1 Year Ago"',
          },
        ],
        children: [],
      },
      {
        id: 'acs-social-placeOfBirth',
        label: 'Place Of Birth',
        selected: false,
        type: 'subtopic',
        tableConfig: acsSocialTableConfig.placeOfBirth,
        charts: [
          {
            chartConfig: acsSocialChartConfig.placeOfBirth,
            chartLabel: 'Percent Distribution of Total Population by Place of Birth',
          },
          {
            chartConfig: acsSocialChartConfig.foreignBorn,
            chartLabel: 'Percent Distribution of Foreign-Born by World Region of Birth',
          },
        ],
        children: [],
      },
      {
        id: 'acs-social-uSCitizenshipStatus',
        label: 'U.S. Citizenship Status',
        selected: false,
        type: 'subtopic',
        tableConfig: acsSocialTableConfig.uSCitizenshipStatus,
        charts: null,
        children: [],
      },
      {
        id: 'acs-social-yearOfEntry',
        label: 'Year Of Entry',
        selected: false,
        type: 'subtopic',
        tableConfig: acsSocialTableConfig.yearOfEntry,
        charts: null,
        children: [],
      },
      {
        id: 'acs-social-languageSpokenAtHome',
        label: 'Language Spoken At Home',
        selected: false,
        type: 'subtopic',
        tableConfig: acsSocialTableConfig.languageSpokenAtHome,
        charts: null,
        children: [],
      },
      {
        id: 'acs-social-ancestry',
        label: 'Ancestry',
        selected: false,
        type: 'subtopic',
        tableConfig: acsSocialTableConfig.ancestry,
        charts: null,
        children: [],
      },
      {
        id: 'acs-social-computersAndInternetUse',
        label: 'Computers and Internet Use',
        selected: false,
        type: 'subtopic',
        tableConfig: acsSocialTableConfig.computersAndInternetUse,
        charts: null,
        children: [],
      },
    ],
  },
];
