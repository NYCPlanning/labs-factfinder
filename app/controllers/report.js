import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import bbox from 'npm:@turf/bbox';

import layerGroups from '../layer-groups';
import sources from '../sources';
import selectedFeatures from '../layers/selected-features';

const selectedFillLayer = selectedFeatures.fill;

const { service } = Ember.inject;
const { alias } = Ember.computed;

// 0 = city; 1..5 = boro
const COMPARISON_GEOIDS = [0, 1, 2, 3, 4, 5]; // eslint-disable-line

export default Ember.Controller.extend({
  selection: service(),
  mapMouseover: service(),

  queryParams: ['comparator'],
  comparator: '0',

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

  actions: {
    handleMapLoad(map) {
      const FC = this.get('selection').current;
      map.fitBounds(bbox(FC), {
        padding: 40,
      });
    },
  },

});
