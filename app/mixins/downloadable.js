import Ember from 'ember';
import nestProfile from '../utils/nest-profile';

export default Ember.Mixin.create({
  beforeModel(transition) {
    // unload to avoid the issue with duplicate ids.
    // there are duplicates because id is based arbitrarily on the array index.
    this.store.unloadAll();

    const { targetName } = transition;
    this.controllerFor('profile').set('tab', targetName);
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.setProperties({
      model: nestProfile(model, 'dataset', 'variable'),
      rawData: model.map(row => row.toJSON()),
    });
  },
});
