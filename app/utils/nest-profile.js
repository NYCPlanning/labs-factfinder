import Ember from 'ember';
import { nest } from 'd3-collection';

const { get } = Ember;

export default function nestProfile(data, ...keys) {
  const { length } = keys;
  let allKeys = ['dataset', 'category', 'variable'];

  if (length) {
    allKeys = keys;
  }

  return allKeys
    .reduce(
      (nesting, currentKey) => nesting.key(d => get(d, currentKey)),
      nest(),
    )
    .rollup(d => d[0])
    .object(data);
}
