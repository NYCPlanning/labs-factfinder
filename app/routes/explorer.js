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

  async model({ id, compareTo }) { // eslint-disable-line
    let selectionResponse = null;
    let acsSurveyResponse = null;
    let censusSurveyResponse = null;
    let selectionId = id || "0"; // "0" maps to 'nyc'

    selectionResponse = await fetch(SELECTION_API_URL(id));
    selectionResponse = await selectionResponse.json();

    acsSurveyResponse = await this.store.query('acsRow', { selectionId, comparator: '0' });
    acsSurveyResponse = acsSurveyResponse.toArray();

    censusSurveyResponse = await this.store.query('censusRow', { selectionId, comparator: '0' });
    censusSurveyResponse = censusSurveyResponse.toArray();

    const nestedACSModel = nestProfile(acsSurveyResponse, 'variable');
    const nestedCensusModel = nestProfile(censusSurveyResponse, 'variable');

    let comparisonGeoOptions = await fetch(COMPARISON_GEO_OPTIONS_URL);
    comparisonGeoOptions = await comparisonGeoOptions.json();

    return {
      selectionOrGeoid: id,
      selection: selectionResponse,
      acs: nestedACSModel,
      census: nestedCensusModel,
      comparisonGeoOptions
    };
  }
}
