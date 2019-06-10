import Controller, { inject as controller } from '@ember/controller';

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

export default Controller.extend({
  // arguments
  model: {},

  // properties
  profile: controller('profile'),

  // - row configs
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

  // - chart configs
  grossRentGrapiChartConfig,
  grossRentChartConfig,
  housingTenureChartConfig,
  valueChartConfig,
  vehiclesAvailableChartConfig,
});
