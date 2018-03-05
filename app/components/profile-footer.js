import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  classNames: 'profile-footer',
  metrics: service(),

  actions: {
    handleBackToTop() {
      this.get('metrics').trackEvent('GoogleAnalytics', {
        eventCategory: 'Profile Navigation',
        eventAction: 'Clicked back to top button',
      });
    },
  },
});
