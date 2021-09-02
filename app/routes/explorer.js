import Route from '@ember/routing/route';
import fetchExplorerModel from '../utils/fetch-explorer-model';

export default class ExplorerRoute extends Route {
  beforeModel() {
    this.store.unloadAll('row');
  }

  async model({ compareTo }, {
    to: {
      params: {
        geotype,
        geoid
      }
    }
  }) { // eslint-disable-line
    const newModel = await fetchExplorerModel(this.store, geotype, geoid, compareTo);

    return newModel;
  }
}
