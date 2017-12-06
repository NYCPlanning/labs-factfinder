import { nest } from 'd3-collection';

export default function nestProfile(data, ...keys) {
  const { length } = keys;
  let allKeys = ['dataset', 'category', 'variable'];

  if (length) {
    allKeys = keys;
  }

  return allKeys
    .reduce(
      (nesting, currentKey) => nesting.key(d => d[currentKey]),
      nest(),
    )
    .rollup(d => d[0])
    .object(data);
}
