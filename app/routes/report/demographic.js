import Ember from 'ember';
import nestReport from '../../utils/nest-report';

export default Ember.Route.extend({
  model() {
    return nestReport(this.modelFor('report')).demographic;
  },
});
