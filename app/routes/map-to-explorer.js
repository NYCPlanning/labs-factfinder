import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';


export default class mapToExplorerRoute extends Route {
  @service store;

  @tracked
  transitioningFromMapPage = sessionStorage.getItem('transitioningFromMapPage');

  model() {
    return this.store.findAll('map-to-explorer');
  }

  @action
  loading(transition, explorer ) {
    let controller = this.controllerFor('explorer');
    controller.set('currentlyLoading', true);

    return true;
  }
}
