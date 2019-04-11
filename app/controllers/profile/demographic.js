import Controller, { inject as controller } from '@ember/controller';
import { get, computed } from '@ember/object';

import demographic from '../../table-config/demographic';

import raceGroupChartConfig from '../../chart-config/demographic/race-group';
import hispanicSubgroupChartConfig from '../../chart-config/demographic/hispanic-subgroup';
import asianSubgroupChartConfig from '../../chart-config/demographic/asian-subgroup';

const {
  sexAndAge,
  mutuallyExclusiveRaceHispanicOrigin,
  hispanicSubgroup,
  asianSubgroup,
} = demographic;

export default Controller.extend({
  // arguments
  model: {},

  // properties
  profile: controller('profile'),

  // - row configs
  sexAndAge,
  mutuallyExclusiveRaceHispanicOrigin,
  hispanicSubgroup,
  asianSubgroup,

  // - chart configs
  raceGroupChartConfig,
  hispanicSubgroupChartConfig,
  asianSubgroupChartConfig,

  // computed properties
  agePopDist: computed('model', function() {
    const model = this.get('model');
    const d = model;
    const variables = [
      'pop0t5',
      'pop5t9',
      'pop10t14',
      'pop15t19',
      'pop20t24',
      'pop25t29',
      'pop30t34',
      'pop35t39',
      'pop40t44',
      'pop45t49',
      'pop50t54',
      'pop55t59',
      'pop60t64',
      'pop65t69',
      'pop70t74',
      'pop75t79',
      'pop80t84',
      'pop85pl',
    ];

    const pyramidData = variables.map((variable) => {
      const male = get(d, `m${variable}`);
      const female = get(d, `f${variable}`);
      return {
        group: variable,
        male,
        female,
      };
    });

    return {
      totals: {
        male: model.male,
        female: model.fem,
      },
      pyramidData,
    };
  }),
});
