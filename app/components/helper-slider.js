import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    handleSliderChange(value) {
      console.log('handleSliderChange')
      const variable = this.get('variable');
      this.sendAction('sliderChange', value, variable);
    },
    toggleVisibility() {
      console.log('toggleVIZ')
      const variable = this.get('variable');
      this.sendAction('toggleEnabled', variable);
    },
  },
});
