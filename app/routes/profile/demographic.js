import Ember from 'ember';
import Downloadable from '../../mixins/downloadable';

const { service } = Ember.inject;

export default Ember.Route.extend(Downloadable, {
  selection: service(),

  model(params, { queryParams: { comparator = '0' } }) {
    const geoids = this.get('selection.current.features').mapBy('properties.geoid');

    return this.store.query('row', { geoids, comparator, type: 'demographic' });
  },
});
