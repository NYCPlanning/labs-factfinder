import { nest } from 'd3-collection';

export default function nestReport(data) {
  return nest()
    .key(d => d.dataset)
    .key(d => d.category)
    .key(d => d.variable)
    .rollup(d => d[0])
    .object(data);
}
