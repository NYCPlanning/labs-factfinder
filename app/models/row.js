import { alias } from '@ember/object/computed';
import DS from 'ember-data';
import { computed } from '@ember/object';

/**
 * The Row model represents a row in a data profile. It contains all the data necessary
 * to display a row in a table.
 *
 * See Ember Data documentation: https://api.emberjs.com/ember-data/release/classes/DS.Model
 */
export default DS.Model.extend({
  /* =============================================
  =            Row MetaData                      =
  ============================================= */

  /**
   * Number of geoids, which compose an aggregate geography
   */
  numGeoids: DS.attr('number'),

  /**
   * Profile Type, e.g. demographic, social, housing, economic, census
   */
  profile: DS.attr('string'),

  /**
   * Category name, used to group together rows
   * e.g. sexAndAge (as part of profile "demographic"), placeOfBirth (as part of profile "social")
   */
  category: DS.attr('string'),

  /**
   * Raw variable name, used to group together rows.
   * e.g. Pop10t14 (as part of category "sexAndAge")
   */
  variablename: DS.attr('string'),

  /**
   * Lower-cased version of "variablename"
   */
  variable: DS.attr('string'),

  /**
   * Publication "year", or range of years.
   */
  dataset: DS.attr('string'),

  /**
   * Publication "year", or range of years.
   * TODO: Is this still used?
   */
  year: DS.attr('string'),

  /**
   * Configuration used to determine if a given value should be
   * "top" or "bottom"-coding, meaning that if beyond a certain threshold,
   * the computed value will be presented as a rounded value followed by
   * a plus sign.
   *
   * For example, if the median income is $187k, and the top coding is $150k,
   * the value should be displayed as "$150,000+"
   */
  codingThresholds: DS.attr(),

  /**
   * Geotype is the Census(ish) "summary level", a pre-aggregated geography at which
   * data are published. A "selection" is aggregated and composed from many of one type
   * of these geographies.
   *
   * One of:
   *   NTA2010 // DCP-created summary level
   *   CT2010 // official Census sum level
   *   PUMA2010 // official Census sum level
   *   Boro2010 // official Census sum level
   */
  geotype: DS.attr('string'),

  /**
   * Flag for whether it's a special calculation variable. Used in
   * templates for display purposes, aliased for convenience.
   */
  special: DS.attr('boolean'),
  isSpecial: alias('special'),
  /* =====  End of Row Metadata  ====== */


  /* =============================================
  =               Main Values                    =
  ============================================= */

  /**
   * U.S. Census-specified "universe" for any given variable. Not "inferred" from data.
   *
   * e.g. Pop_1 (all population), fb2 (all foreign-born population)
   */
  base: DS.attr('string'),

  /**
   * Sum is the aggregate estimated value. Most of the time this is an actual "sum",
   * for special calculations, it could be a rate, median, or mean.
   */
  sum: DS.attr('number'),

  /**
   * M is margin or error for the aggregate.
   */
  m: DS.attr('number'),

  /**
   * CV is the coefficient of variation.
   */
  cv: DS.attr('number'),

  /**
   * Percent is the aggregate "sum" divided by the "base", which is the U.S. Census published
   * universe for a given given (in other words, not inferred by summing the total)
   */
  percent: DS.attr('number'),

  /**
   * Percent_M is the percentage margin of error.
   */
  percent_m: DS.attr('number'),

  /**
   * is_reliable is a flag for determining whether the estimate is reliable as opposed to significant.
   */
  is_reliable: DS.attr('boolean'),


  /* =====  End of Main Values  ====== */


  /* =============================================
  =                  PREVIOUS_                   =
  = previous refers to values from previous      =
  = year(s) (e.g. y2000 for census and y2006-2010 for ACS)
  ============================================= */

  /**
   * previous_sum is the previous year estimate
   */
  previous_sum: DS.attr('number'),

  /**
   * previous_m is the previous year margin of error
   */
  previous_m: DS.attr('number'),

  /**
   * previous_cv is the previous year coefficient of variation
   */
  previous_cv: DS.attr('number'),

  /**
   * previous_percent is the previous year percentage
   */
  previous_percent: DS.attr('number'),

  /**
   * previous_percent_m is the previous year percentage margin of error
   */
  previous_percent_m: DS.attr('number'),

  /* =====  End of PREVIOUS_  ====== */


  /* =============================================
  =                    CHANGE_                   =
  = refers to changes in values from previous year
  = (ACS y2006-2010) to current year (ACS y2012-2016)
  = (current year - previous year = change)
  ============================================= */
  /**
   * change_sum is change in estimates from previous year to
   * current year
   */
  change_sum: DS.attr('number'),

  /**
   * change_m is change in margin of error from previous year to
   * current year
   */
  change_m: DS.attr('number'),

  /**
   * change_significant now reflects reliability (calculations were
   * changed in the API but variable names have not been updated, check issue #57)
   */
  change_significant: DS.attr('boolean'),

  /**
   * change_percent is change in percentage from previous year to
   * current year
   */
  change_percent: DS.attr('number'),

  /**
   * change_percent_m is change in percentage margin of error from
   * previous year to current year
   */
  change_percent_m: DS.attr('number'),

  /**
   * change_percent_significant reflects reliability (calculations were changed in
   * the API but variable names have not been updated, check issue #57)
  */
  change_percent_significant: DS.attr('boolean'),

  /**
   * change_percentage_point is the percentage point change as opposed to percent change
   */
  change_percentage_point: DS.attr('number'),

  /**
   * change_percentage_point_m is the margin of error in the percent point calculation
   */
  change_percentage_point_m: DS.attr('number'),

  /**
   * !!!WARNING!!!: change_percentage_point_significant now reflects reliability (calculations were changed in
   * the API but variable names have not been updated, check issue #57)
   */
  change_percentage_point_significant: DS.attr('boolean'),

  /* =====  End of CHANGE_  ====== */


  /* =============================================
  =                  COMPARISON_                 =
  = comparison refers to the geography that      =
  = a user will compare to their chosen area     =
  = ( e.g. Flushing vs. Queens (comparison area))=
  ============================================= */

  /**
   * comparison_sum: estimate of comparison area
   */
  comparison_sum: DS.attr('number'),

  /**
   * comparison_m: margin of error of comparison area
   */
  comparison_m: DS.attr('number'),

  /**
   * comparison_cv: coefficient of variation of comparison area
   */
  comparison_cv: DS.attr('number'),

  /**
   * comparison_percent: percentage of comparison area
   */
  comparison_percent: DS.attr('number'),

  /**
   * comparison_percent_m: percentage margin of error of comparison area
   */
  comparison_percent_m: DS.attr('number'),

  /**
   * comparison_is_reliable: whether comparison area data is reliable
   */
  comparison_is_reliable: DS.attr('boolean'),

  /* =====  End of COMPARISON_  ====== */


  /* =============================================
  =                   DIFFERENCE_                =
  = difference refers to the differnce in values =
  = between the chosen area and the comparison   =
  = area (Flushing - Queens = difference)        =
  ============================================= */

  /**
   * See "sum"
   */
  difference_sum: DS.attr('number'),

  /**
   * See "m"
   */
  difference_m: DS.attr('number'),
  // "significant" belongs to "difference"

  /**
   * !!! WARNING !!!
   * "significant" actually reflects reliability (calculations were changed in
   * the API but variable names have not been updated, check issue #57)
   */
  significant: DS.attr('boolean'),

  /**
   * See "percent"
   */
  difference_percent: DS.attr('number'),

  /**
   * See "percent_m"
   */
  difference_percent_m: DS.attr('number'),
  // "percent_significant" belongs to "difference"

  /**
   * !!! WARNING !!!
   * percent_significant reflects reliability (calculations were changed in the
   * API but variable names have not been updated, check issue #57)
   */
  percent_significant: DS.attr('boolean'),
  /* =====  End of DIFFERENCE_  ====== */


  /* =============================================
  =      ALIASES for CSV download use only       =
  ============================================= */
  previous0610_estimate: alias('previous_sum'),
  previous0610_moe: alias('previous_m'),
  previous0610_cv: alias('previous_cv'),
  previous0610_percent: alias('previous_percent'),
  previous0610_percent_moe: alias('previous_percent_m'),
  previous2000_estimate: alias('previous_sum'),
  previous2000_percent: alias('previous_percent'),
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
  /* =====  End of ALIASES  ====== */

  /**
   * Selection is a computed property for convenience of grouping
   * all un-prefix selection-specific aggregate values.
   * @returns {Object} selection
   */
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

  /**
   * Comparison is a computed property for convenience of grouping
   * all un-prefix comparison-specific aggregate values.
   * @returns {Object} comparison
   */
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

  /**
   * shouldHideDeltaPercent is a special exception to displaying the percentage change.
   * @returns {Boolean}
   */
  shouldHideDeltaPercent: computed('isSpecial', 'sum', 'comparison_sum', function() {
    const { isSpecial, sum, comparison_sum } = this.getProperties('isSpecial', 'sum', 'comparison_sum');
    return isSpecial || (sum + comparison_sum === 0);
  }),
});
