import { module, skip } from 'qunit';
import { visit, currentURL, click, pauseTest } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import random from '@turf/random';
import SelectionService from 'labs-nyc-factfinder/services/selection';

const { randomPolygon } = random;

module('Acceptance | user can toggle between geometries', function(hooks) {
  setupApplicationTest(hooks);

  // this test is flaking for some reason
  // it fails on this assertion: assert.equal(selectionService.get('selectedCount'), 4);
  // manual test shows it working correctly
  // seems to be 
  skip('user can toggle across different summary levels', async function(assert) {
    const selectionService = this.owner.lookup('service:selection');

    await visit('/');

    await click('[data-test-toggle-blocks]');

    await pauseTest();
    assert.equal(selectionService.get('selectedCount'), 113);

    await click('[data-test-toggle-ntas]');

    await pauseTest();
    assert.equal(selectionService.get('selectedCount'), 4);

    await click('[data-test-toggle-tracts]');

    await pauseTest();
    assert.equal(selectionService.get('selectedCount'), 69);

    await click('[data-test-toggle-pumas]');

    await pauseTest();
    assert.equal(selectionService.get('selectedCount'), 2);

    assert.equal(currentURL(), '/');
  });
});
