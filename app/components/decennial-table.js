import Ember from 'ember';
import { task } from 'ember-concurrency';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import nestProfile from '../utils/nest-profile';

const { service } = Ember.inject;

export default Ember.Component.extend({
  selection: service(),
  store: service(),

  generateDataTask: task(function* (category) {
    const geoids = this.get('selection.current.features').mapBy('properties.geoid');
    const profileData = yield this.get('store')
      .query('row', { geoids, type: 'decennial', category })
      .then(rows => rows.toArray())
      .then(rows => nestProfile(rows, 'year', 'variable'));

    return profileData;
  }).restartable(),

  @computed('category')
  categoryData(category) {
    return this.get('generateDataTask').perform(category);
  },
});
