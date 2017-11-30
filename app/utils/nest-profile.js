import { nest } from 'd3-collection';

export default function nestProfile(data, ...keys) {
  return keys
    .reduce(
      (nesting, currentKey) => nesting.key(d => d[currentKey]),
      nest(),
    )
    .rollup(d => d[0])
    .object(data);
}
