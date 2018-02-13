
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('render-top-bottom-coding-suffix', 'helper:render-top-bottom-coding-suffix', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{render-top-bottom-coding-suffix inputValue}}`);

  assert.equal(this.$().text().trim(), '1234');
});

