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

  model(params, { queryParams: { comparator = '0' } }) {
    return {
      sex_age: this.get('fetchCategory').perform('decennial_sex_age', comparator),
      population_density: this.get('fetchCategory').perform('decennial_population_density', comparator),
      mutually_exclusive_race: this.get('fetchCategory').perform('decennial_mutually_exclusive_race', comparator),
      hispanic_subgroup: this.get('fetchCategory').perform('decennial_hispanic_subgroup', comparator),
      asian_subgroup: this.get('fetchCategory').perform('decennial_asian_subgroup', comparator),
      relationship_head_householder: this.get('fetchCategory').perform('decennial_relationship_head_householder', comparator),
      household_type: this.get('fetchCategory').perform('decennial_household_type', comparator),
      housing_occupancy: this.get('fetchCategory').perform('decennial_housing_occupancy', comparator),
      housing_tenure: this.get('fetchCategory').perform('decennial_housing_tenure', comparator),
      tenure_by_age: this.get('fetchCategory').perform('decennial_tenure_by_age', comparator),
      household_size: this.get('fetchCategory').perform('decennial_household_size', comparator),
    };
  },

  afterModel(model, transition) {
    const { targetName } = transition;
    this._super(model, transition);
    this.controllerFor('profile').set('tab', targetName);
  },

  fetchCategory: task(function* (category, comparator) {
    const geoids = this.get('selection.current.features').mapBy('properties.geoid');
    const profileData = yield this.get('store')
      .query('row', { geoids, type: 'decennial', category, comparator })
      .then(rows => rows.toArray());

    const nestedModel = nestProfile(profileData, 'year', 'variable');
    profileData.forEach((row) => {
      if (row.get('isSpecial')) {
        const rowConfig = row.get('rowConfig');
        const rowYear = row.get('year');
        const latestYear = get(nestedModel, rowYear);

        delegateAggregator(row, rowConfig, latestYear);
      }

      return row;
    });

    return nestedModel;
  }).enqueue().cancelOn('deactivate'),
});
