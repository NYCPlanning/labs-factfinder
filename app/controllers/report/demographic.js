import Ember from 'ember';

const { inject } = Ember;

export default Ember.Controller.extend({
  report: inject.controller('report'),
});
