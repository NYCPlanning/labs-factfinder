import Ember from 'ember';
import { task } from 'ember-concurrency';
import nestProfile from '../../utils/nest-profile';
import delegateAggregator from '../../utils/delegate-aggregator';

const { get, inject: { service } } = Ember;

export default Ember.Route.extend({
  selection: service(),

  beforeModel() {
    // unload to avoid the issue with duplicate ids.
    // there are duplicates because id is based arbitrarily on the array index.
    this.store.unloadAll();
  },

  model() {
    return {
      sex_age: this.get('fetchCategory').perform('decennial_sex_age'),
      population_density: this.get('fetchCategory').perform('decennial_population_density'),
      mutually_exclusive_race: this.get('fetchCategory').perform('decennial_mutually_exclusive_race'),
      hispanic_subgroup: this.get('fetchCategory').perform('decennial_hispanic_subgroup'),
      asian_subgroup: this.get('fetchCategory').perform('decennial_asian_subgroup'),
      relationship_head_householder: this.get('fetchCategory').perform('decennial_relationship_head_householder'),
      household_type: this.get('fetchCategory').perform('decennial_household_type'),
      housing_occupancy: this.get('fetchCategory').perform('decennial_housing_occupancy'),
      housing_tenure: this.get('fetchCategory').perform('decennial_housing_tenure'),
      tenure_by_age: this.get('fetchCategory').perform('decennial_tenure_by_age'),
      household_size: this.get('fetchCategory').perform('decennial_household_size'),
    };
  },

  afterModel(model, transition) {
    const { targetName } = transition;
    this._super(model, transition);
    this.controllerFor('profile').set('tab', targetName);
  },

  fetchCategory: task(function* (category) {
    const geoids = this.get('selection.current.features').mapBy('properties.geoid');
    const profileData = yield this.get('store')
      .query('row', { geoids, type: 'decennial', category })
      .then(rows => rows.toArray());
    // .then(rows => nestProfile(rows, 'year', 'variable'));

    const nestedModel = nestProfile(profileData, 'year', 'variable');
    profileData.forEach((row) => {
      if (row.get('isSpecial')) {
        const rowConfig = row.get('rowConfig');
        const latestYear = get(nestedModel, 'y2010');
        row.setProperties(delegateAggregator(rowConfig, latestYear));
      }

      return row;
    });

    return nestedModel;
  }).enqueue().cancelOn('deactivate'),
});
