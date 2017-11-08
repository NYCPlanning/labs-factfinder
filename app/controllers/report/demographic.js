import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line

const { inject } = Ember;

export default Ember.Controller.extend({
  report: inject.controller('report'),

  @computed('model')
  currentData(model) {
    console.log(model)
    return model.y2011_2015;
  },

  @computed('currentData')
  agePopDist(currentData) {
    const d = currentData.poppyramid_only;
    console.log(d)
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
        male: currentData.sex_and_age.male,
        female: currentData.sex_and_age.fem,
      },
      pyramidData,
    };
  },
});
