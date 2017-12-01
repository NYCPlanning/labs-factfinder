import mungeBarChartData from 'labs-nyc-factfinder/utils/munge-bar-chart-data';
import { module, test } from 'qunit';

module('Unit | Utility | munge bar chart data');

const config = [
  {
    property: 'asnseast',
    label: 'Southeast Asian',
  },
  {
    property: 'asnsouth',
    label: 'South Asian',
  },
  {
    property: 'asnchinot',
    label: 'Chinese, except Taiwanese',
  },
];


const data = {
    asnseast: {
      percent: .5,
      sum: 100,
      m: 10,
      percent_m: .1,
      comparison_percent: .2,
      comparison_percent_m: .1,
    },
    asnsouth: {
      percent: .5,
      sum: 100,
      m: 10,
      percent_m: .1,
      comparison_percent: .2,
      comparison_percent_m: .1,
    },
    asnchinot: {
      percent: .5,
      sum: 100,
      m: 10,
      percent_m: .1,
      comparison_percent: .2,
      comparison_percent_m: .1,
    }

  }

// Replace this with your real tests.
test('it works', function(assert) {
  let result = mungeBarChartData(config, data);
  assert.ok(result);
});
