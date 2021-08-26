import DS from 'ember-data';
import fetch from 'fetch';

import Environment from '../config/environment';

const { SupportServiceHost } = Environment;

export default DS.JSONAPIAdapter.extend({
  query(store, modelType, query) {
    const { selectionId, compareTo = 0 } = query;
    const URL = `${SupportServiceHost}/profile/${selectionId}?compareTo=${compareTo}`;

    return fetch(URL)
      .then(d => d.json());
  },

  keyForAttribute(key) {
    return key;
  },
});
