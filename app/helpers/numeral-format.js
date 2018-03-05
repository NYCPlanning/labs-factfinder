import { helper } from '@ember/component/helper';
import numeral from 'numeral';

export function numeralFormat(params) {
  const [number, template] = params;
  return numeral(number).format(template || '0,0');
}

export default helper(numeralFormat);
