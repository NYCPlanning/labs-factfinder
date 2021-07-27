import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { next } from '@ember/runloop';
import { hash } from 'rsvp';

/**
 * The Index Route is responsible for pulling down layer groups for the
 * summary level selection map, and binds them to the controller. It
 * also includes a handler for resizing mapbox-gl.
 *
 * See https://api.emberjs.com/ember/release/classes/Route
 */
export default Route.extend({
  /**
   * layerGroupService is provided by the ember-mapbox-composer addon,
   * and helps manage orchestration of the layer group models.
   */
  layerGroupService: service('layerGroups'),

  intl: service(),


  beforeModel() {
    this._super(...arguments);

    this.intl.setLocale(['en-us']);
  },

  /**
   * EmberJS Route model hook, which is responsible for fetching data. In this case,
   * it's used to query for layer groups.
   */
  async model() {
    const layerGroups = await this.store.query('layer-group', {
      'layer-groups': [
        { id: 'bk-qn-mh-boundary', visible: true, layers: [{ tooltipable: false }] },

        // Administrative Boundaries
        // { id: 'assembly-districts', visible: false },
        // { id: 'ny-senate-districts', visible: false },
        { id: 'boroughs', visible: false },
        { id: 'nyc-council-districts', visible: false },
        { id: 'nyc-pumas', visible: false },
        { id: 'community-districts', visible: false },
        { id: 'neighborhood-tabulation-areas', visible: false },

        // Census selection groups
        { id: 'factfinder--census-blocks', visible: false },
        { id: 'factfinder--census-tracts', visible: false },
        { id: 'factfinder--cdtas', visible: false },
        { id: 'factfinder--districts', visible: false },
        { id: 'factfinder--boroughs', visible: false },
        { id: 'factfinder--ntas', visible: false },
        { id: 'factfinder--pumas', visible: false },

        { id: 'subway', visible: false },
      ],
    });

    return hash({
      layerGroups,
    });
  },

  /**
   * EmberJS route hook, overridden. We use this to bind layerGroups to the controller
   * when the controller becomes available.
   */
  setupController(controller, model) {
    const { layerGroups } = model;

    // this is usually important for hoisting internal layer state into the query params
    this.get('layerGroupService').initializeObservers(layerGroups, controller);
    this._super(controller, model);
  },

  actions: {
    /**
     * EmberJS event hook. Used here for updating view state based on transitions,
     * as well as a hack to help with resizing the MapboxGL map.
     */
    didTransition() {
      const applicationController = this.controllerFor('application');
      applicationController.set('sidebarIsClosed', true);

      next(function() {
        /**
         * Hack to help the MapboxGL canvas resize properly when surrounding DOM
         * context is repositioned. not supported in IE 11
         */
        window.dispatchEvent(new Event('resize'));
      });
    },
  },
});
