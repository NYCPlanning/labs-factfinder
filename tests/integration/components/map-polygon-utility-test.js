import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('map-polygon-utility', 'Integration | Component | map polygon utility', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{map-polygon-utility}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#map-polygon-utility}}
      template block text
    {{/map-polygon-utility}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
