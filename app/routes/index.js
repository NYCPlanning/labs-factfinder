import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { next } from '@ember/runloop';
import { hash } from 'rsvp';

export default Route.extend({
  layerGroupService: service('layerGroups'),

  async model() {
    const layerGroups = await this.store.query('layer-group', {
      'layer-groups': [
        { id: 'subway', visible: false },
        { id: 'nyc-council-districts', visible: false },
        { id: 'community-districts', visible: false },
        { id: 'boroughs', visible: false },
        { id: 'bk-qn-mh-boundary', visible: true, layers: [{ tooltipable: false }] },

        // Census selection groups
        { id: 'nyc-pumas', visible: false, layers: [{}, {}, {}, { clickable: true }] },
        { id: 'neighborhood-tabulation-areas', visible: false, layers: [{}, {}, {}, { clickable: true }] },
        { id: 'census-tracts', visible: true, layers: [{ clickable: true }] },
        { id: 'census-blocks', visible: false, layers: [{ clickable: true }] },
      ],
    });

    return hash({
      layerGroups,
    });
  },

  setupController(controller, model) {
    const { layerGroups } = model;
    this.get('layerGroupService').initializeObservers(layerGroups, controller);
    this._super(controller, model);
  },

  actions: {
    didTransition() {
      const applicationController = this.controllerFor('application');
      applicationController.set('sidebarIsClosed', true);

      next(function() {
        // not supported in IE 11
        window.dispatchEvent(new Event('resize'));
      });
    },
  },

});
