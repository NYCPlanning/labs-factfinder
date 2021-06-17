import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

// Decennial Topics
import decennialTopics from '../table-config/decennial';

// ACS Demographic Profile Topics
import acsDemographic from '../table-config/demographic';
import acsSocial from '../table-config/social';

export default class ExplorerController extends Controller {
  showChart = true;

  @tracked sources = [
    {
      id: 'decennial',
      label: 'Decennial',
      selected: true,
    },
    {
      id: 'acs',
      label: 'ACS',
      selected: false,
    }
  ];

  topic = null;

  disaggregate = false;

  compareTo = null;

  mode = 'current';

  @tracked decennialTopics = [
    {
      id: 'decennial - Population Density',
      label: 'Population Density',
      selected: false,
      type: 'subtopic',
      config: decennialTopics.populationDensity,
      children: [],
    },
    {
      id: 'decennial - Age and Sex',
      label: 'Age and Sex',
      selected: false,
      type: 'subtopic',
      config: decennialTopics.sexAndAge,
      children: [],
    },
    {
      id: 'decennial - Mutually Exclusive Race / Hispanic Origin',
      label: 'Mutually Exclusive Race / Hispanic Origin',
      selected: false,
      type: 'subtopic',
      config: decennialTopics.mutuallyExclusiveRaceHispanicOrigin,
      children: [],
    },
    {
      id: 'decennial - Hispanic Subgroup',
      label: 'Hispanic Subgroup',
      selected: false,
      type: 'subtopic',
      config: decennialTopics.hispanicSubgroup,
      children: [],
    },
    {
      id: 'decennial - Asian Subgroup',
      label: 'Asian Subgroup',
      selected: false,
      type: 'subtopic',
      config: decennialTopics.asianSubgroup,
      children: [],
    },
    {
      id: 'decennial - Relationship to Head of Household',
      label: 'Relationship to Head of Household',
      selected: false,
      type: 'subtopic',
      config: decennialTopics.relationshipToHeadOfHouseholdHouseholder,
      children: [],
    },
    {
      id: 'decennial - Household Type',
      label: 'Household Type',
      selected: false,
      type: 'subtopic',
      config: decennialTopics.householdType,
      children: [],
    },
    {
      id: 'decennial - Housing Occupancy',
      label: 'Housing Occupancy',
      selected: false,
      type: 'subtopic',
      config: decennialTopics.housingOccupancy,
      children: [],
    },
    {
      id: 'decennial - Housing Tenure',
      label: 'Housing Tenure',
      selected: false,
      type: 'subtopic',
      config: decennialTopics.housingTenure,
      children: [],
    },
    {
      id: 'decennial - Tenure by Age of Householder',
      label: 'Tenure by Age of Householder',
      selected: false,
      type: 'subtopic',
      config: decennialTopics.tenureByAgeOfHouseholder,
      children: [],
    },
    {
      id: 'decennial - Household Size',
      label: 'Household Size',
      selected: false,
      type: 'subtopic',
      config: decennialTopics.householdSize,
      children: [],
    },
  ];

  // To be converted to acsTopics
  @tracked acsTopics = [
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
          config: acsDemographic.sexAndAge,
          children: [],
        },
        {
          id: '125',
          label: 'Mutually Exclusive Race / Hispanic Origin',
          selected: true,
          type: 'subtopic',
          config: acsDemographic.mutuallyExclusiveRaceHispanicOrigin,
          children: [],
        },
        {
          id: '225',
          label: 'Hispanic Subgroup',
          selected: true,
          type: 'subtopic',
          config: acsDemographic.hispanicSubgroup,
          children: [],
        },
        {
          id: '224',
          label: 'Asian Subgroup',
          selected: true,
          type: 'subtopic',
          config: acsDemographic.asianSubgroup,
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
          config: acsSocial.ancestry,
          children: [],
        },
        {
          id: 'computersAndInternetUse',
          label: 'Computers and Internet Use',
          selected: false,
          type: 'subtopic',
          config: acsSocial.computersAndInternetUse,
          children: [],
        },
        {
          id: 'uSCitizenshipStatus',
          label: 'U.S. Citizenship Status',
          selected: false,
          type: 'subtopic',
          config: acsSocial.uSCitizenshipStatus,
          children: [],
        },
        {
          id: 'disabilityStatusOfTheCivilianNoninstitutionalizedPopulation',
          label: 'Disability Status Of The Civilian Noninstitutionalized Population',
          selected: false,
          type: 'subtopic',
          config: acsSocial.disabilityStatusOfTheCivilianNoninstitutionalizedPopulation,
          children: [],
        }
      ],
    },
  ];

  get source() {
    return this.sources.find(source => source.selected);
  }

  @action setSources(newSources) {
    this.sources = newSources;
  }

  get topics() {
    if (this.source.id === 'decennial') {
      return this.decennialTopics;
    }

    // this.source === 'acs'
    return this.acsTopics;
  }

  set topics(newTopics) {
    if (this.source.id === 'decennial') {
      this.decennialTopics = newTopics;
    }
    if (this.source.id === 'acs') {
      this.acsTopics = newTopics;
    }
  }

  @action setTopics(newTopics) {
    this.topics = newTopics;
  }
}
