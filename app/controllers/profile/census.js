import Ember from 'ember';
import popDensity from '../../table-config/decennial/pop-density';
import sexAge from '../../table-config/decennial/sex-age';
import mutuallyExclRaceHisp from '../../table-config/decennial/mutually-excl-race-hisp';
import hispSubgroup from '../../table-config/decennial/hisp-subgroup';
import asianSubgroup from '../../table-config/decennial/asian-subgroup';
import headHousehold from '../../table-config/decennial/head-household';
import householdType from '../../table-config/decennial/household-type';
import housingOccupancy from '../../table-config/decennial/housing-occupancy';
import housingTenure from '../../table-config/decennial/housing-tenure';
import tenureAgeHouseholder from '../../table-config/decennial/tenure-age-householder';
import householdSize from '../../table-config/decennial/household-size';

export default Ember.Controller.extend({
  popDensity,
  sexAge,
  mutuallyExclRaceHisp,
  hispSubgroup,
  asianSubgroup,
  headHousehold,
  householdType,
  housingOccupancy,
  housingTenure,
  tenureAgeHouseholder,
  householdSize,
});
