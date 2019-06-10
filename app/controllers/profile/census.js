import Controller, { inject as controller } from '@ember/controller';

import decennial from '../../table-config/decennial';

const {
  populationDensity,
  sexAndAge,
  mutuallyExclusiveRaceHispanicOrigin,
  hispanicSubgroup,
  asianSubgroup,
  relationshipToHeadOfHouseholdHouseholder,
  householdType,
  housingOccupancy,
  housingTenure,
  tenureByAgeOfHouseholder,
  householdSize,
} = decennial;

export default Controller.extend({
  // arguments
  model: {},

  // properties
  profile: controller('profile'),

  // - row configs
  asianSubgroup,
  relationshipToHeadOfHouseholdHouseholder,
  hispanicSubgroup,
  householdSize,
  householdType,
  housingOccupancy,
  housingTenure,
  mutuallyExclusiveRaceHispanicOrigin,
  populationDensity,
  sexAndAge,
  tenureByAgeOfHouseholder,
});
