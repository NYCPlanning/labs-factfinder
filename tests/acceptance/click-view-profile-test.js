import { module, test } from 'qunit';
import { visit, currentRouteName, click, waitFor, find, pauseTest } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | click view profile', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async function(assert) {
    await visit('/');
    await click('.view-profile-button');
    await waitFor('h3#sex-and-age');

    assert.equal(currentRouteName(), 'profile.demographic');
  });
});
