const noop = () => null;

export default function aggregateSpecialVariable(row, rowConfig, data) {
  const { specialCalculations = [] } = rowConfig || {};
  const resultsObject = {};

  specialCalculations.forEach(({ column, aggregator = noop, options }) => {
    let specialValue;
    try {
      specialValue = aggregator(data, column, options);
    } catch (err) {
      console.log('Error with ', column, options, 'Stack trace: ', err); // eslint-disable-line
    }

    row.set(column, specialValue);
  });

  return resultsObject;
}
