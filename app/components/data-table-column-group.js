import Component from '@ember/component';

export default Component.extend({
  tagName: '',
  reliabilityMode: false,
  model: null,

  actions: {
    logModel() {
      window.logModel = this.get('model');
    },
  },
});
