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

  profile: controller('profile'),

  @computed('model')
  currentData(model) {
    return model.y2011_2015;
  },


  housingTenureProfile: Ember.computed('model', function() {
    const d = this.get('model.y2011_2015.housing_tenure');

    const config = [
      {
        property: 'oochu1',
        label: 'Owner-occupied',
      },
      {
        property: 'rochu',
        label: 'Renter-occupied',
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
    }));

    return profile;
  }),

});
