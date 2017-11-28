import Ember from 'ember';
import carto from 'ember-jane-maps/utils/carto';
import Downloadable from '../../mixins/downloadable';
import generateProfileSQL from '../../queries/profile';

const { service } = Ember.inject;

export default Ember.Route.extend(Downloadable, {
  selection: service(),

  model({ comparator = '0' }) {
    const geoids = this.get('selection.current.features').mapBy('properties.geoid');
    const selectionSQL = generateProfileSQL(geoids, comparator, 'economic');

    return carto.SQL(selectionSQL, 'json', 'post');
  },
});
