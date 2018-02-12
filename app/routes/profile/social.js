import Ember from 'ember';
import Downloadable from '../../mixins/downloadable';

const { service } = Ember.inject;

export default Ember.Route.extend(Downloadable, {
  selection: service(),

  model(params, { queryParams: { comparator = '0' } }) {
    const selectionId = this.modelFor('profile').id;

    return this.store.query('row', { selectionId, comparator, type: 'social' })
      .then(rows => rows.toArray());
  },
});
