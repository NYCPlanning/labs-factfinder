import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import bbox from 'npm:@turf/bbox';

import layerGroups from '../layer-groups';
import sources from '../sources';
import selectedFeatures from '../layers/selected-features';

const selectedFillLayer = selectedFeatures.fill;

const { service } = Ember.inject;
const { alias } = Ember.computed;

export default Ember.Controller.extend({
  queryParams: ['mode'],

  mode: 'standard',
  checked: true,

  selection: service(),
  mapMouseover: service(),

  layerGroups,
  sources,
  zoom: 10,
  center: [-73.916016, 40.697299],

  @computed('selection.current')
  selectedSource(current) {
    return {
      type: 'geojson',
      data: current,
    };
  },

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
  },

});
