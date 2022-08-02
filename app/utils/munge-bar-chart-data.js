import { get } from '@ember/object';

export default (config, data, mode) => {
  const isPrevious = mode === 'previous';

  if (isPrevious) {
    return config.map(({ property, label}) => ({
      percent: get(data, `${property}.previous.percent`),
      sum: get(data, `${property}.previous.sum`),
      moe: get(data, `${property}.previous.marginOfError`),
      percentMarginOfError: get(data, `${property}.previous.percentMarginOfError`),
      comparisonPercent: get(data, `${property}.previousComparison.percent`),
      comparisonPercentMarginOfError: get(data, `${property}.previousComparison.percentMarginOfError`),
      group: label,
      classValue: property,
    }));
  }

  return config.map(({ property, label}) => ({
    percent: get(data, `${property}.percent`),
    sum: get(data, `${property}.sum`),
    moe: get(data, `${property}.marginOfError`),
    percentMarginOfError: get(data, `${property}.percentMarginOfError`),
    comparisonPercent: get(data, `${property}.comparisonPercent`),
    comparisonPercentMarginOfError: get(data, `${property}.comparisonPercentMarginOfError`),
    group: label,
    classValue: property,
  }));
};
