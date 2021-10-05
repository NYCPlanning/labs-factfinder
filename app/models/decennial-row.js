import { alias } from '@ember/object/computed';
import DS from 'ember-data';
import { computed } from '@ember/object';

/**
 * The Row model represents a row in the results of getting
 * all decennial data for a given geography selection.
 * It contains all the data necessary
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
   * Survey Type: 'acs' or 'decennial'
   */
   survey: DS.attr('string'),

  /**
   * Category name, used to group together rows
   * e.g. sexAndAge (as part of domain "demographic"), placeOfBirth (as part of domain "social")
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
   * U.S. Census-specified "universe" for any given variable; not inferred from aggregating data,
   * but rather an explicit value.
   * e.g. "Pop_1" (total population), or "fb2" (total foreign-born population)
   */
  base: DS.attr('string'),

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
   * Flag for whether the variable is 'special'; indicated by 'base' value
   * of 'mean', 'median', or 'rate' (the type of special calculation required for the variable).
   * Used in templates for display purposes.
   */
  isSpecial: computed('base', function() {
    const base = this.get('base');
    // base = mean, median, or rate indicates variable is special
    return ['mean', 'median', 'rate'].includes(base);
  }),

  /* =====  End of Row Metadata  ====== */


  /* =============================================
  =               Main Values                    =
  ============================================= */

  /**
   * Sum is the aggregate estimated value. Most of the time this is an actual "sum",
   * for special calculations, it could be a rate, median, or mean.
   */
  sum: DS.attr('number'),

  /**
   * The direction sum was coded, either 'upper' or 'lower',
   * or undefined if the value was not top- or bottom-coded
   * NOTE: only median values are subject to coding
   */
  codingThreshold: DS.attr('string'),

  /**
   * M is margin or error for the aggregate.
   */
  marginOfError: DS.attr('number'),

  /**
   * correlationCoefficient is the coefficient of variation.
   */
  correlationCoefficient: DS.attr('number'),

  /**
   * Percent is the aggregate "sum" divided by the "base", which is the U.S. Census published
   * universe for a given given (in other words, not inferred by summing the total)
   */
  percent: DS.attr('number'),

  /**
   * Percent_M is the percentage margin of error.
   */
  percentMarginOfError: DS.attr('number'),

  /**
   * isReliable is a flag for determining whether the estimate is reliable (as opposed to significant), based on cv.
   */
  isReliable: DS.attr('boolean', {
    defaultValue: true,
  }),


  /* =====  End of Main Values  ====== */


  /* =============================================
  =                  PREVIOUS_                   =
  = previous refers to values from previous      =
  = year(s)                                      =
  ============================================= */

  /**
   * previousSum is the previous year estimate
   */
  previousSum: DS.attr('number'),

  /**
   * See "codingThreshold"
   */
  previousCodingThreshold: DS.attr('string'),

  /**
   * previousMarginOfError is the previous year margin of error
   */
  previousMarginOfError: DS.attr('number'),

  /**
   * previousCorrelationCoefficient is the previous year coefficient of variation
   */
  previousCorrelationCoefficient: DS.attr('number'),

  /**
   * previousPercent is the previous year percentage
   */
  previousPercent: DS.attr('number'),

  /**
   * previousPercentMarginOfError is the previous year percentage margin of error
   */
  previousPercentMarginOfError: DS.attr('number'),

  /**
   * see "isReliable"
   */
  previousIsReliable: DS.attr('boolean', {
    defaultValue: true,
  }),

  // previous comparison
  previousComparisonSum: DS.attr('number'),

  previousComparisonCodingThreshold: DS.attr('string'),

  previousComparisonMarginOfError: DS.attr('number'),

  previousComparisonCorrelationCoefficient: DS.attr('number'),

  previousComparisonPercent: DS.attr('number'),

  previousComparisonPercentMarginOfError: DS.attr('number'),

  previousComparisonIsReliable: DS.attr('boolean', {
    defaultValue: true,
  }),

  // previous difference
  previousDifferenceSum: DS.attr('number'),

  previousDifferenceMarginOfError: DS.attr('number'),

  previousSignificant: DS.attr('boolean',  {
    defaultValue: true, 
  }),

  previousDifferencePercent: DS.attr('number'),

  previousDifferencePercentMarginOfError: DS.attr('number'),

  previousPercentSignificant:  DS.attr('boolean', {
    defaultValue: true,
  }),

  /* =====  End of PREVIOUS_  ====== */


  /* =============================================
  =                    CHANGE_                   =
  = refers to changes in values from previous year
  = (ACS y2006-2010) to current year (ACS y2012-2016)
  = (current year - previous year = change)
  ============================================= */
  /**
   * changeSum is change in estimates from previous year to
   * current year
   */
  changeSum: DS.attr('number'),

  /**
   * changeMarginOfError is change in margin of error from previous year to
   * current year
   */
  changeMarginOfError: DS.attr('number'),

  /**
   * changeSignificant now reflects reliability (calculations were
   * changed in the API but variable names have not been updated, check issue #57)
   */
  changeSignificant: DS.attr('boolean', {
    defaultValue: true,
  }),

  /**
   * changePercent is change in percentage from previous year to
   * current year
   */
  changePercent: DS.attr('number'),

  /**
   * changePercentMarginOfError is change in percentage margin of error from
   * previous year to current year
   */
  changePercentMarginOfError: DS.attr('number'),

  /**
   * changePercentSignificant reflects reliability (calculations were changed in
   * the API but variable names have not been updated, check issue #57)
  */
  changePercentSignificant: DS.attr('boolean', {
    defaultValue: true,
  }),

  /**
   * changePercentagePoint is the percentage point change as opposed to percent change
   */
  changePercentagePoint: DS.attr('number'),

  /**
   * changePercentagePointMarginOfError is the margin of error in the percent point calculation
   */
  changePercentagePointMarginOfError: DS.attr('number'),

  /**
   * !!!WARNING!!!: changePercentagePointSignificant now reflects reliability (calculations were changed in
   * the API but variable names have not been updated, check issue #57)
   */
  changePercentagePointSignificant: DS.attr('boolean', {
    defaultValue: true,
  }),

  /* =====  End of CHANGE_  ====== */


  /* =============================================
  =                  COMPARISON_                 =
  = comparison refers to the geography that      =
  = a user will compare to their chosen area     =
  = ( e.g. Flushing vs. Queens (comparison area))=
  ============================================= */

  /**
   * comparisonSum: estimate of comparison area
   */
  comparisonSum: DS.attr('number'),

  /**
   * See "codingThreshold"
   */
  comparisonCodingThreshold: DS.attr('string'),

  /**
   * comparisonMarginOfError: margin of error of comparison area
   */
  comparisonMarginOfError: DS.attr('number'),

  /**
   * comparisonCorrelationCoefficient: coefficient of variation of comparison area
   */
  comparisonCorrelationCoefficient: DS.attr('number'),

  /**
   * comparisonPercent: percentage of comparison area
   */
  comparisonPercent: DS.attr('number'),

  /**
   * comparisonPercentMarginOfError: percentage margin of error of comparison area
   */
  comparisonPercentMarginOfError: DS.attr('number'),

  /**
   * comparisonIsReliable: whether comparison area data is reliable
   */
  comparisonIsReliable: DS.attr('boolean', {
    defaultValue: true,
  }),

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
  differenceSum: DS.attr('number'),

  /**
   * See "m"
   */
  differenceMarginOfError: DS.attr('number'),

  /**
   * !!! WARNING !!!
   * "significant" actually reflects reliability (calculations were changed in
   * the API but variable names have not been updated, check issue #57)
   */
  differenceSignificant: DS.attr('boolean', {
    defaultValue: true,
  }),

  /**
   * See "percent"
   */
  differencePercent: DS.attr('number'),

  /**
   * See "percentMarginOfError"
   */
  differencePercentMarginOfError: DS.attr('number'),
  // "percentSignificant" belongs to "difference"

  /**
   * !!! WARNING !!!
   * percentSignificant reflects reliability (calculations were changed in the
   * API but variable names have not been updated, check issue #57)
   */
  differencePercentSignificant: DS.attr('boolean', {
    defaultValue: true,
  }),
  /* =====  End of DIFFERENCE_  ====== */


  /* =============================================
  =      ALIASES for CSV download use only       =
  ============================================= */
  previous0610_estimate: alias('previousSum'),
  previous0610MarginOfError: alias('previousMarginOfError'),
  previous0610CorrelationCoefficient: alias('previousCorrelationCoefficient'),
  previous0610Percent: alias('previousPercent'),
  previous0610PercentMarginOfError: alias('previousPercentMarginOfError'),
  previous2000_estimate: alias('previousSum'),
  previous2000Percent: alias('previousPercent'),
  // estimate: alias('estimate'),
  moe: alias('marginOfError'),
  // percentMarginOfError: alias('percentMarginOfError'),
  change_estimate: alias('changeSum'),
  // changeMarginOfError: alias('changeMarginOfError'),
  change_reliable: alias('changeSignificant'),
  // changePercentMarginOfError: alias('changePercentMarginOfError'),
  changePercent_reliable: alias('changePercentSignificant'),
  // changePercentagePointMarginOfError: alias('changePercentagePointMarginOfError'),
  changePercentagePoint_reliable: alias('changePercentagePointSignificant'),
  comparison_estimate: alias('comparisonSum'),
  // comparisonMarginOfError: alias('comparisonMarginOfError'),
  // comparisonPercentMarginOfError: alias('comparisonPercentMarginOfError'),
  difference_estimate: alias('differenceSum'),
  // differenceMarginOfError: alias('differenceMarginOfError'),
  difference_reliable: alias('significant'),
  // differencePercentMarginOfError: alias('differencePercentMarginOfError'),
  differencePercent_reliable: alias('percentSignificant'),
  /* =====  End of ALIASES  ====== */

  /**
   * Selection is a computed property for convenience of grouping
   * all un-prefix selection-specific aggregate values.
   * @returns {Object} selection
   */
  selection: computed(
    'sum',
    'marginOfError',
    'cv',
    'percent',
    'percentMarginOfError',
    'isReliable',
    'codingThreshold',
    function() {
      const {
        sum,
        m: moe,
        correlationCoefficient,
        percent,
        percentMarginOfError,
        isReliable,
        codingThreshold: direction,
      } = this.getProperties(
        'sum',
        'marginOfError',
        'cv',
        'percent',
        'percentMarginOfError',
        'isReliable',
        'codingThreshold',
      );

      return {
        sum, moe, correlationCoefficient, percent, percentMarginOfError, isReliable, direction,
      };
    },
  ),

  /**
   * Comparison is a computed property that nests all 'comparison'-prefixed
   * properties, and aliases them to their unprefixed names
   * @returns {Object} comparison
   */
  comparison: computed(
    'comparisonSum',
    'comparisonMarginOfError',
    'comparisonCorrelationCoefficient',
    'comparisonPercent',
    'comparisonPercentMarginOfError',
    'comparisonIsReliable',
    'comparisonCodingThreshold',
    function() {
      const {
        comparisonSum: sum,
        comparisonMarginOfError: moe,
        comparisonCorrelationCoefficient: correlationCoefficient,
        comparisonPercent: percent,
        comparisonPercentMarginOfError: percentMarginOfError,
        comparisonIsReliable: isReliable,
        comparisonCodingThreshold: direction,
      } = this.getProperties(
        'comparisonSum',
        'comparisonMarginOfError',
        'comparisonCorrelationCoefficient',
        'comparisonPercent',
        'comparisonPercentMarginOfError',
        'comparisonIsReliable',
        'comparisonCodingThreshold',
      );

      return {
        sum, moe, correlationCoefficient, percent, percentMarginOfError, isReliable, direction,
      };
    },
  ),

  /**
   * Previous is a computed property that nests all 'previous'-prefixed
   * properties, and aliases them to their unprefixed names
   * @returns {Object} previous
   */
  previous: computed(
    'previousSum',
    'previousCodingThreshold',
    'previousMarginOfError',
    'previousCorrelationCoefficient',
    'previousPercent',
    'previousPercentMarginOfError',
    'previousIsReliable',
    'previousDifferenceSum',
    'previousDifferenceMarginOfError',
    'previousSignificant',
    'previousDifferencePercent',
    'previousDifferencePercentMarginOfError',
    'previousPercentSignificant',
    'previousChangePercentSignificant',
    'previousChangePercentagePoint',
    'previousChangePercentagePointMarginOfError',
    'previousChangePercentagePointSignificant',
    function() {
      const {
        previousSum: sum,
        previousCodingThreshold: direction, // TODO: fix naming
        previousMarginOfError: moe,
        previousCorrelationCoefficient: correlationCoefficient,
        previousPercent: percent,
        previousPercentMarginOfError: percentMarginOfError,
        previousIsReliable: isReliable,
        previousDifferenceSum: differenceSum,
        previousDifferenceMarginOfError: differenceMarginOfError,
        previousSignificant: significant,
        previousDifferencePercent: differencePercent,
        previousDifferencePercentMarginOfError: differencePercentMarginOfError,
        previousPercentSignificant: percentSignificant,
        previousChangePercentSignificant: changePercentSignificant,
        previousChangePercentagePoint: changePercentagePoint,
        previousChangePercentagePointMarginOfError: changePercentagePointMarginOfError,
        previousChangePercentagePointSignificant: changePercentagePointSignificant,
      } = this.getProperties(
        'previousSum',
        'previousCodingThreshold',
        'previousMarginOfError',
        'previousCorrelationCoefficient',
        'previousPercent',
        'previousPercentMarginOfError',
        'previousIsReliable',
        'previousDifferenceSum',
        'previousDifferenceMarginOfError',
        'previousSignificant',
        'previousDifferencePercent',
        'previousDifferencePercentMarginOfError',
        'previousPercentSignificant',
        'previousChangePercentSignificant',
        'previousChangePercentagePoint',
        'previousChangePercentagePointMarginOfError',
        'previousChangePercentagePointSignificant',
      );

      return {
        sum,
        direction,
        moe,
        correlationCoefficient,
        percent,
        percentMarginOfError,
        isReliable,
        differenceSum,
        differenceMarginOfError,
        significant,
        differencePercent,
        differencePercentMarginOfError,
        percentSignificant,
        changePercentSignificant,
        changePercentagePoint,
        changePercentagePointMarginOfError,
        changePercentagePointSignificant,
      };
    }),

    previousComparison: computed(
      'previousComparisonSum',
      'previousComparisonCodingThreshold',
      'previousComparisonMarginOfError',
      'previousComparisonCorrelationCoefficient',
      'previousComparisonPercent',
      'previousComparisonPercentMarginOfError',
      'previousComparisonIsReliable',
      function(){
        const {
          previousComparisonSum: sum,
          previousComparisonCodingThreshold: direction,// TODO: fix namespace conflict
          previousComparisonMarginOfError: m,
          previousComparisonCorrelationCoefficient: correlationCoefficient,
          previousComparisonPercent: percent,
          previousComparisonPercentMarginOfError: percentMarginOfError,
          previousComparisonIsReliable: isReliable,
        } = this.getProperties(
          'previousComparisonSum',
          'previousComparisonCodingThreshold',
          'previousComparisonMarginOfError',
          'previousComparisonCorrelationCoefficient',
          'previousComparisonPercent',
          'previousComparisonPercentMarginOfError',
          'previousComparisonIsReliable',
        )

        return {
          sum,
          direction,
          m,
          correlationCoefficient,
          percent,
          percentMarginOfError,
          isReliable,
        }
      }
    ),

  /**
   * shouldHideDeltaPercent is a special exception to displaying the percentage change.
   * @returns {Boolean}
   */
  shouldHideDeltaPercent: computed('isSpecial', 'estimate', 'comparisonSum', function() {
    const { isSpecial, sum, comparisonSum } = this.getProperties('isSpecial', 'estimate', 'comparisonSum');
    return isSpecial || (sum + comparisonSum === 0);
  }),
});
