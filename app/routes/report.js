import Ember from 'ember';
import carto from 'ember-jane-maps/utils/carto';

const { isEmpty } = Ember;
const { service } = Ember.inject;

const preserveType = function(array) {
  return `'${array.join("','")}'`;
};

const generateSQL = function(ids) {
  const cleaned = preserveType(ids);
  return `SELECT 
            SUM(e), 
            SQRT(
              SUM(
                POWER(m, 2)
              )
            ) AS m,
            variable 
          FROM 
            support_fact_finder 
          WHERE geoid IN (${cleaned}) 
          GROUP BY variable`;
};

export default Ember.Route.extend({
  selection: service(),

  beforeModel() {
    const current = this.get('selection.current');

    if (isEmpty(current.features)) {
      this.transitionTo('index');
    }
  },

  model() {
    const geoids = this.get('selection.current.features').mapBy('properties.geoid');

    return carto.SQL(generateSQL(geoids));
  },
});
