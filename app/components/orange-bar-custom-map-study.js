import Component from '@ember/component';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import numeral from 'numeral';
import choroplethConfigs from '../choropleth-config';

export default Component.extend({
  selection: service(),
  router: service(),
  metrics: service(),

  lastreport: null,

  choroplethConfigs,

  selectionCount: alias('selection.selectedCount'),
  mode: 'direct-select',
  advanced: false,
  mapLayersMenu: false,

  choroplethMode: 'popperacre',

  summaryLevel: alias('selection.summaryLevel'),

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
    const { isPercent, stops: _stops, colors } = config;
    const stops = _stops.filter(stop => typeof stop === 'number')

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

  handleDrawButtonClick(type) {
    this.handleDrawButtonClick(type);
  },

  clearSelection() {
    this.get('selection').clearSelection();
  },

  transitionTo() {},


  setChoroplethMode(mode) {
    this.get('metrics').trackEvent('GoogleAnalytics', {
      eventCategory: 'Advanced Options',
      eventAction: 'Selected Choropleth',
      eventLabel: this.get('choroplethMode'),
    });
    this.set('choroplethMode', mode);
  },

  actions: {
    toggleAdvancedOptions() {
      this.get('metrics').trackEvent('GoogleAnalytics', {
        eventCategory: 'Advanced Options',
        eventAction: 'Toggle Advanced Options',
        eventLabel: this.get('advanced') ? 'Closed' : 'Opened',
      });

      this.set('advanced', !this.get('advanced'));
    },
    
    toggleMapLayersMenu() {
      this.get('metrics').trackEvent('GoogleAnalytics', {
        eventCategory: 'Advanced Options',
        eventAction: 'Toggle Map Layers Menu',
        eventLabel: this.get('mapLayersMenu') ? 'Closed' : 'Opened',
      });

      this.set('mapLayersMenu', !this.get('mapLayersMenu'));
    },
    addedFile(file) {
      this.addedFile(file)
    },
    removedFile() {
      this.removedFile()
    }
  },
});
