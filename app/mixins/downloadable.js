import Ember from 'ember';
import nestProfile from '../utils/nest-profile';

const { inject: { service } } = Ember;

export default Ember.Mixin.create({
  selection: service(),

  beforeModel(transition) {
    // unload to avoid the issue with duplicate ids.
    // there are duplicates because id is based arbitrarily on the array index.
    this.store.unloadAll();

    const { targetName } = transition;
    this.controllerFor('profile').set('tab', targetName);
  },

  setupController(controller, model) {
    this._super(controller, model);

    const nestedModel = nestProfile(model, 'dataset', 'variable');

    controller.setProperties({
      model: nestedModel,
      rawData: model.map(row => row.toJSON()),
    });
  },
});
