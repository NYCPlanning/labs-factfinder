import Route from '@ember/routing/route';

import Environment from '../config/environment';
import nestProfile from '../utils/nest-profile';

const { SupportServiceHost } = Environment;

const SELECTION_API_URL = id => `${SupportServiceHost}/selection/${id}`;

const COMPARISON_GEO_OPTIONS_URL = `${SupportServiceHost}/geo-options`;

export default class ExplorerRoute extends Route {
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

    let comparisonGeoOptions = await fetch(COMPARISON_GEO_OPTIONS_URL);
    comparisonGeoOptions = await comparisonGeoOptions.json();

    return {
      selectionOrGeoid: id,
      selection: selectionResponse,
      profile: nestedProfileModel,
      comparisonGeoOptions
    };
  }
}
