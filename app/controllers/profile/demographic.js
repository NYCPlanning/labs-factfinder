import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line

import sexAge from '../../table-config/demographic/sex-age';
import raceGroup from '../../table-config/demographic/race-group';
import hispanicSubgroup from '../../table-config/demographic/hispanic-subgroup';
import asianSubgroup from '../../table-config/demographic/asian-subgroup';

const { inject: { controller } } = Ember;

export default Ember.Controller.extend({
  sexAge,
  raceGroup,
  hispanicSubgroup,
  asianSubgroup,

  profile: controller('profile'),

  @computed('model')
  currentData(model) {
    return model.y2011_2015;
  },

  @computed('currentData')
  agePopDist(currentData) {
    const d = currentData.poppyramid_only;
    const variables = [
      'pop0t5',
      'pop5t9',
      'pop10t14',
      'pop15t19',
      'pop20t24',
      'pop25t29',
      'pop30t34',
      'pop35t39',
      'pop40t44',
      'pop45t49',
      'pop50t54',
      'pop55t59',
      'pop60t64',
      'pop65t69',
      'pop70t74',
      'pop75t79',
      'pop80t84',
      'pop85pl',
    ];

    const pyramidData = variables.map((variable) => {
      const male = d[`m${variable}`];
      const female = d[`f${variable}`];
      return {
        group: variable,
        male,
        female,
      };
    });

    return {
      totals: {
        male: currentData.sex_and_age.male,
        female: currentData.sex_and_age.fem,
      },
      pyramidData,
    };
  },

  raceGroupProfile: Ember.computed('model', function() {
    const d = this.get('model.y2011_2015.mutually_exclusive_race_hispanic_origin');
    const config = [
      {
        property: 'hsp1',
        label: 'Hispanic',
      },
      {
        property: 'wtnh',
        label: 'White nonhispanic',
      },
      {
        property: 'blnh',
        label: 'Black nonhispanic',
      },
      {
        property: 'asnnh',
        label: 'Asian nonhispanic',
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
      // classValue: label.replace(/\s+/g, ''),
    }));

    return profile;
  }),


});
