import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, pauseTest } from '@ember/test-helpers';
import { run } from '@ember/runloop';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | data-table-row-change', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders change percent of 0 as 0.0%', async function(assert) {
    const store = this.owner.lookup('service:store');
    const model = await store.createRecord('acs-row',  {
      "id": "SEhJMTB0MTRZMjAxMi0yMDE2",
      "base": "HH2",
      "variablename": "HHI10t14",
      "category": "incomeAndBenefits",
      "dataset": "y2014_2018",
      "profile": "economic",
      "variable": "hhi10t14",
      "sum": 261,
      "marginOfError": 133.86933928275,
      "correlationCoefficient": 31.1798994474723,
      "percent": "0.0138",
      "previousPercent": null,
      "previousSum": null,
      "previousMarginOfError": null,
      "percentMarginOfError": 0.00705495366836727,
      "previousPercentMarginOfError": null,
      "comparisonCorrelationCoefficient": 1.2,
      "comparisonMarginOfError": 3678,
      "comparisonSum": 186560,
      "comparisonPercentMarginOfError": 0.001,
      "comparisonPercent": 0.06,
      "changeSum": null,
      "changeMarginOfError": 133.86933928275,
      "changePercent": 0,
      "changePercentMarginOfError": null,
      "significant": true,
      "percentSignificant": true,
      "differenceSum": -186299,
      "differencePercent": -4.62,
      "differenceMarginOfError": 3680.43543619502,
      "differencePercentMarginOfError": 0.712547340622423,
      "changePercentagePoint": null,
      "changePercentagePointMarginOfError": 0.00705495366836727,
      "changeSignificant": false,
      "changePercentSignificant": false,
      "changePercentagePointSignificant": false,
      "rowConfig": {
          "title": "$10,000 to $14,999",
          "variable": "hhi10t14"
      },
      "numGeoids": 8,
      "codingThreshold": null,
      "previousCodingThreshold": null,
      "isReliable": false,
      "comparisonIsReliable": true
    });

    this.set('data', model);

    await render(hbs`{{data-table-row-change data=model}}`);

    assert.equal(this.element.querySelector('td.change-percent').textContent.trim(), '0.0%');
  });
});
