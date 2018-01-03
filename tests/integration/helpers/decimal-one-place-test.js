
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('decimal-one-place', 'helper:decimal-one-place', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{decimal-one-place inputValue}}`);

  assert.equal(this.$().text().trim(), '1234');
});

