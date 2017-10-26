import Ember from 'ember';
import { computed } from 'ember-decorators/object';
import layerGroups from '../layer-groups';
import sources from '../sources';

const { service } = Ember.inject;

export default Ember.Controller.extend({
  selection: service(),
  layerGroups,
  sources,
  zoom: 12,
  center: [-73.916016, 40.697299],
  mode: 'direct-select',
  summaryLevel: 'tracts',

  @computed('selection.current')
  selectedSource(current) {
    return {
      type: 'geojson',
      data: current.get('geometry'),
    };
  },

  actions: {
    handleClick(event) {
      const selection = this.get('selection');
    },
  },
});
