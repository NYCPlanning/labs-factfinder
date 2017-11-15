import Ember from 'ember';
import carto from 'ember-jane-maps/utils/carto';
import nestReport from '../../utils/nest-report';
import generateReportSQL from '../../queries/report';

const { service } = Ember.inject;

export default Ember.Route.extend({
  selection: service(),
  model({ comparator = '0' }) {
    const geoids = this.get('selection.current.features').mapBy('properties.geoid');
    const selectionSQL = generateReportSQL(geoids, comparator, 'demographic');

    return carto.SQL(selectionSQL, 'json', 'post')
      .then(data => nestReport(data));
  },
});
