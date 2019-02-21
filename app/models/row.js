import { alias } from '@ember/object/computed';
import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  // number of geoids
  numGeoids: DS.attr('number'),

  // categorical information
  profile: DS.attr('string'), // e.g. demographic, social, housing, economic, census
  category: DS.attr('string'), // e.g. sexAndAge (as part of profile "demographic"), placeOfBirth (as part of profile "social")
  variable: DS.attr('string'), // e.g. Pop10t14 (as part of category "sexAndAge")
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

  // all data
  base: DS.attr('string'), // UNIVERSE, e.g. Pop_1 (all population), fb2 (all foreign-born population)

  // previous refers to values from previous year(s) (e.g. y2000 for census and y2006-2010 for ACS)
  previous_sum: DS.attr('number'), // previous year estimate
  previous_m: DS.attr('number'), // previous year margin of error
  previous_cv: DS.attr('number'), // previous year coefficient of variation
  previous_percent: DS.attr('number'), // previous year percentage
  previous_percent_m: DS.attr('number'), // previous year percentage margin of error
  previous_is_reliable: DS.attr('boolean'), // whether previous year data is reliable

  sum: DS.attr('number'), // census/ACS estimate
  m: DS.attr('number'), // moe (margin of error)
  cv: DS.attr('number'), // coefficient of variation
  percent: DS.attr('number'),
  percent_m: DS.attr('number'), // percentage margin of error
  is_reliable: DS.attr('boolean'), // whether data is reliable

  // change refers to changes in values from previous year (ACS y2006-2010) to current year (ACS y2012-2016) (current year - previous year = change)
  change_sum: DS.attr('number'), // change in estimates from previous year to current year
  change_m: DS.attr('number'), // change in margin of error from previous year to current year
  change_significant: DS.attr('boolean'), // these variable now reflects reliability (calculations were changed in the API but variable names have not been updated, check issue #57)
  change_percent: DS.attr('number'), // change in percentage from previous year to current year
  change_percent_m: DS.attr('number'), // change in percentage margin of error from previous year to current year
  change_percent_significant: DS.attr('boolean'), // this variable now reflects reliability (calculations were changed in the API but variable names have not been updated, check issue #57)
  change_percentage_point: DS.attr('number'),
  change_percentage_point_m: DS.attr('number'),
  change_percentage_point_significant: DS.attr('boolean'), // !!! these variable now reflects reliability (calculations were changed in the API but variable names have not been updated, check issue #57)

  // comparison refers to the geography that a user will compare to their chosen area ( e.g. Flushing vs. Queens (comparison area) )
  comparison_sum: DS.attr('number'), // estimate of comparison area
  comparison_m: DS.attr('number'), // margin of error of comparison area
  comparison_cv: DS.attr('number'), // coefficient of variation of comparison area
  comparison_percent: DS.attr('number'), // percentage of comparison area
  comparison_percent_m: DS.attr('number'), // percentage margin of error of comparison area
  comparison_is_reliable: DS.attr('boolean'), // whether comparison area data is reliable

  // difference refers to the differnce in values between the chosen area and the comparison area (Flushing - Queens = difference)
  difference_sum: DS.attr('number'),
  difference_m: DS.attr('number'),
  // "significant" belongs to "difference"
  significant: DS.attr('boolean'), // !!! these variables now reflect reliability (calculations were changed in the API but variable names have not been updated, check issue #57)
  difference_percent: DS.attr('number'),
  difference_percent_m: DS.attr('number'),
  // "percent_significant" belongs to "difference"
  percent_significant: DS.attr('boolean'), // !!! these variables now reflect reliability (calculations were changed in the API but variable names have not been updated, check issue #57)

  notinprofile: DS.attr('string'),
  producttype: DS.attr('string'),
  release_year: DS.attr('string'),
  unittype: DS.attr('string'),

  // ALIASES for CSV download use only
  previous0610_estimate: alias('previous_sum'),
  previous0610_moe: alias('previous_m'),
  previous0610_cv: alias('previous_cv'),
  previous0610_percent: alias('previous_percent'),
  previous0610_percent_moe: alias('previous_percent_m'),
  previous0610_is_reliable: alias('previous_is_reliable'),
  previous2000_estimate: alias('previous_sum'),
  previous2000_moe: alias('previous_m'),
  previous2000_cv: alias('previous_cv'),
  previous2000_percent: alias('previous_percent'),
  previous2000_percent_moe: alias('previous_percent_m'),
  previous2000_is_reliable: alias('previous_is_reliable'),
  estimate: alias('sum'),
  moe: alias('m'),
  percent_moe: alias('percent_m'),
  change_estimate: alias('change_sum'),
  change_moe: alias('change_m'),
  change_reliable: alias('change_significant'),
  change_percent_moe: alias('change_percent_m'),
  change_percent_reliable: alias('change_percent_significant'),
  change_percentage_point_moe: alias('change_percentage_point_m'),
  change_percentage_point_reliable: alias('change_percentage_point_significant'),
  comparison_estimate: alias('comparison_sum'),
  comparison_moe: alias('comparison_m'),
  comparison_percent_moe: alias('comparison_percent_m'),
  difference_estimate: alias('difference_sum'),
  difference_moe: alias('difference_m'),
  difference_reliable: alias('significant'),
  difference_percent_moe: alias('difference_percent_m'),
  difference_percent_reliable: alias('percent_significant'),

  // groupings
  // these are used to group together similar type columns
  // into normalized mappings for components
  // These are used in the column groups
  selection: computed('sum', 'm', 'cv', 'percent', 'percent_m', 'is_reliable', 'codingThresholds.sum', function() {
    const {
      sum,
      m: moe,
      cv,
      percent,
      percent_m,
      is_reliable,
      codingThresholds,
    } = this.getProperties('sum', 'm', 'cv', 'percent', 'percent_m', 'is_reliable', 'codingThresholds');

    const { sum: direction } = codingThresholds;

    return {
      sum, moe, cv, percent, percent_m, is_reliable, direction,
    };
  }),

  comparison: computed(
    'comparison_sum',
    'comparison_m',
    'comparison_cv',
    'comparison_percent',
    'comparison_percent_m',
    'comparison_is_reliable',
    'codingThresholds.comparison_sum',
    function() {
      const {
        comparison_sum: sum,
        comparison_m: moe,
        comparison_cv: cv,
        comparison_percent: percent,
        comparison_percent_m: percent_m,
        comparison_is_reliable: is_reliable,
        'codingThresholds.comparison_sum': direction,
      } = this.getProperties(
        'comparison_sum',
        'comparison_m',
        'comparison_cv',
        'comparison_percent',
        'comparison_percent_m',
        'comparison_is_reliable',
        'codingThresholds.comparison_sum',
      );

      return {
        sum, moe, cv, percent, percent_m, is_reliable, direction,
      };
    },
  ),


  isBase: computed('base', 'variablename', function() {
    const { base, variablename } = this.getProperties('base', 'variablename');
    return base === variablename;
  }),

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

  shouldHideDeltaPercent: computed('isSpecial', 'sum', 'comparison_sum', function() {
    const { isSpecial, sum, comparison_sum } = this.getProperties('isSpecial', 'sum', 'comparison_sum');
    return isSpecial || (sum + comparison_sum === 0);
  }),

});
