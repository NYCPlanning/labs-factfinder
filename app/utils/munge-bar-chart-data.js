import { get } from '@ember/object';

export default (config, d) => (config.map(({ property, label }) => ({
  percent: get(d, `${property}.percent`),
  sum: get(d, `${property}.sum`),
  moe: get(d, `${property}.marginOfError`),
  percentMarginOfError: get(d, `${property}.percentMarginOfError`),
  comparisonPercent: get(d, `${property}.comparisonPercent`),
  comparisonPercentMarginOfError: get(d, `${property}.comparisonPercentMarginOfError`),
  group: label,
  classValue: property,
}))
);
