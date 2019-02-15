import Controller, { inject as controller } from '@ember/controller';
import { computed } from '@ember/object';

import social from '../../table-config/social';

import householdTypeChartConfig from '../../chart-config/social/household-type';
import schoolEnrollmentChartConfig from '../../chart-config/social/school-enrollment';
import educationalAttainmentChartConfig from '../../chart-config/social/educational-attainment';
import residence1YearAgoChartConfig from '../../chart-config/social/residence-1-year-ago';
import placeOfBirthChartConfig from '../../chart-config/social/place-of-birth';
import foreignBornChartConfig from '../../chart-config/social/foreign-born';

const {
  ancestry,
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
  ancestry,
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

  educationalAttainmentChartConfig,
  foreignBornChartConfig,
  householdTypeChartConfig,
  placeOfBirthChartConfig,
  residence1YearAgoChartConfig,
  schoolEnrollmentChartConfig,

  profile: controller('profile'),

  currentData: computed('model', function() {
    const model = this.get('model');
    return model.y2013_2017;
  }),

});
