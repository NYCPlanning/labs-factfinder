import { helper } from '@ember/component/helper';

export function renderTopBottomCodingSuffix([direction]) {
  const symbol = (direction === 'upper') ? '+' : '-';
  return direction ? symbol : '';
}

export default helper(renderTopBottomCodingSuffix);
