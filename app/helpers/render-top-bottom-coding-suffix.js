import Ember from 'ember';

export function renderTopBottomCodingSuffix([direction]) {
  const symbol = (direction === 'upper') ? '+' : '-';
  return direction ? symbol : '';
}

export default Ember.Helper.helper(renderTopBottomCodingSuffix);
