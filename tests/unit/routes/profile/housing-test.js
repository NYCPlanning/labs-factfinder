import { moduleFor, test } from 'ember-qunit';

moduleFor('route:profile/housing', 'Unit | Route | profile/housing', {
  // Specify the other units that are required for this test.
  needs: ['service:selection'],
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
