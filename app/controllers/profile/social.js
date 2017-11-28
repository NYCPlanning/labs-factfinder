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

  profile: controller('profile'),

  @computed('model')
  currentData(model) {
    return model.y2011_2015;
  },

  educationalAttainmentProfile: Ember.computed('model', function() {
    const d = this.get('model.y2011_2015.educational_attainment__highest_grade_completed_');

    const config = [
      {
        property: 'ea_lthsgr',
        label: 'Less than high school graduate',
      },
      {
        property: 'ea_hscgrd',
        label: 'High school graduate (includes equivalency)',
      },
      {
        property: 'ea_bchdh',
        label: 'Bachelor\'s degree or higher',
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
