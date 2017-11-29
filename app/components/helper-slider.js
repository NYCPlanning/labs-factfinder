import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    handleSliderChange(value) {
      const variable = this.get('variable');
      this.sendAction('action', value, variable);
    },
  },
});
