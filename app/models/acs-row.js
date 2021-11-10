import DS from 'ember-data';
import { computed } from '@ember/object';

/**
 * The Row model represents a row in the results of getting
 * all ACS data for a given geography selection.
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
   * e.g. sexAndAge (as part of data profile "demographic"), placeOfBirth (as part of data profile "social")
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

  isReliable: DS.attr('boolean'),

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

  previousIsReliable: DS.attr('boolean'),

  // previous comparison
  previousComparisonSum: DS.attr('number'),

  previousComparisonCodingThreshold: DS.attr('string'),

  previousComparisonMarginOfError: DS.attr('number'),

  previousComparisonCorrelationCoefficient: DS.attr('number'),

  previousComparisonPercent: DS.attr('number'),

  previousComparisonPercentMarginOfError: DS.attr('number'),

  previousComparisonIsReliable: DS.attr('boolean'),

  // previous difference
  previousDifferenceSum: DS.attr('number'),

  previousDifferenceMarginOfError: DS.attr('number'),

  previousDifferenceIsReliable: DS.attr('boolean'),

  previousDifferencePercent: DS.attr('number'),

  previousDifferencePercentMarginOfError: DS.attr('number'),

  previousDifferencePercentIsReliable:  DS.attr('boolean'),

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


  changeIsReliable: DS.attr('boolean'),

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

  changePercentIsReliable: DS.attr('boolean'),

  /**
   * changePercentagePoint is the percentage point change as opposed to percent change
   */
  changePercentagePoint: DS.attr('number'),

  /**
   * changePercentagePointMarginOfError is the margin of error in the percent point calculation
   */
  changePercentagePointMarginOfError: DS.attr('number'),

  changePercentagePointIsReliable: DS.attr('boolean'),

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

  comparisonIsReliable: DS.attr('boolean'),

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

  differenceIsReliable: DS.attr('boolean'),

  /**
   * See "percent"
   */
  differencePercent: DS.attr('number'),

  /**
   * See "percentMarginOfError"
   */
  differencePercentMarginOfError: DS.attr('number'),

  differencePercentIsReliable: DS.attr('boolean'),
  /* =====  End of DIFFERENCE_  ====== */

  /**
   * Selection is a computed property for convenience of grouping
   * all un-prefix selection-specific aggregate values.
   * @returns {Object} selection
   */
  selection: computed(
    'sum',
    'marginOfError',
    'correlationCoefficient',
    'percent',
    'percentMarginOfError',
    'isReliable',
    'codingThreshold',
    function() {
      const {
        sum,
        marginOfError,
        correlationCoefficient,
        percent,
        percentMarginOfError,
        isReliable,
        codingThreshold: direction,
      } = this.getProperties(
        'sum',
        'marginOfError',
        'correlationCoefficient',
        'percent',
        'percentMarginOfError',
        'isReliable',
        'codingThreshold',
      );

      return {
        sum, marginOfError, correlationCoefficient, percent, percentMarginOfError, isReliable, direction,
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
        comparisonMarginOfError: marginOfError,
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
        sum, marginOfError, correlationCoefficient, percent, percentMarginOfError, isReliable, direction,
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
    'previousDifferenceIsReliable',
    'previousDifferencePercent',
    'previousDifferencePercentMarginOfError',
    'previousDifferencePercentIsReliable',
    'previousChangePercentIsReliable',
    'previousChangePercentagePoint',
    'previousChangePercentagePointMarginOfError',
    'previousChangePercentagePointIsReliable',
    function() {
      const {
        previousSum: sum,
        previousCodingThreshold: direction, // TODO: fix naming
        previousMarginOfError: marginOfError,
        previousCorrelationCoefficient: correlationCoefficient,
        previousPercent: percent,
        previousPercentMarginOfError: percentMarginOfError,
        previousIsReliable: isReliable,
        previousDifferenceSum: differenceSum,
        previousDifferenceMarginOfError: differenceMarginOfError,
        previousDifferenceIsReliable: differenceIsReliable,
        previousDifferencePercent: differencePercent,
        previousDifferencePercentMarginOfError: differencePercentMarginOfError,
        previousDifferencePercentIsReliable: differencePercentIsReliable,
        previousChangePercentIsReliable: changePercentIsReliable,
        previousChangePercentagePoint: changePercentagePoint,
        previousChangePercentagePointMarginOfError: changePercentagePointMarginOfError,
        previousChangePercentagePointIsReliable: changePercentagePointIsReliable,
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
        'previousDifferenceIsReliable',
        'previousDifferencePercent',
        'previousDifferencePercentMarginOfError',
        'previousDifferencePercentIsReliable',
        'previousChangePercentIsReliable',
        'previousChangePercentagePoint',
        'previousChangePercentagePointMarginOfError',
        'previousChangePercentagePointIsReliable',
      );

      return {
        sum,
        direction,
        marginOfError,
        correlationCoefficient,
        percent,
        percentMarginOfError,
        isReliable,
        differenceSum,
        differenceMarginOfError,
        differenceIsReliable,
        differencePercent,
        differencePercentMarginOfError,
        differencePercentIsReliable,
        changePercentIsReliable,
        changePercentagePoint,
        changePercentagePointMarginOfError,
        changePercentagePointIsReliable,
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
          previousComparisonMarginOfError: marginOfError,
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
          marginOfError,
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
  shouldHideDeltaPercent: computed('isSpecial', 'sum', 'comparisonSum', function() {
    const { isSpecial, sum, comparisonSum } = this.getProperties('isSpecial', 'sum', 'comparisonSum');
    return isSpecial || (sum + comparisonSum === 0);
  }),
});
