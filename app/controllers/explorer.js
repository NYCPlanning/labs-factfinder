import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ExplorerController extends Controller {
  showChart = true;

  source = 'decennial';

  topic = null;

  disaggregate = false;

  compareTo = null;

  @tracked topics = [
    {
      id: '123',
      label: 'Demographic',
      selected: true,
      type: 'topic',
      children: [
        {
          id: '124',
          label: 'Demo 1',
          selected: true,
          type: 'subtopic',
          children: [],
        },
        {
          id: '125',
          label: 'Demo 2',
          selected: true,
          type: 'subtopic',
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
          id: '127',
          label: 'Social 1',
          selected: false,
          type: 'subtopic',
          children: [],
        },
        {
          id: '128',
          label: 'Social 2',
          selected: false,
          type: 'subtopic',
          children: [],
        }
      ],
    },
    {
      id: '129',
      label: 'Economic',
      selected: false,
      type: 'topic',
      children: [
        {
          id: '130',
          label: 'Econ 1',
          selected: false,
          type: 'subtopic',
          children: [],
        },
        {
          id: '131',
          label: 'Econ 2',
          selected: false,
          type: 'subtopic',
          children: [],
        }
      ],
    },
    {
      id: '132',
      label: 'Housing',
      selected: false,
      type: 'topic',
      children: [
        {
          id: '133',
          label: 'Housing Stat 1',
          selected: false,
          type: 'subtopic',
          children: [],
        },
        {
          id: '134',
          label: 'Housing Stat 2',
          selected: false,
          type: 'subtopic',
          children: [],
        }
      ],
    },
  ];

  @action setTopics(newTopics) {
    this.topics = newTopics;
  }
}
