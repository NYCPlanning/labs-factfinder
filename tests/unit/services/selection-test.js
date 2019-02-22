import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | selection', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let service = this.owner.lookup('service:selection');
    assert.ok(service);
  });

  test('it counds correctly', function(assert) {
    let service = this.owner.lookup('service:selection');
    assert.equal(service.get('selectedCount'), 5);
  });

  test('it computes sortedLabels correctly', function(assert) {
    let service = this.owner.lookup('service:selection');
    assert.equal(service.get('sortedLabels').length, 5);
  });

  // test('it computes handleSummaryLevelToggle correctly', async function(assert) {
  //   let service = this.owner.lookup('service:selection');
  //   await service.handleSummaryLevelToggle('ntas');
  //   assert.equal(service.get('selectedCount').length, 4);
  // });
});

