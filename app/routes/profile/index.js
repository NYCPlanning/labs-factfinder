import Route from '@ember/routing/route';

export default Route.extend({
  beforeModel() {
    // redirect /profile to /profile/demographic
    this.replaceWith('profile.demographic');
  },
});
