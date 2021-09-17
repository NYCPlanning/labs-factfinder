import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  mode: 'previous',
  reliability: false,
  comparison: true,
  isSelected: false,
  data: {}, // model object with specific properties
  rowConfig: {}, // model's row configuration object

  tagName: 'tr',
  classNameBindings: ['getClassNames'],

  getClassNames: computed('rowConfig', 'isSelected', function() {
    const rowConfig = this.get('rowConfig');
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

  actions: {
    showData() {
      window.logModel = this.get('data');
    },
  },

  click() {
    this.set('isSelected', !this.isSelected);
  },
});
