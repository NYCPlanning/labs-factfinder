import Route from '@ember/routing/route';
import { task } from 'ember-concurrency';
import Downloadable from './_downloadable';

/**
 * The Census Route is responsible for fetching the raw profile data for "census" data.
 * NOTE: this route extends the Downloadable mixin, which reshapes the profile data
 * that's returned from the server. See "mixins/downloadable.js"
 *
 * See https://api.emberjs.com/ember/release/classes/Route
 */
export default Downloadable.extend({
  /**
   * EmberJS Route beforeModel hook.
   * Here this is used to unload the store to avoid the issue with duplicate ids.
   * TODO: There are duplicates because id is based arbitrarily on the array index.
   */
  beforeModel() {
    this.store.unloadAll('row');
  },

  /**
   * EmberJS Route model hook, used here to fetch actual profile data from the
   * API endpoint.
   * @param {object} params - EmberJS object
   * @param {object} transition - EmberJS object
   * @param {object} transition.queryParams - EmberJS object
   * @param {string} transition.queryParams.comparator - ID used for the profile's comparison geography
   */
  model(params, { to: { queryParams: { comparator = '0' } } }) {
    return this.get('fetchDecennialData').perform(comparator);
  },

  /**
   * EmberJS Route model hook, used here to update the profile view's tab state
   */
  afterModel(model, transition) {
    const { targetName } = transition;
    this._super(model, transition);
    this.controllerFor('profile').set('tab', targetName);
  },

  /**
   * fetchDecennialData is a special task function, see ember-concurrency documentation.
   * This task fetches all the decennial data with a "comparator" param.
   *
   * @param {string} comparator - ID of geography used to compare against user selection
   */
  fetchDecennialData: task(function* (comparator) {
    const selectionId = this.modelFor('profile').id;
    const profileData = yield this.get('store')
      .query('row', { selectionId, type: 'decennial', comparator })
      .then(rows => rows.toArray());

    return profileData;
  }).enqueue().cancelOn('deactivate'),
});
