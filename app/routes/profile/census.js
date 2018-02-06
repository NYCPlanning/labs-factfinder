import Ember from 'ember';
import { task } from 'ember-concurrency';
import nestProfile from '../../utils/nest-profile';
import delegateAggregator from '../../utils/delegate-aggregator';

const { get, inject: { service } } = Ember;

export default Ember.Route.extend({
  selection: service(),

  beforeModel() {
    // unload to avoid the issue with duplicate ids.
    // there are duplicates because id is based arbitrarily on the array index.
    this.store.unloadAll();
  },

  model(params, { queryParams: { comparator = '0' } }) {
    return this.get('fetchDecennialData').perform(comparator)
  },

  afterModel(model, transition) {
    const { targetName } = transition;
    this._super(model, transition);
    this.controllerFor('profile').set('tab', targetName);
  },

  fetchDecennialData: task(function* (comparator) {
    const selectionId = this.modelFor('profile').id;
    const profileData = yield this.get('store')
      .query('row', { selectionId, type: 'decennial', comparator })
      .then(rows => rows.toArray());

    const nestedModel = nestProfile(profileData, 'year', 'variable');
    profileData.forEach((row) => {
      if (row.get('isSpecial')) {
        const rowConfig = row.get('rowConfig');
        const rowYear = row.get('year');
        const latestYear = get(nestedModel, rowYear);

        delegateAggregator(row, rowConfig, latestYear);
      }

      return row;
    });

    return nestedModel;
  }).enqueue().cancelOn('deactivate'),
});
