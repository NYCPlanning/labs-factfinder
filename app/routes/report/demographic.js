import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    console.log('model', this.modelFor('report'));
    return this.modelFor('report');
  },
});
