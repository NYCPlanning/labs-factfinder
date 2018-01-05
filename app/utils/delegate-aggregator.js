const noop = () => null;

export default function aggregateSpecialVariable(row, rowConfig, data) {
  const { specialCalculations = [] } = rowConfig || {};
  const resultsObject = {};

  specialCalculations.forEach(({ column, aggregator = noop, options }) => {
    row.set(column, aggregator(data, column, options));
  });

  return resultsObject;
}
