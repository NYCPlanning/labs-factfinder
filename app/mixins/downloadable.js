import Ember from 'ember';
import nestProfile from '../utils/nest-profile';
import delegateAggregator from '../utils/delegate-aggregator';

const { get } = Ember;

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

    const nestedModel = nestProfile(model, 'dataset', 'variable');
    model.forEach((row) => {
      if (row.get('isSpecial')) {
        const rowConfig = row.get('rowConfig');
        const latestYear = get(nestedModel, 'y2012_2016');
        row.setProperties(delegateAggregator(rowConfig, latestYear));
      }

      return row;
    });

    controller.setProperties({
      model: nestedModel,
      rawData: model.map(row => row.toJSON()),
    });
  },
});
