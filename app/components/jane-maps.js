import Ember from 'ember';
import EmberMapboxGL from 'ember-mapbox-gl/components/mapbox-gl';
import layout from '../templates/components/jane-maps';
import carto from '../utils/carto';

import { ParentMixin } from 'ember-composability-tools';

const { service } = Ember.inject;
const { Promise } = Ember.RSVP;

export default EmberMapboxGL.extend(ParentMixin, {
  layout,

  init(...args) {
    this._super(...args);

    this.set('registeredLayers.layers', this.get('childComponents'));
  },
  registeredLayers: service(),
  _onLoad(map) {
    this._super(...arguments);

    const sources = this.get('sources');

    if (sources) {
      const cartoSourcePromises = Object.keys(sources)
        .filter(key => sources[key].type === 'cartovector')
        .map((key) => {
          const source = sources[key];
          const { minzoom = 0 } = source;

          return carto.getVectorTileTemplate(source['source-layers'])
            .then(template => ({
              id: source.id,
              type: 'vector',
              tiles: [template],
              minzoom,
            }));
        });

      if(!this.isDestroyed) {
        this.set('cartoSourcePromises',
          Promise.all(cartoSourcePromises).then(sources => {
            window.map = map;
            sources.forEach(source => {
              map.addSource(source.id, source);
            });
          })
        );
      }
    }
  }
});
