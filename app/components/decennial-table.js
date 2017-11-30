import Ember from 'ember';
import carto from 'ember-jane-maps/utils/carto';
import { task } from 'ember-concurrency';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import nestProfile from '../utils/nest-profile';
import decennialProfile from '../queries/decennial-profile';

const { service } = Ember.inject;

export default Ember.Component.extend({
  selection: service(),

  generateDataTask: task(function* (query) {
    const profileData = yield carto.SQL(query, 'json', 'post')
      .then(rows => nestProfile(rows, 'year', 'variable'));
    return profileData;
  }).restartable(),

  @computed('category')
  categoryData(category) {
    const geoids = this.get('selection.current.features').mapBy('properties.geoid');
    const query = decennialProfile(geoids, category);

    return this.get('generateDataTask').perform(query);
  },
});
