import Ember from 'ember';
import carto from 'ember-jane-maps/utils/carto';
import { nest } from 'd3-collection';
import generateReportSQL from '../queries/report';

const { isEmpty } = Ember;
const { service } = Ember.inject;

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
    const selectionSQL = generateReportSQL(geoids, comparator);

    return carto.SQL(selectionSQL, 'json', 'post')
      .then(data => nestReport(data));
  },
});
