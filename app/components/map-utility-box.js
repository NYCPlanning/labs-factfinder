import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line

const { service } = Ember.inject;
const { alias } = Ember.computed;

export default Ember.Component.extend({
  selection: service(),

  classNames: ['map-utility-box'],

  selectionCount: alias('selection.selectedCount'),
  mode: 'direct-select',

  actions: {
    clearSelection() {
      this.get('selection').clearSelection();
    },
    handleSummaryLevelToggle(summaryLevel) {
      this.get('selection').handleSummaryLevelToggle(summaryLevel);
    },
  },
});
