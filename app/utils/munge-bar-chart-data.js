import Ember from 'ember';

const { get } = Ember;

export default (config, d) =>
  (config.map(({ property, label }) =>
    ({
      percent: get(d, `${property}.percent`),
      sum: get(d, `${property}.sum`),
      moe: get(d, `${property}.m`),
      percent_m: get(d, `${property}.percent_m`),
      comparison_percent: get(d, `${property}.comparison_percent`),
      comparison_percent_m: get(d, `${property}.comparison_percent_m`),
      group: label,
      classValue: property,
    }))
  );
