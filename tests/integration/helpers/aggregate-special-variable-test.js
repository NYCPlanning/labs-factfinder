
import { moduleForComponent, skip } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('aggregate-special-variable', 'helper:aggregate-special-variable', {
  integration: true
});

// Replace this with your real skips.
skip('it renders', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{aggregate-special-variable inputValue}}`);

  assert.equal(this.$().text().trim(), '1234');
});

