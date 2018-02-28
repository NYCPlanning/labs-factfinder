import Ember from 'ember';
import { computed } from 'ember-decorators/object';
import { task } from 'ember-concurrency';
import fetch from 'fetch';
import numeral from 'numeral';
import Environment from '../config/environment';
import trackEvent from '../utils/track-event';


import choroplethConfigs from '../choropleth-config';

const { service } = Ember.inject;
const { alias } = Ember.computed;
const { SupportServiceHost } = Environment;

export default Ember.Component.extend({
  selection: service(),
  router: service(),
  metrics: service(),

  lastreport: null,

  choroplethConfigs,

  classNames: ['map-utility-box'],

  selectionCount: alias('selection.selectedCount'),
  mode: 'direct-select',
  advanced: false,

  choroplethMode: 'popperacre',

  summaryLevel: alias('selection.summaryLevel'),

  @computed('selection.selectedCount', 'generateProfileId.isIdle')
  profileButtonClasses(count, isIdle) {
    return (count > 0 && isIdle) ? 'button large expanded view-profile-button' : 'button large expanded disabled view-profile-button';
  },

  @computed('choroplethMode')
  choroplethPaintFill(mode) {
    return choroplethConfigs.find(d => d.id === mode).paintFill;
  },

  choroplethPaintLine(mode) {
    return choroplethConfigs.find(d => d.id === mode).paintLine;
  },

  @computed('choroplethMode')
  legendTitle(mode) {
    return choroplethConfigs.find(d => d.id === mode).legendTitle;
  },

  @computed('choroplethMode')
  stops(mode) {
    // return an array of objects, each with a display-ready range and color
    const config = choroplethConfigs.find(d => d.id === mode);
    const { isPercent, stops, colors } = config;

    const format = (value) => { // eslint-disable-line
      return isPercent ? `${value}%` : numeral(value).format('0,0');
    };


    return [
      {
        label: `${format(stops[3])} or more`,
        color: colors[4],
      },
      {
        label: `${format(stops[2])} - ${format(stops[3] - 1)}`,
        color: colors[3],
      },
      {
        label: `${format(stops[1])} - ${format(stops[2] - 1)}`,
        color: colors[2],
      },
      {
        label: `${format(stops[0])} - ${format(stops[1] - 1)}`,
        color: colors[1],
      },
      {
        label: isPercent ? `Less than ${format(stops[0])}` : `Under ${format(stops[0])}`,
        color: colors[0],
      },
    ];
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
      .transitionTo(transitionRoute, id, { queryParams: { mode: 'current', comparator: '0', reliability: false, charts: true } });
  }).restartable(),

  actions: {
    clearSelection() {
      this.get('selection').clearSelection();
    },
    handleDrawButtonClick(type) {
      const el = this.get('element').getElementsByClassName('draw-tool');
      this.sendAction('handleDrawButtonClick', type);
      this.$(el).blur();
    },
    handleDrawRadiusButtonClick() {
      this.sendAction('handleDrawRadiusButtonClick');
    },
    transitionTo() {},

    @trackEvent('Selection', 'Created Profile', 'summaryLevel', 'selection.current.features.length')
    generateProfileId() {
      const type = this.get('summaryLevel');
      const geoids = this.get('selection.current.features')
        .mapBy('properties.geoid');

      this.get('generateProfileId').perform(type, geoids);
    },

    @trackEvent('Advanced Options', 'Selected Choropleth', 'choroplethMode')
    setChoroplethMode(mode) {
      this.set('choroplethMode', mode);
    },

    toggleAdvancedOptions() {
      this.get('metrics').trackEvent('GoogleAnalytics', {
        eventCategory: 'Advanced Options',
        eventAction: 'Toggle Advanced Options',
        eventLabel: this.get('advanced') ? 'Closed' : 'Opened',
      });

      this.set('advanced', !this.get('advanced'));
    },
  },
});
