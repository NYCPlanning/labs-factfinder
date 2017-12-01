import Ember from 'ember';
import { computed } from 'ember-decorators/object';

import householdType from '../../table-config/social/household-type';
import relationshipToHeadOfHousehold from '../../table-config/social/relationship-to-head-of-household';
import maritalStatus from '../../table-config/social/marital-status';
import grandparents from '../../table-config/social/grandparents';
import schoolEnrollment from '../../table-config/social/school-enrollment';
import educationalAttainment from '../../table-config/social/educational-attainment';
import veteranStatus from '../../table-config/social/veteran-status';
import disabilityStatusOfCnp from '../../table-config/social/disability-status-of-cnp';
import residence1YearAgo from '../../table-config/social/residence-1-year-ago';
import placeOfBirth from '../../table-config/social/place-of-birth';
import citizenshipStatus from '../../table-config/social/citizenship-status';
import yearOfEntry from '../../table-config/social/year-of-entry';
import languageSpokenAtHome from '../../table-config/social/language-spoken-at-home';
import ancestry from '../../table-config/social/ancestry';

import householdTypeChartConfig from '../../chart-config/social/household-type';
import schoolEnrollmentChartConfig from '../../chart-config/social/school-enrollment';
import educationalAttainmentChartConfig from '../../chart-config/social/educational-attainment';
import residence1YearAgoChartConfig from '../../chart-config/social/residence-1-year-ago';
import placeOfBirthChartConfig from '../../chart-config/social/place-of-birth';
import foreignBornChartConfig from '../../chart-config/social/foreign-born';

const { inject: { controller } } = Ember;

export default Ember.Controller.extend({
  householdType,
  relationshipToHeadOfHousehold,
  maritalStatus,
  grandparents,
  schoolEnrollment,
  educationalAttainment,
  veteranStatus,
  disabilityStatusOfCnp,
  residence1YearAgo,
  placeOfBirth,
  citizenshipStatus,
  yearOfEntry,
  languageSpokenAtHome,
  ancestry,

  householdTypeChartConfig,
  schoolEnrollmentChartConfig,
  educationalAttainmentChartConfig,
  residence1YearAgoChartConfig,
  placeOfBirthChartConfig,
  foreignBornChartConfig,

  profile: controller('profile'),

  @computed('model')
  currentData(model) {
    return model.y2011_2015;
  },


});
