import { helper } from '@ember/component/helper';
import { dasherize } from '@ember/string';

export default helper(function(params) {
  return dasherize(params[0]);
});
