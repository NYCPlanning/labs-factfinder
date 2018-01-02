import Ember from 'ember';
import { computed } from 'ember-decorators/object';

import grossRentGrapi from '../../table-config/housing/gross-rent-grapi';
import selectedMonthlyOwnerSmocapi from '../../table-config/housing/selected-monthly-owner-smocapi';
import grossRent from '../../table-config/housing/gross-rent';
import unitsInStructure from '../../table-config/housing/units-in-structure';
import housingOccupancy from '../../table-config/housing/housing-occupancy';
import value from '../../table-config/housing/value';
import housingTenure from '../../table-config/housing/housing-tenure';
import vehiclesAvailable from '../../table-config/housing/vehicles-available';
import mortgageStatus from '../../table-config/housing/mortgage-status';
import yearHouseholderMovedIntoUnit from '../../table-config/housing/year-householder-moved-into-unit';
import occupantsPerRoom from '../../table-config/housing/occupants-per-room';
import yearStructureBuilt from '../../table-config/housing/year-structure-built';
import rooms from '../../table-config/housing/rooms';

import grossRentGrapiChartConfig from '../../chart-config/housing/gross-rent-grapi';
import grossRentChartConfig from '../../chart-config/housing/gross-rent';
import housingTenureChartConfig from '../../chart-config/housing/housing-tenure';
import valueChartConfig from '../../chart-config/housing/value';
import vehiclesAvailableChartConfig from '../../chart-config/housing/vehicles-available';

const { inject: { controller } } = Ember;

export default Ember.Controller.extend({

  grossRentGrapi,
  selectedMonthlyOwnerSmocapi,
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
