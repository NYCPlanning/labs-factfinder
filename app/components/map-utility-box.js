import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import { task } from 'ember-concurrency';
import fetch from 'fetch';
import Environment from '../config/environment';

import choroplethConfigs from '../choropleth-config';

const { service } = Ember.inject;
const { alias } = Ember.computed;
const { SupportServiceHost } = Environment;

export default Ember.Component.extend({
  selection: service(),
  router: service(),
  lastreport: null,

  choroplethConfigs,

  classNames: ['map-utility-box'],

  selectionCount: alias('selection.selectedCount'),
  mode: 'direct-select',
  advanced: false,

  choroplethMode: 'poverty',

  summaryLevel: alias('selection.summaryLevel'),

  @computed('selection.selectedCount', 'generateProfileId.isIdle')
  profileButtonClasses(count, isIdle) {
    return (count > 0 && isIdle) ? 'button large expanded view-profile-button' : 'button large expanded disabled view-profile-button';
  },

  @computed('choroplethMode')
  choroplethPaint(mode) {
    return choroplethConfigs.find(d => d.id === mode).paint;
  },

  generateProfileId: task(function* (type, geoids) {
    const postBody = {
      type,
      geoids,
    };

    const { id } = yield fetch(`${SupportServiceHost}/selection`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(postBody),
    })
      .then(d => d.json());

    const lastreport = this.get('lastreport');
    const blocks = this.get('selection.summaryLevel') === 'blocks';
    const transitionRoute = blocks ? 'profile.census' : `profile.${lastreport}`;

    yield this.get('router')
      .transitionTo(transitionRoute, id, { queryParams: { mode: 'current', comparator: '0' } });
  }).restartable(),

  actions: {
    clearSelection() {
      this.get('selection').clearSelection();
    },
    handleDrawButtonClick() {
      this.sendAction('handleDrawButtonClick');
    },
    transitionTo() {},
    generateProfileId() {
      const type = this.get('summaryLevel');
      const geoids = this.get('selection.current.features')
        .mapBy('properties.geoid');

      this.get('generateProfileId').perform(type, geoids);
    },

    setChoroplethMode(mode) {
      this.set('choroplethMode', mode);
    },
  },
});
