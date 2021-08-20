import DS from 'ember-data';
import fetch from 'fetch';

import Environment from '../config/environment';

const { SupportServiceHost } = Environment;

export default DS.JSONAPIAdapter.extend({
  query(store, modelType, query) {
    const { selectionId, comparator = 0 } = query;
    const URL = `${SupportServiceHost}/survey/decennial/${selectionId}?compare=${comparator}`;

    return fetch(URL)
      .then(d => d.json());
  },

  keyForAttribute(key) {
    return key;
  },
});
