import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { run } from '@ember/runloop';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | data-table-row-current', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders change percent of 0 as 0.0%', async function(assert) {
    const store = this.owner.lookup('service:store');
    const model = await store.createRecord('acs-row',  { 
      id: 'TGdNS2htMVkyMDEyLTIwMTY=',
      base: 'LgMKhm1',
      variablename: 'LgMKhm1',
      category: 'languageSpokenAtHome',
      dataset: 'y2014_2018',
      profile: 'social',
      variable: 'lgmkhm1',
      is_most_recent: true,
      sum: 0,
      marginOfError: null,
      correlationCoefficient: null,
      percent: null,
      previousPercent: null,
      previousSum: 0,
      previousMarginOfError: null,
      percentMarginOfError: null,
      previousPercentMarginOfError: null,
      comparisonCorrelationCoefficient: 62.8,
      comparisonMarginOfError: 32,
      comparisonSum: 31,
      comparisonPercentMarginOfError: null,
      comparisonPercent: 1,
      changeSum: 0,
      changeMarginOfError: 0,
      changePercent: null,
      changePercentMarginOfError: null,
      significant: false,
      percentSignificant: true,
      differenceSum: -31,
      differencePercent: -100,
      differenceMarginOfError: 32,
      differencePercentMarginOfError: 0,
      changePercentagePoint: '0',
      changePercentagePointMarginOfError: 0,
      changeSignificant: false,
      changePercentSignificant: false,
      changepercentagePointSignificant: false,
      rowConfig:
        { title: 'Mon-Khmer, Cambodian',
          highlight: true,
          variable: 'lgmkhm1' },
      special: false,
      numGeoids: 9,
      codingThresholds: {},
      isReliable: false,
      comparisonIsReliable: false });

    this.set('data', model);

    await render(hbs`{{data-table-row-current data=data}}`);
    assert.equal(this.element.querySelector('td.difference-percent').textContent.trim(), '-100.0');
  });
});
