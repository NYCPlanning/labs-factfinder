import formatNumber from 'accounting/format-number';
import Ember from 'ember';

export default Ember.Helper.helper(function(params, options) {
  const value = params[0];
  if (value === null) return '';
  return formatNumber(value, options);
});
