import { helper } from '@ember/component/helper';
import delegateAggregator from '../utils/delegate-aggregator';

export function aggregateSpecialVariable(params, { rowConfig, data }) {
  return delegateAggregator(rowConfig, data);
}

export default helper(aggregateSpecialVariable);
