import Ember from 'ember';
import carto from 'ember-jane-maps/utils/carto';
import Downloadable from '../../mixins/downloadable';
import generateReportSQL from '../../queries/report';

const { service } = Ember.inject;

export default Ember.Route.extend(Downloadable, {
  selection: service(),

  model({ comparator = '0' }) {
    const geoids = this.get('selection.current.features').mapBy('properties.geoid');
    const selectionSQL = generateReportSQL(geoids, comparator, 'social');

    return carto.SQL(selectionSQL, 'json', 'post');
  },
});
