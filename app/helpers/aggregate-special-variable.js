import Ember from 'ember';
import delegateAggregator from '../utils/delegate-aggregator';

export function aggregateSpecialVariable(params, { rowConfig, data }) {
  return delegateAggregator(rowConfig, data);
}

export default Ember.Helper.helper(aggregateSpecialVariable);
