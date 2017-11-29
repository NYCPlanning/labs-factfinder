import Ember from 'ember';

export default Ember.Component.extend({
  classNames: 'selection-helper',

  actions: {
    handleSliderChange(value) {
      const variable = this.get('variable');
      this.sendAction('sliderChange', value, variable);
    },
    toggleVisibility() {
      const variable = this.get('variable');
      this.sendAction('toggleEnabled', variable);
    },
  },
});
