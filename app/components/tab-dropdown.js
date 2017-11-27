import Ember from 'ember';

export default Ember.Component.extend({
  isOpen: false,

  actions: {
    closeTabDropdown() {
      this.set('isOpen', false);
    },
  },

});
