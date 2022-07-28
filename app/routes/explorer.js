import Route from '@ember/routing/route';
import fetchExplorerModel from '../utils/fetch-explorer-model';
import { inject as service } from '@ember/service';

export default class ExplorerRoute extends Route { 
  @service router;

  beforeModel() {
    this.store.unloadAll('row');
    if (sessionStorage.length) {
      let queryParams = {}
      let queryKeys = [
          'source',
          'censusTopics',
          'acsTopics',
          'compareTo',
          'showReliability',
        ];
        
        queryKeys.forEach((key) => {
            if(sessionStorage[key]) queryParams[key] = sessionStorage[key]
          })

      this.transitionTo({ queryParams })
    }
  }

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
}
