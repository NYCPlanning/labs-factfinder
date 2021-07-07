import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

import Environment from '../config/environment';
import nestProfile from '../utils/nest-profile';
import GEO_OPTIONS_QUERY from '../queries/geography-options';
import { nest } from 'd3-collection';
import carto from '../utils/carto';

const { SupportServiceHost } = Environment;

const SELECTION_API_URL = id => `${SupportServiceHost}/selection/${id}`;

export default class ExplorerRoute extends Route {
  @service
  selection;

  beforeModel() {
    this.store.unloadAll('row');
  }

  async model({ id }) { // eslint-disable-line
    let selectionResponse = null;
    let profileResponse = null;
    let selectionId = id || "0"; // "0" maps to 'nyc'

    selectionResponse = await fetch(SELECTION_API_URL(id));
    selectionResponse = await selectionResponse.json();

    profileResponse = await this.store.query('row', { selectionId, comparator: '0' });
    profileResponse = profileResponse.toArray();

    const nestedProfileModel = nestProfile(profileResponse, 'variable');

    return {
      selection: selectionResponse,
      profile: nestedProfileModel,
    };
  }

  async setupController(controller, model, transition) {
    super.setupController(controller, model);

    // console.log("transition: ", transition)
    // console.log("transition.to.routeInfo: ", transition.to.routeInfo)
    // const { to: {
    //   routeInfo: {
    //     id
    //   }
    // }} = transition;

    controller.geoOptions = await carto.SQL(GEO_OPTIONS_QUERY);

    controller.selectedGeo = controller.geoOptions.findBy('geoid', "0");
  }
}
