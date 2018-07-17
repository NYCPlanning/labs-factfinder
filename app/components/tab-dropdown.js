import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from 'ember-decorators/object';

export default Component.extend({
  isOpen: false,

  metrics: service(),

  dropdown: '',

  demographicItems: [
    { anchor: '#sex-and-age', title: 'Age and Sex' },
    { anchor: '#mutually-exclusive-race-hispanic-origin', title: 'Mutually Exclusive Race / Hispanic Origin' },
    { anchor: '#hispanic-subgroup', title: 'Hispanic Subgroup' },
    { anchor: '#asian-subgroup', title: 'Asian Subgroup' },
  ],

  socialItems: [
    { anchor: '#household-type', title: 'Household Type' },
    { anchor: '#relationship-to-head-of-household', title: 'Relationship To Head Of Household (Householder)' },
    { anchor: '#grandparents', title: 'Grandparents' },
    { anchor: '#school-enrollment', title: 'School Enrollment' },
    { anchor: '#educational-attainment', title: 'Educational Attainment (Highest Grade Completed)' },
    { anchor: '#veteran-status', title: 'Veteran Status' },
    { anchor: '#disability-status-of-the-civilian-noninstitutionalized-population', title: 'Disability Status Of The Civilian Noninstitutionalized Population' },
    { anchor: '#residence-1-year-ago', title: 'Residence 1 Year Ago' },
    { anchor: '#place-of-birth', title: 'Place Of Birth' },
    { anchor: '#us-citizenship-status', title: 'U.S. Citizenship Status' },
    { anchor: '#year-of-entry', title: 'Year Of Entry' },
    { anchor: '#language-spoken-at-home', title: 'Language Spoken At Home' },
    { anchor: '#ancestry', title: 'Ancestry' },
  ],

  economicItems: [
    { anchor: '#employment-status', title: 'Employment Status' },
    { anchor: '#commute-to-work', title: 'Commute to Work' },
    { anchor: '#occupation', title: 'Occupation' },
    { anchor: '#industry', title: 'Industry' },
    { anchor: '#class-of-worker', title: 'Class of Worker' },
    { anchor: '#income-and-benefits', title: 'Income and Benefits' },
    { anchor: '#earnings', title: 'Earnings' },
    { anchor: '#health-insurance-coverage', title: 'Health Insurance Coverage' },
    { anchor: '#income-in-the-past-12-months-below-poverty-level', title: 'Income in the Past 12 Months Below Poverty Level' },
    { anchor: '#ratio-of-income-to-poverty-level', title: 'Ratio of Income to Poverty Level' },
  ],

  housingItems: [
    { anchor: '#housing-occupancy', title: 'Housing Occupancy' },
    { anchor: '#units-in-structure', title: 'Units in Structure' },
    { anchor: '#year-structure-built', title: 'Year Structure Built' },
    { anchor: '#rooms', title: 'Rooms' },
    { anchor: '#housing-tenure', title: 'Housing Tenure' },
    { anchor: '#year-householder-moved-into-unit', title: 'Year Householder Moved Into Unit' },
    { anchor: '#vehicles-available', title: 'Vehicles Available' },
    { anchor: '#occupants-per-room', title: 'Occupants per Room' },
    { anchor: '#value', title: 'Value' },
    { anchor: '#mortgage-status', title: 'Mortgage Status' },
    { anchor: '#selected-monthly-owner-costs-as-a-percentage-of-household-income', title: 'Selected Monthly Owner Costs as a Percentage of Household Income' },
    { anchor: '#gross-rent', title: 'Gross Rent' },
    { anchor: '#gross-rent-as-a-percentage-of-household-income', title: 'Gross Rent as a Percentage of Household Income (GRAPI)' },
  ],

  @computed('dropdown')
  dropdownItems() {
    const demographicItems = this.get('demographicItems');
    const socialItems = this.get('socialItems');
    const economicItems = this.get('economicItems');
    const housingItems = this.get('housingItems');

    const dropdown = this.get('dropdown');

    if (dropdown === 'demographic') {
      return demographicItems;
    }
    if (dropdown === 'social') {
      return socialItems;
    }
    if (dropdown === 'economic') {
      return economicItems;
    }
    if (dropdown === 'housing') {
      return housingItems;
    }

    return null;
  },

  actions: {
    closeTabDropdown() {
      this.set('isOpen', false);
    },

    toggleDropdown() {
      this.get('metrics').trackEvent('GoogleAnalytics', {
        eventCategory: 'Profile Navigation',
        eventAction: `${this.get('isOpen') ? 'Closed' : 'Opened'} dropdown`,
        eventLabel: this.get('tabName'),
      });

      this.set('isOpen', !this.get('isOpen'));
    },

    sendAnalytics(eventAction, eventLabel) {
      this.get('metrics').trackEvent('GoogleAnalytics', {
        eventCategory: 'Profile Navigation',
        eventAction,
        eventLabel,
      });
    },
  },

});
