import Ember from 'ember';
import fetch from 'fetch';
import Environment from '../config/environment';

const { service } = Ember.inject;
const { SupportServiceHost } = Environment;

const SELECTION_API_URL = id => `${SupportServiceHost}/selection/${id}`;

export default Ember.Route.extend({
  selection: service(),

  queryParams: {
    comparator: {
      refreshModel: true,
    },
  },

  model({ id }) {
    return fetch(SELECTION_API_URL(id))
      .then(response => response.json())
      .then(({ features }) => features);
  },

  afterModel(features) {
    const selection = this.get('selection');

    selection.set('current', { type: 'FeatureCollection', features });
  },
});
