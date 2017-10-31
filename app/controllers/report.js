import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import bbox from 'npm:@turf/bbox';

import layerGroups from '../layer-groups';
import sources from '../sources';
import selectedFeatures from '../layers/selected-features';

const selectedFillLayer = selectedFeatures.fill;

const { service } = Ember.inject;

export default Ember.Controller.extend({
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
