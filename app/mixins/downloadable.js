import Ember from 'ember';
import nestProfile from '../utils/nest-profile';

export default Ember.Mixin.create({
  setupController(controller, model) {
    this._super(controller, model);
    controller.setProperties({
      model: nestProfile(model),
      rawData: model,
    });
  },
});
