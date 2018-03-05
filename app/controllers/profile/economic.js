import Controller, { inject as controller } from '@ember/controller';
import { get } from '@ember/object';
import { computed } from 'ember-decorators/object';
import classOfWorkerChartConfig from '../../chart-config/economic/class-of-worker';
import incomeAndBenefitsChartConfig from '../../chart-config/economic/income-and-benefits';
import commuteToWorkChartConfig from '../../chart-config/economic/commute-to-work';
import occupationChartConfig from '../../chart-config/economic/occupation';
import ratioOfIncomeToPovertyLevelChartConfig from '../../chart-config/economic/ratio-of-income-to-poverty-level';

import economic from '../../table-config/economic';

const {
  employmentStatus,
  commuteToWork,
  classOfWorker,
  incomeAndBenefits,
  incomeInPast12MonthsIsBelowThePovertyLevel,
  earnings,
  industry,
  occupation,
  healthInsuranceCoverage,
  ratioOfIncomeToPovertyLevel,
} = economic;

export default Controller.extend({
  classOfWorker,
  commuteToWork,
  earnings,
  employmentStatus,
  healthInsuranceCoverage,
  incomeAndBenefits,
  incomeInPast12MonthsIsBelowThePovertyLevel,
  industry,
  occupation,
  ratioOfIncomeToPovertyLevel,

  classOfWorkerChartConfig,
  incomeAndBenefitsChartConfig,
  commuteToWorkChartConfig,
  occupationChartConfig,
  ratioOfIncomeToPovertyLevelChartConfig,

  profile: controller('profile'),

  @computed('model')
  currentData(model) {
    return get(model, 'y2012_2016');
  },
});
