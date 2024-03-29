import Component from '@ember/component';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import numeral from 'numeral';
import choroplethConfigs from '../choropleth-config';

export default Component.extend({
  tagName: "div",
  classNames: ['top-bar map-toolbar'],
  selection: service(),
  router: service(),
  metrics: service(),
  didInsertElement: function() {
    this.$().foundation();
  },

  lastreport: null,

  choroplethConfigs,

  selectionCount: alias('selection.selectedCount'),
  mode: 'direct-select',
  advanced: false,

  choroplethMode: 'popacre',

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

  insignificantLegendLabel: computed('choroplethMode', function() {
    const mode = this.get('choroplethMode');
    const config = choroplethConfigs.find(d => d.id === mode);
    return (config && typeof config.insignificantLegendLabel !== 'undefined')
      ? config.insignificantLegendLabel
      : false
  }),

  stops: computed('choroplethMode', function() {
    const { choroplethMode: mode } = this.getProperties('choroplethMode');

    // return an array of objects, each with a display-ready range and color
    const config = choroplethConfigs.find(d => d.id === mode);
    const { isPercent, isChange, stops: _stops, colors } = config;
    const stops = _stops.filter(stop => typeof stop === 'number')

    const format = (value) => { // eslint-disable-line
      return isPercent ? `${value}%` : numeral(value).format('0,0');
    };

    const buildBottomLabel = (stop) => {
      if (isChange)  {
        return `Loss of ${format(Math.abs(stop))} or more`
      } else if (isPercent) {
        return `Less than ${format(stop)}`
      }
      return `Under ${format(stop)}`
    }

    const labels = []
    stops.forEach((stop, i) => {
      const isPositive = (stops[i] > 0) ? true : false
      if (i === 0) {
        labels.push({
          label: buildBottomLabel(stop),
          color: colors[0],
        })
      } else {
        labels.push(isPositive
          ? {
            label: `${format(stops[i-1])} - ${format(stop - 1)}`,
            color: colors[i],
          }
          : {
            label: `${format(stops[i-1] + 1)} - ${format(stop)}`,
            color: colors[i],
          }
        )
      }
    })
    labels.push({
      label: `${format(stops[stops.length-1])} or more`,
      color: colors[colors.length-1],
    })

    return labels.reverse()
  }),

  handleDrawButtonClick(type) {
    this.handleDrawButtonClick(type);
  },

  clearSelection() {
    this.get('selection').clearSelection();
  },

  transitionTo() {},


  setChoroplethMode(mode) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'event' : 'set_choropleth',
      'choropleth_group' : choroplethConfigs.find(d => d.id === mode).group,
      'choropleth_label' : choroplethConfigs.find(d => d.id === mode).label,
    });
    this.get('metrics').trackEvent('GoogleAnalytics', {
      eventCategory: 'Select Choropleth',
      eventAction: choroplethConfigs.find(d => d.id === mode).group,
      eventLabel: choroplethConfigs.find(d => d.id === mode).label,
    });
    this.set('choroplethMode', mode);
  },

  actions: {
    toggleAdvancedOptions() {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'event' : 'toggle_more_options',
        'toggle' : this.get('advanced') ? 'Closed' : 'Opened'
      });
      this.get('metrics').trackEvent('GoogleAnalytics', {
        eventCategory: 'Advanced Options',
        eventAction: 'Toggle Advanced Options',
        eventLabel: this.get('advanced') ? 'Closed' : 'Opened',
      });

      this.set('advanced', !this.get('advanced'));
    },
    
    toggleMapLayersMenu() {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'event' : 'toggle_add_map_layers',
        'toggle' : this.get('mapLayersMenu') ? 'Closed' : 'Opened',
      });
      this.get('metrics').trackEvent('GoogleAnalytics', {
        eventCategory: 'Advanced Options',
        eventAction: 'Toggle Map Layers Menu',
        eventLabel: this.get('mapLayersMenu') ? 'Closed' : 'Opened',
      });
    },

    addedFile(file) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'event' : 'upload_shapefile',
        'upload_shapefile' : 'added',
      });
      this.get('metrics').trackEvent('GoogleAnalytics', {
        eventCategory: 'Advanced Options',
        eventAction: 'Upload Shapefile',
        eventLabel: 'added',
      });
      this.addedFile(file)
    },
    removedFile() {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'event' : 'upload_shapefile',
        'upload_shapefile' : 'removed',
      });
      this.get('metrics').trackEvent('GoogleAnalytics', {
        eventCategory: 'Advanced Options',
        eventAction: 'Upload Shapefile',
        eventLabel: 'removed',
      });
      this.removedFile()
    }
  },
});
