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

// This is the compliment of the `getGeotypeFromIdPrefix`
// function in the Factfinder API repo (utils/geotype-from-id-prefix.js)
function getIdPrefixFromGeotype(idPrefix) {
  switch (idPrefix) {
    case 'selection':
        return 'SID';
    case 'ntas':
        return'NTA' ;
    case 'tracts':
        return 'TRACT';
    case 'cdtas':
        return 'CDTA';
    case 'districts':
        return 'DIST';
    case 'blocks':
        return 'BLOCK';
    case 'boroughs':
        return 'BORO';
    default:
      return null;
  }
}

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
      _type: type,
      geoids,
    };

    const { id } = yield fetch(`${SupportServiceHost}/selection`, { // eslint-disable-line
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(postBody),
    })
      .then(d => d.json());

    yield this.get('router')
      .transitionTo('explorer', id);
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

    if (geoids.length > 1) {
      this.get('generateProfileTask').perform(type, geoids);
    } else if (geoids.length === 1){

      const factfinderId = `${getIdPrefixFromGeotype(type)}_${geoids[0]}`;

      this.get('router').transitionTo('explorer', factfinderId);
    } else {
      console.log("Warning: Cannot generate profile because selected geoids array is empty.")
    }
  },

  setChoroplethMode(mode) {
    this.get('metrics').trackEvent('GoogleAnalytics', {
      eventCategory: 'Advanced Options',
      eventAction: 'Selected Choropleth',
      eventLabel: this.get('choroplethMode'),
    });
    this.set('choroplethMode', mode);
  },

});
