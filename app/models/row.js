import { alias } from '@ember/object/computed';
import DS from 'ember-data';
import { computed } from 'ember-decorators/object';

export default DS.Model.extend({
  // categorical information
  category: DS.attr('string'),
  profile: DS.attr('string'),
  variable: DS.attr('string'),
  variablename: DS.attr('string'),
  dataset: DS.attr('string'), // year
  year: DS.attr('string'), // year
  codingThresholds: DS.attr(),
  is_most_recent: DS.attr('boolean'),

  /*
    One of:
      NTA2010
      CT2010
      PUMA2010
      Boro2010
  */
  geotype: DS.attr('string'),

  // number of geoids
  numGeoids: DS.attr('number'),

  // all data
  base: DS.attr('string'),
  comparison_cv: DS.attr('number'),
  comparison_m: DS.attr('number'),
  comparison_percent: DS.attr('number'),
  comparison_percent_m: DS.attr('number'),
  comparison_sum: DS.attr('number'),
  cv: DS.attr('number'),
  m: DS.attr('number'),
  difference_sum: DS.attr('number'),
  difference_percent: DS.attr('number'),
  difference_m: DS.attr('number'),
  difference_percent_m: DS.attr('number'),

  previous_sum: DS.attr('number'),
  change_sum: DS.attr('number'),
  change_percent: DS.attr('number'),
  change_m: DS.attr('number'),
  change_percent_m: DS.attr('number'),
  change_percentage_point: DS.attr('number'),
  change_percentage_point_m: DS.attr('number'),
  change_significant: DS.attr('number'),
  change_percent_significant: DS.attr('number'),
  change_percentage_point_significant: DS.attr('number'),

  notinprofile: DS.attr('string'),
  percent: DS.attr('number'),
  percent_m: DS.attr('number'),
  previous_percent: DS.attr('number'),
  percent_significant: DS.attr('boolean'),
  producttype: DS.attr('string'),
  release_year: DS.attr('string'),
  significant: DS.attr('boolean'),
  is_reliable: DS.attr('boolean'),
  comparison_is_reliable: DS.attr('boolean'),
  sum: DS.attr('number'),
  unittype: DS.attr('string'),

  // groupings
  // these are used to group together similar type columns
  // into normalized mappings for components
  // These are used in the column groups
  @computed('sum', 'm', 'cv', 'percent', 'percent_m', 'is_reliable', 'codingThresholds.sum')
  selection(sum, moe, cv, percent, percent_m, is_reliable, direction) {
    return {
      sum, moe, cv, percent, percent_m, is_reliable, direction,
    };
  },

  @computed('comparison_sum', 'comparison_m', 'comparison_cv', 'comparison_percent', 'comparison_percent_m', 'comparison_is_reliable', 'codingThresholds.comparison_sum')
  comparison(sum, moe, cv, percent, percent_m, is_reliable, direction) {
    return {
      sum, moe, cv, percent, percent_m, is_reliable, direction,
    };
  },

  @computed('base', 'variablename')
  isBase(base, variablename) {
    return base === variablename;
  },

  rowConfig: DS.attr(),
  // @computed('profile', 'category', 'variable', 'notinprofile')
  // rowConfig(profile, category, variableName, notinprofile) {
  //   if (notinprofile) return {};

  //   const categoryNormalized = category.camelize();
  //   const variables = get(tableConfigs, `${profile}.${categoryNormalized}`) || [];
  //   const foundVariable = variables.findBy('data', variableName);

  //   if (!foundVariable && (profile !== 'decennial')) {
  //     Logger.warn(`Row configuration not found for ${profile}, ${category}, ${variableName}.
  //       Data may be misnamed in the layer-groups.
  //       Please make sure profile, category, and variable names
  //       are consistent in the database, and re-index.`);
  //   }

  //   return foundVariable;
  // },

  special: DS.attr('boolean'),
  isSpecial: alias('special'),

  @computed('isSpecial', 'sum', 'comparison_sum')
  shouldHideDeltaPercent(isSpecial, sum, comparison_sum) {
    return isSpecial || (sum + comparison_sum === 0);
  },
});
