import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import fetch from 'fetch';

const { service } = Ember.inject;
const { alias } = Ember.computed;

export default Ember.Component.extend({
  selection: service(),
  router: service(),

  classNames: ['map-utility-box'],

  selectionCount: alias('selection.selectedCount'),
  mode: 'direct-select',

  summaryLevel: alias('selection.summaryLevel'),

  @computed('selection.selectedCount')
  profileButtonClasses(count) {
    return count > 0 ? 'button large expanded view-profile-button' : 'button large expanded disabled view-profile-button';
  },

  actions: {
    clearSelection() {
      this.get('selection').clearSelection();
    },
    handleDrawButtonClick() {
      this.sendAction('handleDrawButtonClick');
    },
    transitionTo() {},
    generateProfileId() {
      const ids = this.get('selection.current.features')
        .mapBy('properties.geoid');
      
      // fetch()
    },
  },
});
