import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import fetch from 'fetch';
import Environment from '../config/environment';

const { SupportServiceHost } = Environment;

const SELECTION_API_URL = id => `${SupportServiceHost}/selection/${id}`;

/**
 * The Profile Route is responsible for fetching information for a given selection ID.
 * It also defines query parameters for the controller, which are used to manage
 * the state of the profile view.
 * The selection Service is injected to store references to the currently found selection,
 * when it comes back from the server.
 */
export default Route.extend({
  /**
   * Selection Service is injected, giving access to the state of the "current selection".
   */
  selection: service(),

  /**
   * EmberJS query parameter configuration object. These are defined here
   * to manage the ephemeral state of the profile view.
   */
  queryParams: {
    mode: {
      refreshModel: false,
      scope: 'controller',
    },
    comparator: {
      refreshModel: true,
      scope: 'controller',
    },
    reliability: {
      refreshModel: false,
      scope: 'controller',
    },
    charts: {
      refreshModel: false,
      scope: 'controller',
    },
  },

  /**
   * EmberJS Route model hook, used here to fetch selection information for a given selection ID.
   */
  model({ id }) {
    return fetch(SELECTION_API_URL(id))
      .then(response => response.json());
  },

  /**
   * EmberJS Route afterModel hook, triggered after the model is fully loaded in memory.
   * Here, it's used to update the Selection Service about the current selection.
   */
  afterModel(data) {
    const { features, type } = data;
    const selection = this.get('selection');

    selection.set('summaryLevel', type);
    selection.set('current', { type: 'FeatureCollection', features });
  },
});
