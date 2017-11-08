import { test } from 'qunit';
import startApp from 'labs-nyc-factfinder/tests/helpers/start-app';
import moduleForAcceptance from 'labs-nyc-factfinder/tests/helpers/module-for-acceptance';

import { click, fillIn, find, findAll, keyEvent, triggerEvent, waitUntil } from 'ember-native-dom-helpers';

let myController;

moduleForAcceptance('Acceptance | select geometries', {
  beforeEach() {
    this.application = startApp();
    myController = this.application.__container__.lookup('controller:index');
  },
});

test('visiting /', async function(assert) {
  await visit('/');
  assert.equal(currentURL(), '/');
});
