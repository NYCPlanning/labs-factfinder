import { test } from 'qunit';
import moduleForAcceptance from 'labs-nyc-factfinder/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | report shows correct statistics');

test('visiting /report', function(assert) {
  visit('/report/demographic');

  andThen(function() {
    assert.equal(currentURL(), '/report/demographic');
  });
});
