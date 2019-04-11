import Controller, { inject as controller } from '@ember/controller';

import economic from '../../table-config/economic';

import classOfWorkerChartConfig from '../../chart-config/economic/class-of-worker';
import incomeAndBenefitsChartConfig from '../../chart-config/economic/income-and-benefits';
import commuteToWorkChartConfig from '../../chart-config/economic/commute-to-work';
import occupationChartConfig from '../../chart-config/economic/occupation';
import ratioOfIncomeToPovertyLevelChartConfig from '../../chart-config/economic/ratio-of-income-to-poverty-level';


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
  // arguments
  model: {},

  // properties
  profile: controller('profile'),

  // - row configs
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

  // - chart configs
  classOfWorkerChartConfig,
  incomeAndBenefitsChartConfig,
  commuteToWorkChartConfig,
  occupationChartConfig,
  ratioOfIncomeToPovertyLevelChartConfig,


});
