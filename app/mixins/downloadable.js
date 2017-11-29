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

  afterModel(model, transition) {
    const { targetName } = transition;
    this._super(model, transition);
    this.controllerFor('profile').set('tab', targetName);
  },
});
