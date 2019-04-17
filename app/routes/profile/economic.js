import Route from '@ember/routing/route';
import Downloadable from '../../mixins/downloadable';

/**
 * The Economic Route is responsible for fetching the raw profile data for "economic" data.
 * NOTE: this route extends the Downloadable mixin, which reshapes the profile data
 * that's returned from the server. See "mixins/downloadable.js"
 *
 * See https://api.emberjs.com/ember/release/classes/Route
 */
export default Route.extend(Downloadable, {
  /**
   * EmberJS Route model hook, used here to fetch actual profile data from the
   * API endpoint.
   * @param {object} params - EmberJS object
   * @param {object} transition - EmberJS object
   * @param {object} transition.queryParams - EmberJS object
   * @param {string} transition.queryParams.comparator - ID used for the profile's comparison geography
   */
  model(params, { queryParams: { comparator = '0' } }) {
    const selectionId = this.modelFor('profile').id;

    return this.store.query('row', { selectionId, comparator, type: 'economic' })
      .then(rows => rows.toArray());
  },
});
