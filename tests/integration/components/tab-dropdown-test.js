import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tab-dropdown', 'Integration | Component | tab dropdown', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{tab-dropdown}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tab-dropdown}}
      template block text
    {{/tab-dropdown}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
