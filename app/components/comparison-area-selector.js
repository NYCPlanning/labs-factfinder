import Ember from 'ember';

export default Ember.Component.extend({
  options: [],
  comparisonArea: null,
  actions: {
    updateProperty(value) {
      this.set('comparisonArea', value);
    },
  },
});
