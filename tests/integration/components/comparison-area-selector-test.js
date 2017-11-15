import { moduleForComponent, skip } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('comparison-area-selector', 'Integration | Component | comparison area selector', {
  integration: true
});

skip('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{comparison-area-selector}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#comparison-area-selector}}
      template block text
    {{/comparison-area-selector}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
