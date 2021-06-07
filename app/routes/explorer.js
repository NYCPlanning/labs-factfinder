import Route from '@ember/routing/route';
import Environment from '../config/environment';

const { SupportServiceHost } = Environment;

const SELECTION_API_URL = id => `${SupportServiceHost}/explorer/${id}`;

export default class ExplorerRoute extends Route {
  model({ id }) { // eslint-disable-line
    if (id) {
      return fetch(SELECTION_API_URL(id))
        .then(response => response.json());
    }

    return fetch(SELECTION_API_URL('nyc'));
  }
}
