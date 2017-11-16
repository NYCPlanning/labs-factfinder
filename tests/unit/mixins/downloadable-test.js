import Ember from 'ember';
import DownloadableMixin from 'labs-nyc-factfinder/mixins/downloadable';
import { module, test } from 'qunit';

module('Unit | Mixin | downloadable');

// Replace this with your real tests.
test('it works', function(assert) {
  let DownloadableObject = Ember.Object.extend(DownloadableMixin);
  let subject = DownloadableObject.create();
  assert.ok(subject);
});
