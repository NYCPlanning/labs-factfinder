import Ember from 'ember';

const noop = () => null;

export function aggregateSpecialVariable(params, { rowConfig, data }) {
  const { aggregator = noop } = rowConfig || {};

  const comparison_sum = aggregator.bind(rowConfig)(data, 'comparison_sum'); // eslint-disable-line
  const sum = aggregator.bind(rowConfig)(data);

  return {
    comparison_sum,
    sum,
  };
}

export default Ember.Helper.helper(aggregateSpecialVariable);
