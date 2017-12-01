export default (config, d) =>
  (config.map(({ property, label }) =>
    ({
      percent: d[property].percent,
      sum: d[property].sum,
      moe: d[property].m,
      percent_m: d[property].percent_m,
      comparison_percent: d[property].comparison_percent,
      comparison_percent_m: d[property].comparison_percent_m,
      group: label,
      classValue: property,
    }))
  );
