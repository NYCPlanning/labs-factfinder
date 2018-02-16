import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Component.extend({
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
