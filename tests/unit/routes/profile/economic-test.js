import { moduleFor, test } from 'ember-qunit';

moduleFor('route:profile/economic', 'Unit | Route | profile/economic', {
  // Specify the other units that are required for this test.
  needs: ['service:selection'],
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
