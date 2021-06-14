import Controller from '@ember/controller';

export default class ExplorerController extends Controller {
  showChart = true;

  source = 'decennial';

  topic = null;

  disaggregate = false;

  compareTo = null;

  topics = [
    {
      label: 'Demographic',
      selected: true,
      type: 'topic',
      children: [
        {
          label: 'Demo 1',
          selected: true,
          type: 'subtopic',
        },
        {
          label: 'Demo 2',
          selected: true,
          type: 'subtopic',
        }
      ],
    },
    {
      label: 'Social',
      selected: false,
      type: 'topic',
      children: [
        {
          label: 'Social 1',
          selected: false,
          type: 'subtopic',
        },
        {
          label: 'Social 2',
          selected: false,
          type: 'subtopic',
        }
      ],
    },
    {
      label: 'Economic',
      selected: false,
      type: 'topic',
      children: [
        {
          label: 'Econ 1',
          selected: false,
          type: 'subtopic',
        },
        {
          label: 'Econ 2',
          selected: false,
          type: 'subtopic',
        }
      ],
    },
    {
      label: 'Housing',
      selected: false,
      type: 'topic',
      children: [
        {
          label: 'Housing Stat 1',
          selected: false,
          type: 'subtopic',
        },
        {
          label: 'Housing Stat 2',
          selected: false,
          type: 'subtopic',
        }
      ],
    },
  ]
}
