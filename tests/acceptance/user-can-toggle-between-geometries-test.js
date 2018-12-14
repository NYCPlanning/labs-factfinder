import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import random from '@turf/random';
import SelectionService from 'labs-nyc-factfinder/services/selection';

const { randomPolygon } = random;

module('Acceptance | user can toggle between geometries', function(hooks) {
  setupApplicationTest(hooks);

  test('user can toggle across different summary levels', async function(assert) {
    const selectionService = this.owner.lookup('service:selection');

    await visit('/');

    await click('[data-test-toggle-blocks]');

    assert.equal(selectionService.get('selectedCount'), 113);

    await click('[data-test-toggle-ntas]');

    assert.equal(selectionService.get('selectedCount'), 4);

    await click('[data-test-toggle-tracts]');

    assert.equal(selectionService.get('selectedCount'), 69);

    await click('[data-test-toggle-pumas]');

    assert.equal(selectionService.get('selectedCount'), 2);

    assert.equal(currentURL(), '/');
  });
});
