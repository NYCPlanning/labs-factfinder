import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';
import nestProfile from '../utils/nest-profile';

export default Mixin.create({
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
