import { module, test } from 'qunit';
import { visit, currentURL, find, findAll, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { percySnapshot } from 'ember-percy';

module('Acceptance | data tables sniff test', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting assorted profiles, checking for content changes', async function(assert) {
    let text;
    await visit('/profile/1/demographic?reliability=true');
    await percySnapshot('profile/1/demographic?reliability=true', { scope: '#profile-content' });
    assert.ok(true);
  });

  test('visiting /profile/1/social?reliability=true, checking for content changes', async function(assert) {
    await visit('/profile/1/social?reliability=true');
    await percySnapshot('profile/1/social?reliability=true', { scope: '#profile-content' });
    assert.ok(true);
  });

  test('visiting /profile/1/economic?reliability=true, checking for content changes', async function(assert) {
    await visit('/profile/1/economic?reliability=true');
    await percySnapshot('profile/1/economic?reliability=true', { scope: '#profile-content' });
    assert.ok(true);
  });

  test('visiting /profile/1/housing?reliability=true, checking for content changes', async function(assert) {
    await visit('/profile/1/housing?reliability=true');
    await percySnapshot('profile/1/housing?reliability=true', { scope: '#profile-content' });
    assert.ok(true);
  });

  test('visiting /profile/1/census?reliability=true, checking for content changes', async function(assert) {
    await visit('/profile/1/census?reliability=true');
    await percySnapshot('profile/1/census?reliability=true', { scope: '#profile-content' });
    assert.ok(true);
  });

  test('visiting /profile/726/demographic?reliability=true, checking for content changes', async function(assert) {
    await visit('/profile/726/demographic?reliability=true');
    await percySnapshot('profile/726/demographic?reliability=true', { scope: '#profile-content' });
    assert.ok(true);
  });

  test('visiting /profile/726/social?reliability=true, checking for content changes', async function(assert) {
    await visit('/profile/726/social?reliability=true');
    await percySnapshot('profile/726/social?reliability=true', { scope: '#profile-content' });
    assert.ok(true);
  });

  test('visiting /profile/726/economic?reliability=true, checking for content changes', async function(assert) {
    await visit('/profile/726/economic?reliability=true');
    await percySnapshot('profile/726/economic?reliability=true', { scope: '#profile-content' });
    assert.ok(true);
  });

  test('visiting /profile/726/housing?reliability=true, checking for content changes', async function(assert) {
    await visit('/profile/726/housing?reliability=true');
    await percySnapshot('profile/726/housing?reliability=true', { scope: '#profile-content' });
    assert.ok(true);
  });

  test('visiting /profile/726/census?reliability=true, checking for content changes', async function(assert) {
    await visit('/profile/726/census?reliability=true');
    await percySnapshot('profile/726/census?reliability=true', { scope: '#profile-content' });
    assert.ok(true);
  });
});
