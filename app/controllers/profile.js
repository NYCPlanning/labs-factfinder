import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import bbox from '@turf/bbox';

import layerGroups from '../layer-groups';
import sources from '../sources';
import selectedFeatures from '../layers/selected-features';

const selectedFillLayer = selectedFeatures.fill;

export default Controller.extend({
  mode: 'current',
  charts: true,
  comparison: true,
  changeReliability: true,
  changeComparison: false,

  selection: service(),
  mapMouseover: service(),
  metrics: service(),

  queryParams: ['mode', 'reliability', 'charts', 'comparator'],
  comparator: alias('selection.comparator'),
  reliability: alias('selection.reliability'),

  layerGroups,
  sources,
  zoom: 10,
  center: [-73.916016, 40.697299],

  selectedSource: computed('selection.current', function() {
    const current = this.get('selection.current');

    return {
      type: 'geojson',
      data: current,
    };
  }),

  selectionCount: alias('selection.selectedCount'),
  summaryLevel: alias('selection.summaryLevel'),

  selectedFillLayer,

  fitBounds(map) {
    const FC = this.get('selection').current;
    map.fitBounds(bbox(FC), {
      padding: 40,
    });
  },

  actions: {
    handleMapLoad(map) {
      this.fitBounds(map);
    },

    handleResize(e) {
      this.fitBounds(e.target);
    },

    sendAnalytics(eventAction, eventLabel) {
      this.get('metrics').trackEvent('GoogleAnalytics', {
        eventCategory: 'Profile Navigation',
        eventAction,
        eventLabel,
      });
    },
  },

});
