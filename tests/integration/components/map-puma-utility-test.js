import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('map-puma-utility', 'Integration | Component | map puma utility', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{map-puma-utility}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#map-puma-utility}}
      template block text
    {{/map-puma-utility}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
