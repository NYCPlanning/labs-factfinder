import Ember from 'ember';
import { computed } from 'ember-decorators/object';

const current = {
  type: 'FeatureCollection',
  features: [],
};

export default Ember.Service.extend({
  current,

  handleSelectedFeature(features = [], identifier = 'boroct2010') {
    const selected = this.get('current');

    features.forEach((feature) => {
      const { type, geometry, properties } = feature;

      const inSelection = selected.features.find(
        selectedFeature => selectedFeature.properties[identifier] === properties[identifier],
      );

      if (inSelection === undefined) {
        selected.features.push({
          type,
          geometry,
          properties,
        });
      } else {
        selected.features = selected.features.filter(
          selectedFeature => selectedFeature.properties[identifier] !== properties[identifier],
        );
      }
    });

    this.set(
      'current',
      { type: 'FeatureCollection', features: selected.features },
    );
  },

  @computed('current')
  selectedCount(currentSelected) {
    return currentSelected.features.length;
  },
});
