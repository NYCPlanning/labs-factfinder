import Controller, { inject as controller } from '@ember/controller';

import social from '../../table-config/social';

import householdTypeChartConfig from '../../chart-config/social/household-type';
import schoolEnrollmentChartConfig from '../../chart-config/social/school-enrollment';
import educationalAttainmentChartConfig from '../../chart-config/social/educational-attainment';
import residence1YearAgoChartConfig from '../../chart-config/social/residence-1-year-ago';
import placeOfBirthChartConfig from '../../chart-config/social/place-of-birth';
import foreignBornChartConfig from '../../chart-config/social/foreign-born';

const {
  ancestry,
  computersAndInternetUse,
  disabilityStatusOfTheCivilianNoninstitutionalizedPopulation,
  educationalAttainmentHighestGradeCompleted,
  grandparents,
  householdType,
  languageSpokenAtHome,
  maritalStatus,
  placeOfBirth,
  relationshipToHeadOfHouseholdHouseholder,
  residence1YearAgo,
  schoolEnrollment,
  uSCitizenshipStatus,
  veteranStatus,
  yearOfEntry,
} = social;

export default Controller.extend({
  // arguments
  model: {},

  // properties
  profile: controller('profile'),

  // - row configs
  ancestry,
  computersAndInternetUse,
  disabilityStatusOfTheCivilianNoninstitutionalizedPopulation,
  educationalAttainmentHighestGradeCompleted,
  grandparents,
  householdType,
  languageSpokenAtHome,
  maritalStatus,
  placeOfBirth,
  relationshipToHeadOfHouseholdHouseholder,
  residence1YearAgo,
  schoolEnrollment,
  uSCitizenshipStatus,
  veteranStatus,
  yearOfEntry,

  // - chart configs
  educationalAttainmentChartConfig,
  foreignBornChartConfig,
  householdTypeChartConfig,
  placeOfBirthChartConfig,
  residence1YearAgoChartConfig,
  schoolEnrollmentChartConfig,
});
