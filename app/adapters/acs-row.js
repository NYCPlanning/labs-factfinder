import DS from 'ember-data';
import fetch from 'fetch';

import Environment from '../config/environment';

const { SupportServiceHost } = Environment;

export default DS.JSONAPIAdapter.extend({
  query(store, modelType, query) {
    const { geotype = 'cities', geoid = 'NYC', compareTo = 0 } = query;

    const URL = `${SupportServiceHost}/survey/acs/${geotype}/${geoid}?compareTo=${compareTo}`;

    return fetch(URL)
      .then(d => d.json());
  },

  keyForAttribute(key) {
    return key;
  },
});
