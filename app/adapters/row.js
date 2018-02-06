import DS from 'ember-data';
import carto from '../utils/carto';
import generateProfileSQL from '../queries/profile';
import decennialProfile from '../queries/decennial-profile';
import Environment from '../config/environment';

const { SupportServiceHost } = Environment;

export default DS.JSONAPIAdapter.extend({
  query(store, modelType, query) {
    const { selectionId, comparator, type } = query;
    let URL;
    if (type === 'decennial') {
      URL = `${SupportServiceHost}/profile/${selectionId}/decennial`;
    } else {
      URL = `${SupportServiceHost}/profile/${selectionId}/${type}`;
    }

    return fetch(URL)
      .then(d => d.json());
  },

  keyForAttribute(key) {
    return key;
  },
});
