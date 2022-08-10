// ACS Profile Topics
import acsDemographicTableConfig from '../table-config/acs/demographic';
import acsEconomicTableConfig from '../table-config/acs/economic';
import acsSocialTableConfig from '../table-config/acs/social';
import acsHousingTableConfig from '../table-config/acs/housing';

import acsDemographicChartConfig from '../chart-config/acs/demographic';
import acsEconomicChartConfig from '../chart-config/acs/economic';
import acsSocialChartConfig from '../chart-config/acs/social';
import acsHousingChartConfig from '../chart-config/acs/housing';

export default [
  {
    id: 'demographic',
    label: 'Demographic',
    selected: 'unselected',
    type: 'topic',
    children: [
      {
        id: 'demo-sexAndAge',
        label: 'Sex and Age',
        selected: 'unselected',
        type: 'subtopic',
        tableConfig: acsDemographicTableConfig.sexAndAge,
        charts: null,
        children: [],
      },
      {
        id: 'demo-mutuallyExclusiveRaceHispanicOrigin',
        label: 'Mutually Exclusive Race / Hispanic Origin',
        selected: 'unselected',
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
        id: 'demo-hispanicSubgroup',
        label: 'Hispanic Subgroup',
        selected: 'unselected',
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
        id: 'demo-asianSubgroup',
        label: 'Asian Subgroup',
        selected: 'unselected',
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
    id: 'social',
    label: 'Social',
    selected: 'unselected',
    type: 'topic',
    children: [
      {
        id: 'soc-householdType',
        label: 'Household Type',
        selected: 'unselected',
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
        id: 'soc-relationshipToHeadOfHouseholdHouseholder',
        label: 'Relationship To Head Of Household (Householder)',
        selected: 'unselected',
        type: 'subtopic',
        tableConfig: acsSocialTableConfig.relationshipToHeadOfHouseholdHouseholder,
        charts: null,
        children: [],
      },
      {
        id: 'soc-maritalStatus',
        label: 'Marital Status',
        selected: 'unselected',
        type: 'subtopic',
        tableConfig: acsSocialTableConfig.maritalStatus,
        charts: null,
        children: [],
      },
      {
        id: 'soc-grandparents',
        label: 'Grandparents',
        selected: 'unselected',
        type: 'subtopic',
        tableConfig: acsSocialTableConfig.grandparents,
        charts: null,
        children: [],
      },
      {
        id: 'soc-schoolEnrollment',
        label: 'School Enrollment',
        selected: 'unselected',
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
        id: 'soc-educationalAttainmentHighestGradeCompleted',
        label: 'Educational Attainment (Highest Grade Completed)',
        selected: 'unselected',
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
        id: 'soc-veteranStatus',
        label: 'Veteran Status',
        selected: 'unselected',
        type: 'subtopic',
        tableConfig: acsSocialTableConfig.veteranStatus,
        charts: null,
        children: [],
      },
      {
        id: 'soc-disabilityStatusOfTheCivilianNoninstitutionalizedPopulation',
        label: 'Disability Status Of The Civilian Noninstitutionalized Population',
        selected: 'unselected',
        type: 'subtopic',
        tableConfig: acsSocialTableConfig.disabilityStatusOfTheCivilianNoninstitutionalizedPopulation,
        charts: null,
        children: [],
      },
      {
        id: 'soc-residence1YearAgo',
        label: 'Residence 1 Year Ago',
        selected: 'unselected',
        type: 'subtopic',
        tableConfig: acsSocialTableConfig.residence1YearAgo,
        charts: [
          {
            chartConfig: acsSocialChartConfig.residence1YearAgo,
            chartLabel: 'Percent Distribution of Population who Lived in a Different House 1 Year Ago',
          },
        ],
        children: [],
      },
      {
        id: 'soc-placeOfBirth',
        label: 'Place Of Birth',
        selected: 'unselected',
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
        id: 'soc-uSCitizenshipStatus',
        label: 'U.S. Citizenship Status',
        selected: 'unselected',
        type: 'subtopic',
        tableConfig: acsSocialTableConfig.uSCitizenshipStatus,
        charts: null,
        children: [],
      },
      {
        id: 'soc-yearOfEntry',
        label: 'Year Of Entry',
        selected: 'unselected',
        type: 'subtopic',
        tableConfig: acsSocialTableConfig.yearOfEntry,
        charts: null,
        children: [],
      },
      {
        id: 'soc-languageSpokenAtHome',
        label: 'Language Spoken At Home',
        selected: 'unselected',
        type: 'subtopic',
        tableConfig: acsSocialTableConfig.languageSpokenAtHome,
        charts: null,
        children: [],
      },
      {
        id: 'soc-ancestry',
        label: 'Ancestry',
        selected: 'unselected',
        type: 'subtopic',
        tableConfig: acsSocialTableConfig.ancestry,
        charts: null,
        children: [],
      },
      {
        id: 'soc-computersAndInternetUse',
        label: 'Computers and Internet Use',
        selected: 'unselected',
        type: 'subtopic',
        tableConfig: acsSocialTableConfig.computersAndInternetUse,
        charts: null,
        children: [],
      },
    ],
  },
  {
    id: 'economic',
    label: 'Economic',
    selected: 'unselected',
    type: 'topic',
    children: [
      {
        id: 'econ-employmentStatus',
        label: 'Employment Status',
        selected: 'unselected',
        type: 'subtopic',
        tableConfig: acsEconomicTableConfig.employmentStatus,
        charts: null,
        children: [],
      },
      {
        id: 'econ-commuteToWork',
        label: 'Commute to Work',
        selected: 'unselected',
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
        id: 'econ-occupation',
        label: 'Occupation',
        selected: 'unselected',
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
        id: 'econ-industry',
        label: 'Industry',
        selected: 'unselected',
        type: 'subtopic',
        tableConfig: acsEconomicTableConfig.industry,
        charts: null,
        children: [],
      },
      {
        id: 'econ-classOfWorker',
        label: 'Class of Worker',
        selected: 'unselected',
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
        id: 'econ-incomeAndBenefits',
        label: 'Income and Benefits',
        tooltip: 'In 2020 inflation-adjusted dollars',
        selected: 'unselected',
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
        id: 'econ-earnings',
        label: 'Earnings',
        selected: 'unselected',
        type: 'subtopic',
        tooltip: 'In 2020 inflation-adjusted dollars',
        tableConfig: acsEconomicTableConfig.earnings,
        charts: null,
        children: [],
      },
      {
        id: 'econ-healthInsuranceCoverage',
        label: 'Health Insurance Coverage',
        selected: 'unselected',
        type: 'subtopic',
        tableConfig: acsEconomicTableConfig.healthInsuranceCoverage,
        charts: null,
        children: [],
      },
      {
        id: 'econ-incomeInPast12MonthsIsBelowThePovertyLevel',
        label: 'Income in the Past 12 Months Below Poverty Level',
        selected: 'unselected',
        tooltip: "For alternative NYC poverty measure, please see website of the Mayor's Office for Economic Opportunity",
        type: 'subtopic',
        tableConfig: acsEconomicTableConfig.incomeInPast12MonthsIsBelowThePovertyLevel,
        charts: null,
        children: [],
      },
      {
        id: 'econ-ratioOfIncomeToPovertyLevel',
        label: 'Ratio of Income to Poverty Level',
        selected: 'unselected',
        tooltip: "Ratio of income in the past 12 months to poverty level",
        type: 'subtopic',
        tableConfig: acsEconomicTableConfig.ratioOfIncomeToPovertyLevel,
        charts: [
          {
            chartConfig: acsEconomicChartConfig.ratioOfIncomeToPovertyLevel,
            chartLabel: 'Percent Distribution of Population by Ratio of Income to Poverty Level'
          }
        ],
        children: [],
      },
    ],
  },
  {
    id: 'housing',
    label: 'Housing',
    selected: 'unselected',
    type: 'topic',
    children: [
      {
        id: 'hou-housingOccupancy',
        label: 'Housing Occupancy',
        selected: 'unselected',
        type: 'subtopic',
        tableConfig: acsHousingTableConfig.housingOccupancy,
        charts: null,
        children: [],
      },
      {
        id: 'hou-unitsInStructure',
        label: 'Units in Structure',
        selected: 'unselected',
        type: 'subtopic',
        tableConfig: acsHousingTableConfig.unitsInStructure,
        charts: null,
        children: [],
      },
      {
        id: 'hou-yearStructureBuilt',
        label: 'Year Structure Built',
        selected: 'unselected',
        type: 'subtopic',
        tableConfig: acsHousingTableConfig.yearStructureBuilt,
        charts: null,
        children: [],
      },
      {
        id: 'hou-rooms',
        label: 'Rooms',
        selected: 'unselected',
        type: 'subtopic',
        tableConfig: acsHousingTableConfig.rooms,
        charts: null,
        children: [],
      },
      {
        id: 'hou-housingTenure',
        label: 'Housing Tenure',
        selected: 'unselected',
        type: 'subtopic',
        tableConfig: acsHousingTableConfig.housingTenure,
        charts: [
          {
            chartConfig: acsHousingChartConfig.housingTenure,
            chartLabel: 'Percent Distribution of Housing Tenure',
          }
        ],
        children: [],
      },
      {
        id: 'hou-yearHouseholderMovedIntoUnit',
        label: 'Year Householder Moved Into Unit',
        selected: 'unselected',
        type: 'subtopic',
        tableConfig: acsHousingTableConfig.yearHouseholderMovedIntoUnit,
        charts: null,
        children: [],
      },
      {
        id: 'hou-vehiclesAvailable',
        label: 'Vehicles Available',
        selected: 'unselected',
        type: 'subtopic',
        tableConfig: acsHousingTableConfig.vehiclesAvailable,
        charts: [
          {
            chartConfig: acsHousingChartConfig.vehiclesAvailable,
            chartLabel: 'Percent Distribution of Households by Vehicles Available',
          },
        ],
        children: [],
      },
      {
        id: 'hou-occupantsPerRoom',
        label: 'Occupants per Room',
        selected: 'unselected',
        type: 'subtopic',
        tableConfig: acsHousingTableConfig.occupantsPerRoom,
        charts: null,
        children: [],
      },
      {
        id: 'hou-value',
        label: 'Value',
        tooltip: 'In 2020 inflation-adjusted dollars',
        selected: 'unselected',
        type: 'subtopic',
        tableConfig: acsHousingTableConfig.value,
        charts: [
          {
            chartConfig: acsHousingChartConfig.value,
            chartLabel: 'Percent Distribution of Owner-occupied Households by Housing Value',
          },
        ],
        children: [],
      },
      {
        id: 'hou-mortgageStatus',
        label: 'Mortgage Status',
        selected: 'unselected',
        type: 'subtopic',
        tableConfig: acsHousingTableConfig.mortgageStatus,
        charts: null,
        children: [],
      },
      {
        id: 'hou-selectedMonthlyOwnerCostsAsAPercentageOfHouseholdIncomeSmocapi',
        label: 'Selected Monthly Owner Costs as a Percentage of Household Income',
        selected: 'unselected',
        type: 'subtopic',
        tableConfig: acsHousingTableConfig.selectedMonthlyOwnerCostsAsAPercentageOfHouseholdIncomeSmocapi,
        charts: null,
        children: [],
      },
      {
        id: 'hou-grossRent',
        label: 'Gross Rent',
        tooltip: 'In 2020 inflation-adjusted dollars',
        selected: 'unselected',
        type: 'subtopic',
        tableConfig: acsHousingTableConfig.grossRent,
        charts: [
          {
            chartConfig: acsHousingChartConfig.grossRent,
            chartLabel: 'Percent Distribution of Renter-occupied Households by Gross Rent',
          },
        ],
        children: [],
      },
      {
        id: 'hou-grossRentAsAPercentageOfHouseholdIncomeGrapi',
        label: 'Gross Rent as a Percentage of Household Income (GRAPI)',
        selected: 'unselected',
        type: 'subtopic',
        tableConfig: acsHousingTableConfig.grossRentAsAPercentageOfHouseholdIncomeGrapi,
        charts: [
          {
            chartConfig: acsHousingChartConfig.grossRentGrapi,
            chartLabel: 'Percent Distribution of Renter-occupied Households by Gross Rent as a Percentage of Household Income',
          },
        ],
        children: [],
      },
    ],
  }
];
