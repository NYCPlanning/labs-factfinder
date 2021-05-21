import EMCLabsMap from 'ember-mapbox-composer/components/labs-map';
import { Root } from 'ember-composability-tools';
import { inject as service } from '@ember/service';
import layout from '../templates/components/labs-map';

export const highlightedFeatureLayer = {
  id: 'highlighted-feature',
  type: 'line',
  source: 'hovered-feature',
  paint: {
    'line-color': '#585858',
    'line-opacity': 0.3,
    'line-width': {
      stops: [
        [8, 4],
        [11, 7],
      ],
    },
  },
};

const LabsMap = EMCLabsMap.extend({
  layout,

  registeredLayers: service(),

  highlightedFeatureLayer,

  init(...args) {
    this._super(...args);

    // this needs to be done differently...
    this.set('registeredLayers.layers', this.get('childComponents'));
  },
});

export default LabsMap;
