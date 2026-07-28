import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

const VARIABLE_EXCLUSIONS = [
  'pop',
  'pop_1',
  'pop_2',
  'pop_4',
  'pop_5',
  'pop_6',
  'mdpop3',
];

export default Component.extend({
  tagName: '',

  selection: service(),

  reliabilityMode: false,
  model: null,
  rowConfig: null,

  selectedGeoids: computed(
    'selection.current.features.@each.properties.geoid',
    function () {
      const features = this.get('selection.current.features') || [];

      return features.map((feature) => {
        if (feature.get) {
          return feature.get('properties.geoid');
        }

        return feature.properties.geoid;
      });
    }
  ),

  geoid: computed('selectedGeoids.[]', function () {
    const selectedGeoids = this.get('selectedGeoids');

    return selectedGeoids.length === 1
      ? selectedGeoids[0]
      : null;
  }),

  shouldApplyInsignificantClass: computed(
    'model.isReliable',
    'rowConfig.data',
    'geoid',
    function () {
      const isReliable = this.get('model.isReliable');
      const rowConfigData = this.get('rowConfig.data') || '';
      const geoid = Number(this.get('geoid'));

      const containsExcludedVariable =
        VARIABLE_EXCLUSIONS.some((variable) =>
          rowConfigData.includes(variable)
        );

      const isExcludedGeoid =
        Number.isInteger(geoid) &&
        geoid >= 0 &&
        geoid <= 5;

      const shouldSkipInsignificantClass =
        isExcludedGeoid &&
        containsExcludedVariable;

      return !isReliable && !shouldSkipInsignificantClass;
    }
  ),

  actions: {
    logModel() {
      window.logModel = this.get('model');
      window.geoid = this.get('geoid');
    },
  },
});