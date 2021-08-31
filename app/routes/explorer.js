import Route from '@ember/routing/route';
import fetchExplorerModel from '../utils/fetch-explorer-model';
export default class ExplorerRoute extends Route {
  beforeModel() {
    this.store.unloadAll('row');
  }

  async model({ id = "0", compareTo }) {
    return fetchExplorerModel(this.store, id, compareTo);
  }
}
