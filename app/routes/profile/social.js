import Ember from 'ember';
import carto from '../../utils/carto';
import Downloadable from '../../mixins/downloadable';
import generateProfileSQL from '../../queries/profile';

const { service } = Ember.inject;

export default Ember.Route.extend(Downloadable, {
  selection: service(),

  model({ comparator = '0' }) {
    const geoids = this.get('selection.current.features').mapBy('properties.geoid');
    const selectionSQL = generateProfileSQL(geoids, comparator, 'social');

    return carto.SQL(selectionSQL, 'json', 'post');
  },
});
