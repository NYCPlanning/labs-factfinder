import { moduleForComponent, skip } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('download-spreadsheet', 'Integration | Component | download spreadsheet', {
  integration: true
});

skip('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{download-spreadsheet}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#download-spreadsheet}}
      template block text
    {{/download-spreadsheet}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
