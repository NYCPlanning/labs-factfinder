import Route from '@ember/routing/route';
import fetchExplorerModel from '../utils/fetch-explorer-model';
import { inject as service } from '@ember/service';

export default class ExplorerRoute extends Route { 
  @service router;

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
