import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | sanitize-style', function(hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test('it renders', async function(assert) {
    this.set('inputValue', { color: '#ffffff' });

    await render(hbs`{{sanitize-style inputValue}}`);

    assert.equal(this.element.textContent.trim(), 'color:#ffffff;');
  });
});
