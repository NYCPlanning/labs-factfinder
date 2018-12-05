import Route from '@ember/routing/route';
import { service } from '@ember-decorators/service';
import { action } from '@ember-decorators/object'; // eslint-disable-line
import { next } from '@ember/runloop';
import { hash } from 'rsvp';

export default class IndexRoute extends Route {
  @service('layerGroups') layerGroupService

  async model() {
    // const filter = ['any', ['==', true, true]];

    const layerGroups = await this.store.query('layer-group', {
      'layer-groups': [
        { id: 'neighborhood-tabulation-areas', visible: false },
        { id: 'subway', visible: false },
        { id: 'nyc-council-districts', visible: false },
        { id: 'community-districts', visible: false },
        // { id: 'boroughs', visible: false },
        // { id: 'borough-boundaries', visible: true }, --Use Citymap?
        // {{ id: 'nycPumas', visible: false }},
      ],
    });

    return hash({
      layerGroups,
    });
  }

  setupController(controller, model) {
    const { layerGroups } = model;

    this.get('layerGroupService').initializeObservers(layerGroups, controller);

    super.setupController(controller, model);
  }

  @action
  didTransition() {
    const applicationController = this.controllerFor('application');
    applicationController.set('sidebarIsClosed', true);

    next(function() {
      // not supported in IE 11
      window.dispatchEvent(new Event('resize'));
    });
  }
}
