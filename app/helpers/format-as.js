import { helper } from '@ember/component/helper';
import { decimalFormat } from '../utils/number-formatters';

export function formatAs([number, formatConfig]) {
  return decimalFormat(number, formatConfig);
}

export default helper(formatAs);
