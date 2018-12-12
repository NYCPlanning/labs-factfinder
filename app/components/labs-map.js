import Ember from 'ember';
import LabsMap from 'ember-mapbox-composer/components/labs-map';
import { ParentMixin } from 'ember-composability-tools';
import layout from '../templates/components/labs-map';
import carto from '../utils/carto';

const { service } = Ember.inject;
const { Promise } = Ember.RSVP;


export default LabsMap.extend(ParentMixin, {
  layout,

  init(...args) {
    this._super(...args);

    this.set('registeredLayers.layers', this.get('childComponents'));
  },
  sources: null,
  sourcesHaveLoaded: false,
  registeredLayers: service(),
  _onLoad(map, ...args) {
    this._super(map, ...args);

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

      Promise.all(cartoSourcePromises).then((finishedSources) => {
        finishedSources.forEach((source) => {
          if (!this.isDestroyed || !this.isDestroying) map.addSource(source.id, source);
        });

        if (!this.isDestroyed || !this.isDestroying) this.set('sourcesHaveLoaded', true);
      });
    }
  },
});
