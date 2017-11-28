import Ember from 'ember';
import { computed } from 'ember-decorators/object';

import employmentStatus from '../../table-config/economic/employment-status';
import commuteToWork from '../../table-config/economic/commute-to-work';
import classOfWorker from '../../table-config/economic/class-of-worker';
import incomeAndBenefits from '../../table-config/economic/income-and-benefits';
import incomePast12MonthsBelowPoverty from '../../table-config/economic/income-past-12-months-below-poverty';
import earnings from '../../table-config/economic/earnings';
import industry from '../../table-config/economic/industry';
import occupation from '../../table-config/economic/occupation';
import healthInsuranceCoverage from '../../table-config/economic/health-insurance-coverage';
import ratioOfIncomeToPovertyLevel from '../../table-config/economic/ratio-of-income-to-poverty-level';

const { inject: { controller } } = Ember;

export default Ember.Controller.extend({
  employmentStatus,
  commuteToWork,
  classOfWorker,
  incomeAndBenefits,
  incomePast12MonthsBelowPoverty,
  earnings,
  industry,
  occupation,
  healthInsuranceCoverage,
  ratioOfIncomeToPovertyLevel,

  profile: controller('profile'),

  @computed('model')
  currentData(model) {
    return model.y2011_2015;
  },

  incomeAndBenefitsProfile: Ember.computed('model', function() {
    const d = this.get('model.y2011_2015.income_and_benefits');
    const config = [
      {
        property: 'hhiu10',
        label: 'Less than $10,000',
      },
      {
        property: 'hhi10t14',
        label: '$10,000 to $14,999',
      },
      {
        property: 'hhi15t24',
        label: '$15,000 to $24,999',
      },
      {
        property: 'hhi25t34',
        label: '$25,000 to $34,999',
      },
      {
        property: 'hhi35t49',
        label: '$35,000 to $49,999',
      },
      {
        property: 'hhi50t74',
        label: '$50,000 to $74,999',
      },
      {
        property: 'hhi75t99',
        label: '$75,000 to $99,999',
      },
      {
        property: 'hi100t149',
        label: '$100,000 to $149,999',
      },
      {
        property: 'hi150t199',
        label: '$150,000 to $199,999',
      },
      {
        property: 'hhi200pl',
        label: '$200,000 or more',
      },
    ];


    const profile = config.map(({ property, label }) => ({
      percent: d[property].percent,
      sum: d[property].sum,
      moe: d[property].m,
      percent_m: d[property].percent_m,
      comparison_percent: d[property].comparison_percent,
      comparison_percent_m: d[property].comparison_percent_m,
      group: label,
      classValue: property,
      // classValue: label.replace(/\s+/g, ''),
    }));

    return profile;
  }),

});
