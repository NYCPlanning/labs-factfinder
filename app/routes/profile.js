import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import fetch from 'fetch';
import Environment from '../config/environment';

const { SupportServiceHost } = Environment;

const SELECTION_API_URL = id => `${SupportServiceHost}/selection/${id}`;

export default Route.extend({
  selection: service(),

  queryParams: {
    mode: {
      refreshModel: false,
      scope: 'controller',
    },
    comparator: {
      refreshModel: true,
      scope: 'controller',
    },
    reliability: {
      refreshModel: false,
      scope: 'controller',
    },
    charts: {
      refreshModel: false,
      scope: 'controller',
    },
  },

  model({ id }) {
    return fetch(SELECTION_API_URL(id))
      .then(response => response.json());
  },

  afterModel(data) {
    const { features, type } = data;
    const selection = this.get('selection');

    selection.set('summaryLevel', type);
    selection.set('current', { type: 'FeatureCollection', features });
  },
});
