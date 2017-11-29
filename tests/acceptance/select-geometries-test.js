import { test } from 'qunit';
import startApp from 'labs-nyc-factfinder/tests/helpers/start-app';
import destroyApp from 'labs-nyc-factfinder/tests/helpers/destroy-app';
import moduleForAcceptance from 'labs-nyc-factfinder/tests/helpers/module-for-acceptance';
import config from 'labs-nyc-factfinder/config/environment';

import { click, fillIn, find, findAll, keyEvent, triggerEvent, waitUntil } from 'ember-native-dom-helpers';

const { run } = Ember;

let indexController;

moduleForAcceptance('Acceptance | select geometries', {
  beforeEach() {
    this.application = startApp();
    indexController = this.application.__container__.lookup('controller:index');
  },
  afterEach() {
    run(() => { indexController.get('selection').clearSelection() });
    destroyApp(this.application);
  },
});

test('visiting /', async function(assert) {
  await visit('/');
  assert.equal(currentURL(), '/');
});

test('visiting /, see no tracks selected', async function(assert) {
  await visit('/');

  assert.equal($(find('.map-utility-box .count')).text().trim(), '0');
});

test('visiting /, adds tracts, counts number of tracts, explodes tracts to blocks', async function(assert) {
  await visit('/');
  await run(function() {
    indexController.get('selection').handleSelectedFeatures(config.SAMPLE_SELECTION.features);
  });

  assert.equal($(find('.map-utility-box .count')).text().trim(), '5');

  await click('.explode-block a');
  await waitUntil(() => ($(find('.map-utility-box .count')).text().trim()) !== '5', { timeout: 5000 });
  assert.equal($(find('.map-utility-box .count')).text().trim(), '113');
});
