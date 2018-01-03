import DS from 'ember-data';
import carto from '../utils/carto';
import generateProfileSQL from '../queries/profile';
import decennialProfile from '../queries/decennial-profile';

export default DS.JSONAPIAdapter.extend({
  query(store, modelType, query) {
    const { geoids, comparator, type, category } = query;
    let selectionSQL;

    if (type === 'decennial') {
      selectionSQL = decennialProfile(geoids, category);
    } else {
      selectionSQL = generateProfileSQL(geoids, comparator, type);
    }

    return carto.SQL(selectionSQL, 'json', 'post');
  },

  keyForAttribute(key) {
    return key;
  },
});
