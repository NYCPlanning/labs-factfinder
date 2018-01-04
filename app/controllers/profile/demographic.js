import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line

import demographic from '../../table-config/demographic';

import raceGroupChartConfig from '../../chart-config/demographic/race-group';
import hispanicSubgroupChartConfig from '../../chart-config/demographic/hispanic-subgroup';
import asianSubgroupChartConfig from '../../chart-config/demographic/asian-subgroup';

const {
  sexAndAge,
  raceGroup,
  hispanicSubgroup,
  asianSubgroup,
} = demographic;

const { inject: { controller }, get } = Ember;

export default Ember.Controller.extend({
  sexAndAge,
  raceGroup,
  hispanicSubgroup,
  asianSubgroup,

  raceGroupChartConfig,
  hispanicSubgroupChartConfig,
  asianSubgroupChartConfig,

  profile: controller('profile'),

  @computed('model')
  currentData(model) {
    return get(model, 'y2012_2016');
  },

  @computed('currentData')
  agePopDist(currentData) {
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
  },
});
