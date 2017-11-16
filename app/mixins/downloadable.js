import Ember from 'ember';
import nestReport from '../utils/nest-report';

export default Ember.Mixin.create({
  setupController(controller, model) {
    this._super(controller, model);
    controller.setProperties({
      model: nestReport(model),
      rawData: model,
    });
  },
});
