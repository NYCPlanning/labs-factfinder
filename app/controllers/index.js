import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import layerGroups from '../layer-groups';
import sources from '../sources';
import selectedFeatures from '../layers/selected-features';

import highlightedFeature from '../layers/highlighted-feature';

const selectedFillLayer = selectedFeatures.fill;

const { service } = Ember.inject;

export default Ember.Controller.extend({
  selection: service(),
  mapMouseover: service(),

  layerGroups,
  sources,
  zoom: 12,
  center: [-73.916016, 40.697299],
  mode: 'direct-select',

  selectedFillLayer,
  highlightedFeature,

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
      const summaryLevel = selection.get('summaryLevel');

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

    handleMousemove(e) {
      const mapMouseover = this.get('mapMouseover');
      mapMouseover.highlighter(e);
    },
  },
});
