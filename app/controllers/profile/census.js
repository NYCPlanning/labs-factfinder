import Ember from 'ember';
import sexAge from '../../table-config/decennial/sex-age';
import raceGroup from '../../table-config/demographic/race-group';
import hispanicSubgroup from '../../table-config/demographic/hispanic-subgroup';
import asianSubgroup from '../../table-config/demographic/asian-subgroup';

export default Ember.Controller.extend({
  sexAge,
  raceGroup,
  hispanicSubgroup,
  asianSubgroup,
});
