import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  // state
  mode: 'current',
  reliability: false,
  comparison: true,
  isSelected: false,
  rowConfig: {},
  data: {},

  // configuration
  tagName: 'tr',
  classNameBindings: ['getClassNames'],

  // computeds
  getClassNames: computed('rowConfig', 'isSelected', function() {
    const { rowConfig } = this.getProperties('rowConfig', 'isSelected');
    const classes = [];

    if (rowConfig.highlight) {
      classes.push('row-highlight');
    }

    if (rowConfig.indent) {
      classes.push(`row-indent-x${rowConfig.indent}`);
    }

    if (this.isSelected) {
      classes.push('is-selected');
    }

    return classes.join(' ');
  }),

  noPriorData: computed('data.previous.sum', function() {
    const { 'data.previous': previous } = this.getProperties('data.previous');
    if ( previous && typeof previous.sum === 'undefined') {
      return true
    }
    return false
  }),

  actions: {
    showData() {
      window.logModel = this.get('data');
    },
  },

  click() {
    this.set('isSelected', !this.isSelected);
  },
});
