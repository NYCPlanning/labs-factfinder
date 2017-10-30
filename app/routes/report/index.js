import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    // redirect /report to /report/demographic
    this.replaceWith('user.demographic');
  },
});
