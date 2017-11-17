import Ember from 'ember';

export function aggregateSpecialVariable(params, { rowConfig, data }) {
  const sum = rowConfig.aggregator ? rowConfig.aggregator(data) : null;
  const comparison_sum = // eslint-disable-line
    rowConfig.aggregator ? rowConfig.aggregator(data, 'comparison_sum') : null;

  return {
    sum,
    comparison_sum,
  };
}

export default Ember.Helper.helper(aggregateSpecialVariable);
