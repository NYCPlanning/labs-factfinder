import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line

export default Ember.Controller.extend({
  @computed('model')
  agePopDist(model) {
    const d = model.poppyramid_only;
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

    const popPyramidData = variables.map(variable => ({
      group: variable,
      male: d[`m${variable}`].sum,
      malemoe: d[`m${variable}`].m,
      female: d[`f${variable}`].sum,
      femalemoe: d[`f${variable}`].m,
    }));

    return popPyramidData;
  },
});
