import Ember from 'ember';
import carto from 'ember-jane-maps/utils/carto';
import { nest } from 'd3-collection';
import merge from 'lodash/merge';

const { isEmpty } = Ember;
const { service } = Ember.inject;

const preserveType = function(array) {
  return `'${array.join("','")}'`;
};

const aggregateGeos = function(ids) {
  const cleaned = preserveType(ids);

  return `SELECT 
            SUM(e), 
            SQRT(
              SUM(
                POWER(m, 2)
              )
            ) AS m,
            variable,
            variable || 'E' as variablename
          FROM 
            support_fact_finder 
          WHERE geoid IN (${cleaned}) 
          GROUP BY variable`;
};

const generateSelectionSQL = function(ids) {
  return `SELECT 
            regexp_replace(lower(variable), '[^A-Za-z0-9]', '_', 'g') as variable, 
            regexp_replace(lower(profile), '[^A-Za-z0-9]', '_', 'g') as profile,
            regexp_replace(lower(category), '[^A-Za-z0-9]', '_', 'g') as category,
            type,
            sum, 
            m
          FROM
            (${aggregateGeos(ids)}) support_fact_finder
          INNER JOIN support_fact_finder_meta 
          ON support_fact_finder_meta.variablename = support_fact_finder.variablename`;
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
    const comparisonSQL = ` SELECT 
                              e as comparison_sum, m as comparision_m 
                            FROM support_fact_finder 
                            WHERE geoid = '${comparator}'`;

    return carto.SQL(selectionSQL)
      .then(nestedData =>
        carto.SQL(comparisonSQL)
          .then(final => merge(final, nestedData)),
      )
      .then(data => nestReport(data));
  },
});
