import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    // redirect /profile to /profile/demographic
    this.replaceWith('profile.demographic');
  },
});
