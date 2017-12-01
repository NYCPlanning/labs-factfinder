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

import classOfWorkerChartConfig from '../../chart-config/economic/class-of-worker';
import incomeAndBenefitsChartConfig from '../../chart-config/economic/income-and-benefits';
import commuteToWorkChartConfig from '../../chart-config/economic/commute-to-work';
import occupationChartConfig from '../../chart-config/economic/occupation';
import ratioOfIncomeToPovertyLevelChartConfig from '../../chart-config/economic/ratio-of-income-to-poverty-level';


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

  classOfWorkerChartConfig,
  incomeAndBenefitsChartConfig,
  commuteToWorkChartConfig,
  occupationChartConfig,
  ratioOfIncomeToPovertyLevelChartConfig,

  profile: controller('profile'),

  @computed('model')
  currentData(model) {
    return model.y2011_2015;
  },

});
