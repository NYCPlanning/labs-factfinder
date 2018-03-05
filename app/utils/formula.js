import { get } from '@ember/object';
import Ember from 'ember';
import FormulaParser from 'npm:hot-formula-parser';

const {
  Logger,
} = Ember;
const { Parser } = FormulaParser;

export default function(data, sumKey, rowConfig) {
  const { formula } = rowConfig;
  const parser = new Parser();

  parser.setFunction('GET', ([path]) => get(data, path));

  const { result, error } = parser.parse(formula);

  if (error) {
    Logger.warn('Special calculation failed: ', result, error, data);
    return error;
  }

  return result;
}
