import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object'

export default class ApplicationController extends Controller {
  @service router;
  
  @action openExplorerURL() {
    const explorerURL = "/explorer/cities/NYC"
    let newURL;
    if (sessionStorage.length) {
      let queryParams = new URLSearchParams()

      for (let key in sessionStorage) {
        queryParams.append(key, sessionStorage[key])
      }

      newURL = explorerURL + '?' + queryParams.toString()
  
      this.transitionToRoute(newURL)
    }
    else this.transitionToRoute(explorerURL)
  }
}
