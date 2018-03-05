import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  isOpen: false,

  metrics: service(),

  actions: {
    closeTabDropdown() {
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
