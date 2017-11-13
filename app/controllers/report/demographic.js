import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line

const { inject } = Ember;

export default Ember.Controller.extend({
  report: inject.controller('report'),

  @computed('model')
  currentData(model) {
    return model.y2011_2015;
  },

  @computed('currentData')
  agePopDist(currentData) {
    const d = currentData.poppyramid_only;
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

  actions: {
    handleCopy() {
      const el = document.getElementsByTagName('table')[0];
      const body = document.body;
      let range;
      let sel;
      if (document.createRange && window.getSelection) {
        range = document.createRange();
        sel = window.getSelection();
        sel.removeAllRanges();
        try {
          range.selectNodeContents(el);
          sel.addRange(range);
        } catch (e) {
          range.selectNode(el);
          sel.addRange(range);
        }
      } else if (body.createTextRange) {
        range = body.createTextRange();
        range.moveToElementText(el);
        range.select();
      }

      document.execCommand('copy');
    },
  },
});
