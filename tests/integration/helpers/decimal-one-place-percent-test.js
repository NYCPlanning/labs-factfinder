
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('decimal-one-place-percent', 'helper:decimal-one-place-percent', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{decimal-one-place-percent inputValue}}`);

  assert.equal(this.$().text().trim(), '1234');
});

