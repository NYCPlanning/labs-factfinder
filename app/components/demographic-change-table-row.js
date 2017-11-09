import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line

export default Ember.Component.extend({
  tagName: 'tr',

  @computed('data.sum', 'data2.sum', 'data.m', 'data2.m')
  longitudinalPercentMOE(sum, sum2, m, m2) {
    let moe = Math.abs(sum/sum2)*Math.sqrt((Math.pow((m/1.645),2)/Math.pow(sum,2))+(Math.pow((m2/1.645),2)/Math.pow(sum2,2)))*1.645;

    return moe},

  @computed('data.comparison_sum', 'data2.comparison_sum', 'data.comparison_m', 'data2.comparison_m')
      comparisonLongitudinalPercentMOE(sum, sum2, m, m2) {
        let moe = Math.abs(sum/sum2)*Math.sqrt((Math.pow((m/1.645),2)/Math.pow(sum,2))+(Math.pow((m2/1.645),2)/Math.pow(sum2,2)))*1.645;

        return moe},

  @computed('data.comparison_m', 'data2.comparison_m', 'data.m', 'data2.m')
      differenceMOE(comparison_m, comparison_m2, m, m2) {
        let bd = Math.sqrt((Math.pow((m2/1.645),2))+(Math.pow((m/1.645),2)))
        let bl = Math.sqrt((Math.pow((comparison_m2/1.645),2))+(Math.pow((comparison_m/1.645),2)))

        let moe = Math.sqrt((Math.pow((bd/1.645),2))+(Math.pow((bl/1.645),2)))

        return moe},

  @computed('data.sum', 'data2.sum', 'data.m', 'data2.m','data.comparison_sum', 'data2.comparison_sum', 'data.comparison_m', 'data2.comparison_m')
      differencePercentMOE(sum, sum2, m, m2, comparison_sum, comparison_sum2, comparison_m, comparison_m2) {
        let bg = Math.abs(sum/sum2)*Math.sqrt((Math.pow((m/1.645),2)/Math.pow(sum,2))+(Math.pow((m2/1.645),2)/Math.pow(sum2,2)))*1.645;
        let bn = Math.abs(comparison_sum/comparison_sum2)*Math.sqrt((Math.pow((comparison_m/1.645),2)/Math.pow(comparison_sum,2))+(Math.pow((comparison_m2/1.645),2)/Math.pow(comparison_sum2,2)))*1.645;


        let moe = Math.sqrt((Math.pow((bg/1.645),2))+(Math.pow((bn/1.645),2)))

        return moe},




});
