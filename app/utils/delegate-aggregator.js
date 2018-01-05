const noop = () => null;

export default function aggregateSpecialVariable(rowConfig, data) {
  const { aggregator = noop } = rowConfig || {};

  const comparison_sum = aggregator(data, 'comparison_sum', rowConfig); // eslint-disable-line
  const sum = aggregator(data, 'sum', rowConfig);

  return {
    comparison_sum,
    sum,
  };
}
