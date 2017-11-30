import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('acs-bar', 'Integration | Component | acs bar', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{acs-bar}}`);

  assert.equal(this.$().text().trim().substring(0,5), 'Hover');

  // Template block usage:
  this.render(hbs`
    {{#acs-bar}}
      template block text
    {{/acs-bar}}
  `);

  assert.equal(this.$().text().trim().substring(0,5), 'Hover');
});
