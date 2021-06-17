import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

// Decennial Topics
//import decennialTopics from '../table-config/decennial';

// ACS Demographic Profile Topics
import acsDemographic from '../table-config/demographic';
import acsSocial from '../table-config/social';

export default class ExplorerController extends Controller {
  showChart = true;

  source = 'decennial';

  topic = null;

  disaggregate = false;

  compareTo = null;

  mode = 'current';

  // @tracked decennialTopics = []

  // To be converted to acsTopics
  @tracked topics = [
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

  @action setTopics(newTopics) {
    this.topics = newTopics;
  }
}
