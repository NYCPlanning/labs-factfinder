const noop = () => null;

export default function aggregateSpecialVariable(rowConfig, data) {
  const { specialCalculations = [] } = rowConfig || {};
  const resultsObject = {};

  specialCalculations.forEach(({ column, aggregator = noop, options }) => {
    resultsObject[column] = aggregator(data, column, options);
  });

  return resultsObject;
}
