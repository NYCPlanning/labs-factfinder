import Ember from 'ember';

export function asFloat([number]) {
  return parseFloat(number);
}

export default Ember.Helper.helper(asFloat);
