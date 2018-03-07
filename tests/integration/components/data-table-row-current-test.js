import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { run } from '@ember/runloop';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | data-table-row-current', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders change percent of 0 as 0.0%', async function(assert) {
    const store = this.owner.lookup('service:store');
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    run(async () => {
      const model = await store.createRecord('row',  { 
        id: 'TGdNS2htMVkyMDEyLTIwMTY=',
        base: 'LgMKhm1',
        variablename: 'LgMKhm1',
        category: 'languageSpokenAtHome',
        dataset: 'y2012_2016',
        profile: 'social',
        variable: 'lgmkhm1',
        is_most_recent: true,
        sum: 0,
        m: null,
        cv: null,
        percent: null,
        previous_percent: null,
        previous_sum: 0,
        previous_m: null,
        percent_m: null,
        previous_percent_m: null,
        comparison_cv: 62.8,
        comparison_m: 32,
        comparison_sum: 31,
        comparison_percent_m: null,
        comparison_percent: 1,
        change_sum: 0,
        change_m: 0,
        change_percent: null,
        change_percent_m: null,
        significant: false,
        percent_significant: true,
        difference_sum: -31,
        difference_percent: -100,
        difference_m: 32,
        difference_percent_m: 0,
        change_percentage_point: '0',
        change_percentage_point_m: 0,
        change_significant: false,
        change_percent_significant: false,
        change_percentage_point_significant: false,
        rowConfig:
         { title: 'Mon-Khmer, Cambodian',
           highlight: true,
           variable: 'lgmkhm1' },
        special: false,
        numGeoids: 9,
        codingThresholds: {},
        is_reliable: false,
        comparison_is_reliable: false });

      this.set('data', model);

      await render(hbs`{{data-table-row-current data=data}}`);
      assert.equal(this.element.querySelector('td.difference-percent').textContent.trim(), '-100.0');
    });
  });
});
