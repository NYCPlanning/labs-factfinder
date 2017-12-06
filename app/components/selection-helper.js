import Ember from 'ember';

export default Ember.Component.extend({
  classNames: 'selection-helper',

  actions: {
    handleSliderChange(value) {
      const variable = this.get('config.variable');
      this.sendAction('sliderChange', value, variable);
    },
    toggleEnabled() {
      const variable = this.get('config.variable');
      this.sendAction('toggleEnabled', variable);
    },
  },
});
