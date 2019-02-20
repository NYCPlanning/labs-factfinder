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
  sexAndAge,
  mutuallyExclusiveRaceHispanicOrigin,
  hispanicSubgroup,
  asianSubgroup,

  raceGroupChartConfig,
  hispanicSubgroupChartConfig,
  asianSubgroupChartConfig,

  profile: controller('profile'),

  currentData: computed('model', function() {
    const model = this.get('model');
    return get(model, 'y2013_2017');
  }),

  agePopDist: computed('currentData', function() {
    const currentData = this.get('currentData');
    const d = currentData;
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
        male: currentData.male,
        female: currentData.fem,
      },
      pyramidData,
    };
  }),
});
