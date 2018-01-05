import Ember from 'ember';
import nestProfile from '../utils/nest-profile';
import delegateAggregator from '../utils/delegate-aggregator';

const { get, inject: { service } } = Ember;

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
    const { length: numberGeoids } = this.get('selection.current.features').mapBy('properties.geoid');

    model.forEach((row) => {
      // if the row is "special" and the number of geoids in the
      // selection are greater than 1
      if (row.get('isSpecial') && (numberGeoids > 1)) {
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
