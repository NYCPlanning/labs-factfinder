import { helper } from '@ember/component/helper';
import formatNumber from 'accounting/format-number';

export default helper(function(params, options) {
  const value = params[0];
  if (value === null) return '';
  return formatNumber(value, options);
});
