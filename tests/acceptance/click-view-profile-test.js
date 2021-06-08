import { module, skip } from 'qunit';
import { visit, currentRouteName, click, waitFor, find, pauseTest } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | click view profile', function(hooks) {
  setupApplicationTest(hooks);

  skip('visiting /', async function(assert) {
    await visit('/');
    await click('.view-profile-button');
    await waitFor('h3#sex-and-age', { timeout: 2000 });

    assert.equal(currentRouteName(), 'profile.demographic');
  });
});
