
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('decimal-format-all', 'helper:decimal-format-all', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{decimal-format-all inputValue}}`);

  assert.equal(this.$().text().trim(), '1234');
});

