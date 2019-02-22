import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, pauseTest } from '@ember/test-helpers';
import { run } from '@ember/runloop';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | data-table-row-change', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders change percent of 0 as 0.0%', async function(assert) {
    const store = this.owner.lookup('service:store');
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    run(async () => {
      const model = await store.createRecord('row',  {
        "id": "SEhJMTB0MTRZMjAxMi0yMDE2",
        "base": "HH2",
        "variablename": "HHI10t14",
        "category": "incomeAndBenefits",
        "dataset": "y2013_2017",
        "profile": "economic",
        "variable": "hhi10t14",
        "is_most_recent": true,
        "sum": 261,
        "m": 133.86933928275,
        "cv": 31.1798994474723,
        "percent": "0.0138",
        "previous_percent": null,
        "previous_sum": null,
        "previous_m": null,
        "percent_m": 0.00705495366836727,
        "previous_percent_m": null,
        "comparison_cv": 1.2,
        "comparison_m": 3678,
        "comparison_sum": 186560,
        "comparison_percent_m": 0.001,
        "comparison_percent": 0.06,
        "change_sum": null,
        "change_m": 133.86933928275,
        "change_percent": 0,
        "change_percent_m": null,
        "significant": true,
        "percent_significant": true,
        "difference_sum": -186299,
        "difference_percent": -4.62,
        "difference_m": 3680.43543619502,
        "difference_percent_m": 0.712547340622423,
        "change_percentage_point": null,
        "change_percentage_point_m": 0.00705495366836727,
        "change_significant": false,
        "change_percent_significant": false,
        "change_percentage_point_significant": false,
        "rowConfig": {
            "title": "$10,000 to $14,999",
            "variable": "hhi10t14"
        },
        "special": false,
        "numGeoids": 8,
        "codingThresholds": {},
        "is_reliable": false,
        "comparison_is_reliable": true
      });

      this.set('data', model);
      this.set('data2', model);

      await render(hbs`{{data-table-row-change data=data data2=data}}`);
      assert.equal(this.element.querySelector('td.change-percent').textContent.trim(), '0.0%');
    });
  });
});
