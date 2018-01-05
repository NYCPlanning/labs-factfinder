import Ember from 'ember';
import FormulaParser from 'npm:hot-formula-parser';

const { get } = Ember;
const { Parser } = FormulaParser;

export default function(data, sumKey = 'sum', rowConfig) {
  const { formula } = rowConfig;
  const parser = new Parser();

  parser.setFunction('GET', ([path]) => get(data, path));

  const { result, error } = parser.parse(formula);

  if (error) {
    console.log(result, error);
    return error;
  }

  return result;
}
