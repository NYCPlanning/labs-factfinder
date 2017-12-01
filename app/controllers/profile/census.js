import Ember from 'ember';
import sexAge from '../../table-config/decennial/sex-age';
import mutuallyExclRaceHisp from '../../table-config/decennial/mutually-excl-race-hisp';
import hispSubgroup from '../../table-config/decennial/hisp-subgroup';
import asianSubgroup from '../../table-config/decennial/asian-subgroup';
import headHousehold from '../../table-config/decennial/head-household';
import householdType from '../../table-config/decennial/household-type';
import housingOccupancy from '../../table-config/decennial/housing-occupancy';

export default Ember.Controller.extend({
  sexAge,
  mutuallyExclRaceHisp,
  hispSubgroup,
  asianSubgroup,
  headHousehold,
  householdType,
  housingOccupancy,
});
