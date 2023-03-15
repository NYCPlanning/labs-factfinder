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

  selectionSummaryData: alias('selection.current.selectionSummary.totals'),

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

  generateExplorerPageTask: task(function* (type, geoids, queryParams) {
    const postBody = {
      geotype: type,
      geoids,
    };

    const { id: selectionId } = yield fetch(`${SupportServiceHost}/selection`, { // eslint-disable-line
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(postBody),
    })
      .then(d => d.json());

    yield this.get('router')
      .transitionTo('explorer', 'selection', selectionId, { queryParams });
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

  generateExplorerPage() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'event' : 'see_more_data',
      'selection_geotype' : this.get('summaryLevel'),
      'selection_itemcount' : this.get('selection.current.features.length'),
    });

    this.get('metrics').trackEvent('GoogleAnalytics', {
      eventCategory: 'Selection',
      eventAction: 'Created Profile',
      eventLabel: this.get('summaryLevel'),
      eventValue: this.get('selection.current.features.length'),
    });
    const type = this.get('summaryLevel');
    const geoids = this.get('selection.current.features')
      .mapBy('properties.geoid');

    let queryParams = {}
    if (sessionStorage.length) {
      let queryKeys = [
          'source',
          'censusTopics',
          'acsTopics',
          'compareTo',
          'showReliability',
        ];

        queryKeys.forEach((key) => {
            if(sessionStorage[key]) queryParams[key] = sessionStorage[key]
          })
    }

    if (geoids.length > 1) {
      this.get('generateExplorerPageTask').perform(type, geoids, queryParams);
    } else if (geoids.length === 1){
      this.get('router').transitionTo('explorer', type, geoids[0], { queryParams });
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
