import Ember from 'ember';
import { computed } from 'ember-decorators/object';

function getPopLabel(variable) {
  if (variable === 'Pop0t5') return 'Under 5';
  if (variable === 'Pop85pl') return '85 & Over';
  const range = variable.split('Pop')[1].split('t');
  return `${range[0]}-${range[1]}`;
}

export default Ember.Controller.extend({
  @computed('model')
  agePopDist(model) {
    const d = {};
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
      group: getPopLabel(variable),
      male: d[`M${variable}`].sum,
      female: d[`F${variable}`].sum,
    }));

    return popPyramidData;
  },
});
