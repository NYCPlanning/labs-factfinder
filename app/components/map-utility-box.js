import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line

const { service } = Ember.inject;
const { alias } = Ember.computed;

export default Ember.Component.extend({
  selection: service(),

  classNames: ['map-utility-box'],

  selectionCount: alias('selection.selectedCount'),
  mode: 'direct-select',

  summaryLevel: alias('selection.summaryLevel'),

  @computed('selection.selectedCount')
  reportButtonClasses(count) {
    return count > 0 ? 'button large expanded view-report-button' : 'button large expanded disabled view-report-button';
  },

  actions: {
    clearSelection() {
      this.get('selection').clearSelection();
    },
    handleDrawButtonClick() {
      this.sendAction('handleDrawButtonClick');
    },
  },
});
