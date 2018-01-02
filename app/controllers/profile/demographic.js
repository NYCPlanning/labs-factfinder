import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line

import sexAge from '../../table-config/demographic/sex-age';
import raceGroup from '../../table-config/demographic/race-group';
import hispanicSubgroup from '../../table-config/demographic/hispanic-subgroup';
import asianSubgroup from '../../table-config/demographic/asian-subgroup';

import raceGroupChartConfig from '../../chart-config/demographic/race-group';
import hispanicSubgroupChartConfig from '../../chart-config/demographic/hispanic-subgroup';
import asianSubgroupChartConfig from '../../chart-config/demographic/asian-subgroup';

const { inject: { controller } } = Ember;

export default Ember.Controller.extend({
  sexAge,
  raceGroup,
  hispanicSubgroup,
  asianSubgroup,

  raceGroupChartConfig,
  hispanicSubgroupChartConfig,
  asianSubgroupChartConfig,

  profile: controller('profile'),

  @computed('model')
  currentData(model) {
    return model.y2012_2016;
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
      const male = d[`m${variable}`];
      const female = d[`f${variable}`];
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
