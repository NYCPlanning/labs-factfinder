import Ember from 'ember';
import FormulaParser from 'npm:hot-formula-parser';

const { get } = Ember;
const { Parser } = FormulaParser;

export default function(data) {
  const { formula } = this;
  const parser = new Parser();

  parser.setFunction('GET', ([path]) => get(data, path));

  const { result, error } = parser.parse(formula);

  if (error) return error;
  return result;
}
