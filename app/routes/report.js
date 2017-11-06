import Ember from 'ember';
import carto from 'ember-jane-maps/utils/carto';
import { nest } from 'd3-collection';
import merge from 'lodash/merge';

const { isEmpty } = Ember;
const { service } = Ember.inject;

const preserveType = function(array) {
  return `'${array.join("','")}'`;
};

// const aggregateGeos = function(ids, year = 'Y2011-2015') {
//   const cleaned = preserveType(ids);

//   return `
//     SELECT
//       SUM(e),
//       SQRT(
//         SUM(
//           POWER(m, 2)
//         )
//       ) AS m,
//       variable
//     FROM
//       support_fact_finder
//     WHERE geoid IN (${cleaned})
//       AND year = '${year}'
//     GROUP BY variable`;
// };

// const generateSelectionSQL = function(...args) {
//   const [ids] = args;
//   const cleaned = preserveType(ids);

//   return `
//     SELECT
      // regexp_replace(lower(support_fact_finder.variable), '[^A-Za-z0-9]', '_', 'g') as variable,
      // regexp_replace(lower(support_fact_finder.profile), '[^A-Za-z0-9]', '_', 'g') as profile,
      // regexp_replace(lower(support_fact_finder.category), '[^A-Za-z0-9]', '_', 'g') as category,
//       sum,
//       support_fact_finder.base,
//       base_sum,
//       m
//     FROM
//       ( 
//         SELECT * FROM (
//           ${aggregateGeos(...args)}
//         ) aggregated
//         INNER JOIN support_fact_finder_meta_update
//         ON support_fact_finder_meta_update.variablename = aggregated.variable
//       ) support_fact_finder
//     INNER JOIN support_fact_finder_meta_update
//     ON support_fact_finder_meta_update.variablename = support_fact_finder.variable
//     LEFT OUTER JOIN (
//       SELECT * FROM (
//         SELECT sum(e) as base_sum, variable 
//         FROM (
//           SELECT *
//           FROM support_fact_finder
//           INNER JOIN support_fact_finder_meta_update
//           ON support_fact_finder_meta_update.variablename = support_fact_finder.variable
//           WHERE geoid IN (${cleaned})
//             AND year = 'Y2011-2015'
//         ) window_sum
//         WHERE base = variable
//         GROUP BY variable
//       ) percentage
//       INNER JOIN support_fact_finder_meta_update
//       ON support_fact_finder_meta_update.variablename = percentage.variable
//     ) enriched_percentage
//     ON support_fact_finder.base = enriched_percentage.base
//   `;
// };

const generateSelectionSQL = function(geoids) {
  const ids = preserveType(geoids);

  return `
    SELECT *,
      regexp_replace(lower(variable), '[^A-Za-z0-9]', '_', 'g') as variable,
      regexp_replace(lower(profile), '[^A-Za-z0-9]', '_', 'g') as profile,
      regexp_replace(lower(category), '[^A-Za-z0-9]', '_', 'g') as category
    FROM (
      SELECT   Sum(e) filter (WHERE geoid IN ( ${ids} ) ) AS sum, 
               variable, 
               sqrt( sum( power(m, 2) ) filter (WHERE geoid IN ( ${ids} ) ) )AS m, 
               sum(e) filter (WHERE geoid IN ('0'))                          AS comparison_sum, 
               sqrt( sum( power(m, 2) ) filter (WHERE geoid IN ( '0' ) ) )AS comparison_m, 
               year 
      FROM     support_fact_finder 
      GROUP BY variable, 
               year ) aggregated
    INNER JOIN support_fact_finder_meta_update
    ON support_fact_finder_meta_update.variablename = aggregated.variable
  `;
};

const nestReport = function(data) {
  return nest()
    .key(d => d.profile)
    .key(d => d.category)
    .key(d => d.variable)
    .rollup(d => d[0])
    .object(data);
};

export default Ember.Route.extend({
  selection: service(),

  beforeModel() {
    const current = this.get('selection.current');

    if (isEmpty(current.features)) {
      this.transitionTo('index');
    }
  },

  queryParams: {
    comparator: {
      refreshModel: true,
    },
  },

  model({ comparator = '0' }) {
    const geoids = this.get('selection.current.features').mapBy('properties.geoid');
    const selectionSQL = generateSelectionSQL(geoids);
    // const historicalSQL = generateSelectionSQL(geoids, 'Y2006-2010');
    // const longitudinalSQL = generateSelectionSQL(selectionSQL, historicalSQL, geoids);
    // const geographicComparisonSQL = ` SELECT
    //                           e as comparison_sum, m as comparision_m
    //                         FROM support_fact_finder
    //                         WHERE geoid = '${comparator}'`;

    return carto.SQL(selectionSQL, 'json', 'post')
      // .then(nestedData =>
      //   carto.SQL(geographicComparisonSQL, 'json', 'post')
      //     .then(final => merge(final, nestedData)),
      // )
      .then(data => nestReport(data));
  },
});
