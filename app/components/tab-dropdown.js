import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Component.extend({
  isOpen: false,

  metrics: service(),

  actions: {
    closeTabDropdown(x) {
      this.set('isOpen', false);
    },

    toggleDropdown() {
      this.get('metrics').trackEvent('GoogleAnalytics', {
        eventCategory: 'Profile Navigation',
        eventAction: `${this.get('isOpen') ? 'Closed' : 'Opened'} dropdown`,
        eventLabel: this.get('tabName'),
      });

      this.set('isOpen', !this.get('isOpen'));
    },
  },

});
