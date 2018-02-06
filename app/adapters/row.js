import DS from 'ember-data';
import carto from '../utils/carto';
import generateProfileSQL from '../queries/profile';
import decennialProfile from '../queries/decennial-profile';
import Environment from '../config/environment';

const { SupportServiceHost } = Environment;

export default DS.JSONAPIAdapter.extend({
  query(store, modelType, query) {
    const { selectionId, comparator, type } = query;
    // let selectionSQL;
    // if (type === 'decennial') {
    //   selectionSQL = decennialProfile(geoids, category, comparator);
    // } else {
    //   selectionSQL = generateProfileSQL(geoids, comparator, type);
    // }

    const URL = `${SupportServiceHost}/profile/${selectionId}/decennial`;

    return fetch(URL)
      .then(d => d.json());
  },

  keyForAttribute(key) {
    return key;
  },
});
