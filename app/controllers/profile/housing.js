import Ember from 'ember';
import { computed } from 'ember-decorators/object';

import housing from '../../table-config/housing';

import grossRentGrapiChartConfig from '../../chart-config/housing/gross-rent-grapi';
import grossRentChartConfig from '../../chart-config/housing/gross-rent';
import housingTenureChartConfig from '../../chart-config/housing/housing-tenure';
import valueChartConfig from '../../chart-config/housing/value';
import vehiclesAvailableChartConfig from '../../chart-config/housing/vehicles-available';

const {
  grossRentAsAPercentageOfHouseholdIncomeGrapi,
  selectedMonthlyOwnerCostsAsAPercentageOfHouseholdIncomeSmocapi,
  grossRent,
  unitsInStructure,
  housingOccupancy,
  value,
  housingTenure,
  vehiclesAvailable,
  mortgageStatus,
  yearHouseholderMovedIntoUnit,
  occupantsPerRoom,
  yearStructureBuilt,
  rooms,
} = housing;

const { inject: { controller } } = Ember;

export default Ember.Controller.extend({
  grossRent,
  grossRentAsAPercentageOfHouseholdIncomeGrapi,
  housingOccupancy,
  housingTenure,
  mortgageStatus,
  occupantsPerRoom,
  rooms,
  selectedMonthlyOwnerCostsAsAPercentageOfHouseholdIncomeSmocapi,
  unitsInStructure,
  value,
  vehiclesAvailable,
  yearHouseholderMovedIntoUnit,
  yearStructureBuilt,

  grossRentGrapiChartConfig,
  grossRentChartConfig,
  housingTenureChartConfig,
  valueChartConfig,
  vehiclesAvailableChartConfig,

  profile: controller('profile'),

  @computed('model')
  currentData(model) {
    return model.y2012_2016;
  },


});
