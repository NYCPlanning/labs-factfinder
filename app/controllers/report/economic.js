import Ember from 'ember';
import { computed } from 'ember-decorators/object';

import employmentStatus from '../../table-config/economic/employment-status';
import commuteToWork from '../../table-config/economic/commute-to-work';

const { inject: { controller } } = Ember;

export default Ember.Controller.extend({
  employmentStatus,
  commuteToWork,

  report: controller('report'),

  @computed('model')
  currentData(model) {
    return model.y2011_2015;
  },
});
