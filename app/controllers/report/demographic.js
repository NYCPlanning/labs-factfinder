import Ember from 'ember';
import { computed } from 'ember-decorators/object';

export default Ember.Controller.extend({
  @computed('model')
  agePopDist(model) {

    const d = {}

    model[0].values[4].values.forEach((item) => {
      const { variable, sum, m } = item;
      d[variable] = { sum, m };
    });

    const variables = [
      'Pop0t5',
      'Pop5t9',
      'Pop10t14',
      'Pop15t19',
      'Pop20t24',
      'Pop25t29',
      'Pop30t34',
      'Pop35t39',
      'Pop40t44',
      'Pop45t49',
      'Pop50t54',
      'Pop55t59',
      'Pop60t64',
      'Pop65t69',
      'Pop70t74',
      'Pop75t79',
      'Pop80t84',
      'Pop85pl',
    ];

    const popPyramidData = variables.map(variable => ({
      group: variable,
      male: d[`M${variable}`].sum,
      female: d[`F${variable}`].sum,
    }));

    console.log('computing agePopDist', popPyramidData);

    return popPyramidData;
  },
});
