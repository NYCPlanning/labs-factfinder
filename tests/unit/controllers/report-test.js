import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:report', 'Unit | Controller | report', {
  // Specify the other units that are required for this test.
  needs: ['service:selection', 'service:mapMouseover']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});
