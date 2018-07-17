import DS from 'ember-data';

import Environment from '../config/environment';

const { SupportServiceHost } = Environment;

export default DS.JSONAPIAdapter.extend({
  query(store, modelType, query) {
    const { selectionId, comparator = 0, type } = query;
    let URL;
    if (type === 'decennial') {
      URL = `${SupportServiceHost}/profile/${selectionId}/decennial?compare=${comparator}`;
    } else {
      URL = `${SupportServiceHost}/profile/${selectionId}/${type}?compare=${comparator}`;
    }

    return fetch(URL)
      .then(d => d.json());
  },

  keyForAttribute(key) {
    return key;
  },
});
