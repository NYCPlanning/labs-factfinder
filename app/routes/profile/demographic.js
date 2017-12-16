import Ember from 'ember';
import carto from '../../utils/carto';
import generateProfileSQL from '../../queries/profile';
import Downloadable from '../../mixins/downloadable';

const { service } = Ember.inject;

export default Ember.Route.extend(Downloadable, {
  selection: service(),

  model(params, { queryParams: { comparator = '0' } }) {
    const geoids = this.get('selection.current.features').mapBy('properties.geoid');
    const selectionSQL = generateProfileSQL(geoids, comparator, 'demographic');

    return carto.SQL(selectionSQL, 'json', 'post');
  },
});
