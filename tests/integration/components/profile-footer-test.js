import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('profile-footer', 'Integration | Component | profile footer', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{profile-footer}}`);

  assert.ok(this);

  // Template block usage:
  this.render(hbs`
    {{#profile-footer}}
      template block text
    {{/profile-footer}}
  `);

  // assert.equal(this.$().text().trim(), 'template block text');
});
