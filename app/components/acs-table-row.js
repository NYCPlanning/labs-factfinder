/* eslint-disable */
import Ember from 'ember';
import { computed } from 'ember-decorators/object';

export default Ember.Component.extend({
  tagName: 'tr',
  classNameBindings: ['getClassNames'],

  @computed('rowconfig')
  getClassNames(rowconfig) {
    const classes = [];

    if (rowconfig.highlight) {
      classes.push('row-highlight');
    }

    if (rowconfig.indent) {
      classes.push(`row-indent-x${rowconfig.indent}`);
    }

    return classes.join(',');
  },

  @computed('data.sum', 'data2.sum', 'data.m', 'data2.m')
  longitudinalPercentMOE(sum, sum2, m, m2) {
    const moe = Math.abs(sum / sum2)
      * Math.sqrt((Math.pow((m / 1.645), 2) / Math.pow(sum, 2))
      + (Math.pow((m2 / 1.645), 2) / Math.pow(sum2, 2))) * 1.645;

    return moe;
  },

  @computed('data.comparison_sum', 'data2.comparison_sum', 'data.comparison_m', 'data2.comparison_m')
  comparisonLongitudinalPercentMOE(sum, sum2, m, m2) {
    const moe = Math.abs(sum / sum2)
      * Math.sqrt((Math.pow((m / 1.645), 2) / Math.pow(sum, 2))
      + (Math.pow((m2 / 1.645), 2) / Math.pow(sum2, 2))) * 1.645;

    return moe;
  },

  @computed('data.comparison_m', 'data2.comparison_m', 'data.m', 'data2.m')
  differenceMOE(comparisonM, comparisonM2, m, m2) {
    const bd = Math.sqrt((Math.pow((m2 / 1.645), 2)) + (Math.pow((m / 1.645), 2)));
    const bl = Math.sqrt((Math.pow((comparisonM2 / 1.645), 2))
      + (Math.pow((comparisonM / 1.645), 2)));

    const moe = Math.sqrt((Math.pow((bd / 1.645), 2)) + (Math.pow((bl / 1.645), 2)));

    return moe;
  },

  @computed('data.sum', 'data2.sum', 'data.m', 'data2.m', 'data.comparison_sum', 'data2.comparison_sum', 'data.comparison_m', 'data2.comparison_m')
  differencePercentMOE(sum, sum2, m, m2, comparisonSum, comparisonSum2, comparisonM, comparisonM2) {
    const bg = Math.abs(sum / sum2)
      * Math.sqrt((Math.pow((m / 1.645), 2) / Math.pow(sum, 2))
      + (Math.pow((m2 / 1.645), 2) / Math.pow(sum2, 2))) * 1.645;
    const bn = Math.abs(comparisonSum / comparisonSum2)
      * Math.sqrt((Math.pow((comparisonM / 1.645), 2) / Math.pow(comparisonSum, 2))
      + (Math.pow((comparisonM2 / 1.645), 2) / Math.pow(comparisonSum2, 2))) * 1.645;


    const moe = Math.sqrt((Math.pow((bg / 1.645), 2)) + (Math.pow((bn / 1.645), 2)));

    return moe;
  },

});
