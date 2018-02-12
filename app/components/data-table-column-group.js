import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',
  reliabilityMode: false,
  model: null,

  actions: {
    logModel() {
      window.logModel = this.get('model');
    },
  },
});
