import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  mode: 'current',
  reliability: false,
  comparison: true,
  isSelected: false,
  data: {}, // model object with specific properties
  rowConfig: {}, // model's row configuration object
  rowConfigKeysFound: [],

  tagName: 'tr',
  classNameBindings: ['getClassNames'],

  getClassNames: computed('rowConfig', 'isSelected', function () {
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

  noPriorData: computed('data.previous.sum', function () {
    const { 'data.previous': previous } = this.getProperties('data.previous');
    if (
      (previous &&
        (typeof previous.sum === 'undefined' || previous.sum === null)) ||
      typeof previous === 'undefined'
    ) {
      return true;
    }
    return false;
  }),

  displayEmptyCell: computed('rowConfig', 'pop', function () {
    const rowConfig = this.get('rowConfig');

    for (const key in rowConfig) {
      if (rowConfig[key] === 'pop') {
        this.rowConfigKeysFound.push(rowConfig[key]);
      }
    }

    if (this.rowConfigKeysFound.length) {
      console.log(`this.rowConfigKeysFound`, this.rowConfigKeysFound);
      return true;
    }
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
