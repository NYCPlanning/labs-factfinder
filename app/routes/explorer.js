import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import fetchExplorerModel from '../utils/fetch-explorer-model';
import { tracked } from '@glimmer/tracking';

export default class ExplorerRoute extends Route { 
  beforeModel() {
    this.store.unloadAll('row');
    sessionStorage.setItem('transitioningFromMapPage', true);
  }

  @tracked
  transitioningFromMapPage = sessionStorage.getItem('transitioningFromMapPage');

  async model({ compareTo }, {

    to: {
      params: {
        geotype,
        geoid
      }
    }
  }) { // eslint-disable-line
    return await fetchExplorerModel(this.store, geotype, geoid, compareTo);
  }

  @action
  loading(transition) {
    transition.promise.finally(()=> {
     sessionStorage.setItem('transitioningFromMapPage', true);
    });

    return true;
  }
}
