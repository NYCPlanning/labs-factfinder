import Ember from 'ember';

export function aggregateSpecialVariable(params, { rowConfig, data }) {
  return {
    sum: rowConfig.aggregator(data),
    comparison_sum: rowConfig.aggregator(data, 'comparison_sum'),
  };
}

export default Ember.Helper.helper(aggregateSpecialVariable);
