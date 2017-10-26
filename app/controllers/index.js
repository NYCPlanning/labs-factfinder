import Ember from 'ember';
import { computed } from 'ember-decorators/object';
import layerGroups from '../layer-groups';
import sources from '../sources';
import selectedFeatures from '../layers/selected-features';

const selectedFillLayer = selectedFeatures.fill;
const selectedLineLayer = selectedFeatures.line;

const { service } = Ember.inject;

export default Ember.Controller.extend({
  selection: service(),
  layerGroups,
  sources,
  zoom: 12,
  center: [-73.916016, 40.697299],
  mode: 'direct-select',
  summaryLevel: 'tracts', // tracts, blocks, ntas, pumas

  selectedFillLayer,
  selectedLineLayer,

  @computed('selection.current')
  selectedSource(current) {
    return {
      type: 'geojson',
      data: current,
    };
  },

  actions: {
    handleClick(event) {
      const selection = this.get('selection');
      const summaryLevel = this.get('summaryLevel');

      const layers = [`census-${summaryLevel}-fill`];

      const [found] =
        event.target.queryRenderedFeatures(
          event.point,
          { layers },
        );

      if (found) {
        selection.handleSelectedFeature([found]);
      }
    },
  },
});
