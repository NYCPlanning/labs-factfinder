import Ember from 'ember';
import { decimalFormat } from '../models/row';

export function formatAs([number, formatConfig]) {
  return decimalFormat(number, formatConfig);
}

export default Ember.Helper.helper(formatAs);
