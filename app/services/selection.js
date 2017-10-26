import Ember from 'ember';
import { computed } from 'ember-decorators/object';

const current = {
  type: 'FeatureCollection',
  features: [],
};

export default Ember.Service.extend({
  current,

  handleSelectedFeature(features = []) {
    const selected = this.get('current');

    features.forEach((feature) => {
      const { type, geometry, properties } = feature;

      const inSelection = selected.features.find(
        (feature) => feature.properties.boroct2010 === properties.boroct2010,
      );

      if (inSelection === undefined) {
        selected.features.push({
          type,
          geometry,
          properties,
        });
      } else {
        selected.features = selected.features.filter(
          (feature) => feature.properties.boroct2010 !== properties.boroct2010,
        );

      }
    });

    this.set(
      'current',
      { type: 'FeatureCollection', features: selected.features },
    );
  },

  @computed('current')
  selectedCount(current) {
    return current.features.length
  },
});
