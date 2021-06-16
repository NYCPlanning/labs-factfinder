import Component from '@ember/component';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { task } from 'ember-concurrency';
import numeral from 'numeral';
import fetch from 'fetch';
import Environment from '../config/environment';
import choroplethConfigs from '../choropleth-config';

const { SupportServiceHost } = Environment;

export default Component.extend({
  selection: service(),
  router: service(),
  metrics: service(),

  lastreport: null,

  choroplethConfigs,

  selectionCount: alias('selection.selectedCount'),
  mode: 'direct-select',
  advanced: false,

  choroplethMode: 'popperacre',

  summaryLevel: alias('selection.summaryLevel'),

  profileButtonClasses: computed('selection.selectedCount', 'generateProfileTask.isIdle', function() {
    const { 'selection.selectedCount': count, 'generateProfileTask.isIdle': isIdle } = this.getProperties('selection.selectedCount', 'generateProfileTask.isIdle');

    return (count > 0 && isIdle) ? 'button large expanded view-profile-button' : 'button large expanded disabled view-profile-button';
  }),

  choroplethPaintFill: computed('choroplethMode', function() {
    const { choroplethMode: mode } = this.getProperties('choroplethMode');

    return choroplethConfigs.find(d => d.id === mode).paintFill;
  }),

  choroplethPaintLine(mode) {
    return choroplethConfigs.find(d => d.id === mode).paintLine;
  },

  legendTitle: computed('choroplethMode', function() {
    const { choroplethMode: mode } = this.getProperties('choroplethMode');

    return choroplethConfigs.find(d => d.id === mode).legendTitle;
  }),

  stops: computed('choroplethMode', function() {
    const { choroplethMode: mode } = this.getProperties('choroplethMode');

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
  }),

  generateProfileTask: task(function* (type, geoids) {
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
      .transitionTo(transitionRoute, id, {
        queryParams: {
          mode: 'current', comparator: '0', reliability: false, charts: true,
        },
      });
  }).restartable(),

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

  generateProfile() {
    this.get('metrics').trackEvent('GoogleAnalytics', {
      eventCategory: 'Selection',
      eventAction: 'Created Profile',
      eventLabel: this.get('summaryLevel'),
      eventValue: this.get('selection.current.features.length'),
    });
    const type = this.get('summaryLevel');
    const geoids = this.get('selection.current.features')
      .mapBy('properties.geoid');

    this.get('generateProfileTask').perform(type, geoids);
  },

  setChoroplethMode(mode) {
    this.get('metrics').trackEvent('GoogleAnalytics', {
      eventCategory: 'Advanced Options',
      eventAction: 'Selected Choropleth',
      eventLabel: this.get('choroplethMode'),
    });
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
});
