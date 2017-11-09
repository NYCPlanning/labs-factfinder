import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('demographic-change-table-row', 'Integration | Component | demographic change table row', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{demographic-change-table-row}}`);

  assert.equal(this.$().text().trim().split('\n')[0], 'n/a');
});
