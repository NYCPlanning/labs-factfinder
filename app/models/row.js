import Ember from 'ember';
import DS from 'ember-data';
import { computed } from 'ember-decorators/object';

import { decimalOnePlace,
  decimalOnePlacePercent } from '../utils/number-formatters';
import tableConfigs from '../table-config';

const { get, Logger, computed: { alias } } = Ember;

export default DS.Model.extend({
  category: DS.attr('string'),
  profile: DS.attr('string'),
  variable: DS.attr('string'),
  variablename: DS.attr('string'),
  dataset: DS.attr('string'), // year
  year: DS.attr('string'), // year

  base: DS.attr('string'),
  base_join: DS.attr('number'),
  base_m: DS.attr('number'),
  base_sum: DS.attr('number'),
  base_year: DS.attr('number'),
  comparison_base_join: DS.attr('number'),
  comparison_base_m: DS.attr('number'),
  comparison_base_sum: DS.attr('number'),
  comparison_base_year: DS.attr('number'),
  comparison_cv: DS.attr('number'),
  comparison_m: DS.attr('number'),
  comparison_percent: DS.attr('number'),
  comparison_percent_m: DS.attr('number'),
  comparison_sum: DS.attr('number'),
  cv: DS.attr('number'),

  m: DS.attr('number'),
  notinprofile: DS.attr('string'),
  percent: DS.attr('number'),
  percent_m: DS.attr('number'),
  percent_significant: DS.attr('boolean'),
  producttype: DS.attr('string'),
  release_year: DS.attr('string'),
  significant: DS.attr('boolean'),
  is_reliable: DS.attr('boolean'),
  comparison_is_reliable: DS.attr('boolean'),
  sum: DS.attr('number'),
  unittype: DS.attr('string'),

  // groupings
  @computed('sum', 'selectedSumMoE', 'selectedCV', 'selectedPercent', 'selectedPercentM', 'is_reliable')
  selection(sum, moe, cv, pct, pctm, is_reliable) {
    return { sum, moe, cv, pct, pctm, is_reliable };
  },

  @computed('comparison_sum', 'comparisonSumMoE', 'comparisonCV', 'comparisonPercent', 'comparisonPercentM', 'comparison_is_reliable')
  comparison(sum, moe, cv, pct, pctm, is_reliable) {
    return { sum, moe, cv, pct, pctm, is_reliable };
  },

  @computed('base', 'variablename')
  isBase(base, variablename) {
    return base === variablename;
  },

  @computed('profile', 'category', 'variable', 'notinprofile')
  rowConfig(profile, category, variableName, notinprofile) {
    if (notinprofile) return {};

    const categoryNormalized = category.camelize();
    const variables = get(tableConfigs, `${profile}.${categoryNormalized}`) || [];
    const foundVariable = variables.findBy('data', variableName);

    if (!foundVariable && (profile !== 'decennial')) {
      Logger.warn(`Row configuration not found for ${profile}, ${category}, ${variableName}.
        Data may be misnamed in the layer-groups.
        Please make sure profile, category, and variable names
        are consistent in the database, and re-index.`);
    }

    return foundVariable;
  },

  isSpecial: alias('rowConfig.special'),

  @computed('sum', 'cv')
  selectedCV(sum, cv) {
    const floatedSum = parseFloat(sum);
    const floatedCv = parseFloat(cv);

    if (floatedSum > 0) {
      return decimalOnePlace(floatedCv);
    }

    return null;
  },

  @computed('sum', 'percent', 'isSpecial')
  selectedPercent(sum, percent, isSpecial) {
    if (isSpecial) return null;
    if (sum > 0) {
      return decimalOnePlacePercent(percent);
    }

    return null;
  },

  @computed('sum', 'percent_m', 'isBase', 'isSpecial')
  selectedPercentM(sum, percentM, isBase, isSpecial) {
    if (isBase || isSpecial) return null;

    const floatedZ = parseFloat(percentM);
    if (sum > 0) {
      return decimalOnePlacePercent(floatedZ);
    }

    return null;
  },

  @computed('comparison_sum', 'comparison_cv')
  comparisonCV(sum, cv) {
    const floatedCv = parseFloat(cv);

    if (sum > 0) {
      return decimalOnePlace(floatedCv);
    }

    return null;
  },

  @computed('comparison_sum', 'comparison_percent')
  comparisonPercent(sum, percent) {
    if (sum > 0) {
      return decimalOnePlacePercent(percent);
    }

    return null;
  },

  @computed('comparison_sum', 'comparison_percent_m', 'isBase', 'isSpecial')
  comparisonPercentM(sum, percentM, isBase, isSpecial) {
    if (isBase || isSpecial) return null;

    const floatedZ = parseFloat(percentM);
    if (sum > 0) {
      return decimalOnePlacePercent(floatedZ);
    }

    return null;
  },


  @computed('sum', 'm')
  selectedSumMoE(sum, m) {
    const floatedM = parseFloat(m);

    if (sum > 0) {
      return floatedM;
    }

    return null;
  },

  @computed('comparison_sum', 'comparison_m')
  comparisonSumMoE(sum, m) {
    const floatedM = parseFloat(m);

    if (sum > 0) {
      return floatedM;
    }

    return null;
  },

  @computed('sum', 'comparison_sum')
  differenceSum(sum, comparisonSum) {
    const difference = sum - comparisonSum;

    if (isNaN(sum) || isNaN(comparisonSum)) {
      return null;
    }

    return difference;
  },

  @computed('m', 'comparison_m')
  differenceM(m, comparison_m) {
    const sumOfSquares = (((m) ** 2) + ((comparison_m) ** 2));
    const difference = Math.sqrt(sumOfSquares);
    if (isNaN(m) || isNaN(comparison_m)) {
      return null;
    }

    return difference.toFixed(1);
  },

  @computed('percent', 'comparison_percent')
  differencePercent(percent, comparisonPercent) {
    const difference = (percent - comparisonPercent) * 100;

    if (isNaN(percent) || isNaN(comparisonPercent)) {
      return null;
    }

    return cleanPercent(difference);
  },

  @computed('selectedPercentM', 'comparisonPercentM', 'isBase')
  differencePercentM(selectedPercentM, comparisonPercentM, isBase) {
    if (isBase) return null;

    const sumOfSquares = (((parseFloat(selectedPercentM)) ** 2) + ((parseFloat(comparisonPercentM)) ** 2));
    const difference = Math.sqrt(sumOfSquares);

    if (isNaN(parseFloat(selectedPercentM)) || isNaN(parseFloat(comparisonPercentM))) {
      return null;
    }

    return difference.toFixed(1);
  },
});

function cleanPercent(value) {
  let cleaned = value;
  if ((value < 0) && (value > -0.05)) cleaned = 0;
  return cleaned.toFixed(1);
}
