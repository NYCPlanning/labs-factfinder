import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import bbox from 'npm:@turf/bbox';

import sources from '../sources';
import selectedFeatures from '../layers/selected-features';

const selectedFillLayer = selectedFeatures.fill;

const { service } = Ember.inject;
const { alias } = Ember.computed;

export default Ember.Component.extend({

  selection: service(),

  @computed()
  currentProfile() {
    return this.get('profile').target.currentRouteName.split('.')[1];
  },

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
      padding: 20,
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
