import Ember from 'ember';
import carto from 'ember-jane-maps/utils/carto';
import { nest } from 'd3-collection';

const { isEmpty } = Ember;
const { service } = Ember.inject;

const preserveType = function(array) {
  return `'${array.join("','")}'`;
};

const generateSelectionSQL = function(geoids, comparator) {
  const ids = preserveType(geoids);

  return `
    WITH filtered_selection AS 
    ( 
      SELECT * 
      FROM   support_fact_finder 
      WHERE  geoid IN ( ${ids} ) ), base_numbers AS 
    ( 
       SELECT * 
       FROM   ( 
           SELECT   sum(e)    AS base_sum, 
                    max(base) AS base_join, 
                    max(year) AS base_year 
           FROM     ( 
                               SELECT     * 
                               FROM       filtered_selection 
                               INNER JOIN support_fact_finder_meta_update 
                               ON         support_fact_finder_meta_update.variablename = filtered_selection.variable ) window_sum
           WHERE    base = variable 
           GROUP BY variable, 
                    "year" ) percentage ) 
    SELECT *, 
      (((m / 1.645) / sum) * 100) as cv,
      (((comparison_m / 1.645) / comparison_sum) * 100) as comparison_cv,
      regexp_replace(lower(year), '[^A-Za-z0-9]', '_', 'g')     AS year, 
      regexp_replace(lower(profile), '[^A-Za-z0-9]', '_', 'g')  AS profile, 
      regexp_replace(lower(category), '[^A-Za-z0-9]', '_', 'g') AS category, 
      regexp_replace(lower(variable), '[^A-Za-z0-9]', '_', 'g') AS variable 
    FROM ( 
         SELECT   sum(e) filter (WHERE  geoid IN ( ${ids} )) AS sum, 
                  sqrt(sum(power(m, 2)) filter (WHERE geoid IN (${ids}))) AS m,
                  sum(e) filter (WHERE geoid IN ('${comparator}')) AS comparison_sum,
                  sqrt( sum( power(m, 2) ) filter (WHERE geoid IN ( '0' ) ) ) AS comparison_m,
                  year,
                  variable
         FROM     support_fact_finder  
         GROUP BY variable, 
                  year 
         ORDER BY variable DESC) aggregated 
    INNER JOIN      support_fact_finder_meta_update 
    ON              support_fact_finder_meta_update.variablename = aggregated.variable 
    LEFT OUTER JOIN base_numbers 
    ON              base = base_numbers.base_join 
    AND             year = base_numbers.base_year
  `;
};

const nestReport = function(data) {
  return nest()
    .key(d => d.profile)
    .key(d => d.year)
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
    const selectionSQL = generateSelectionSQL(geoids, comparator);

    return carto.SQL(selectionSQL, 'json', 'post')
      .then(data => nestReport(data));
  },
});
