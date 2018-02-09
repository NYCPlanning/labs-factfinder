import Ember from 'ember';
import { computed } from 'ember-decorators/object';

export default Ember.Component.extend({
  mode: 'current',
  reliability: false,
  comparison: true,

  tagName: 'tr',
  classNameBindings: ['getClassNames'],

  @computed('rowConfig')
  getClassNames(rowConfig) {
    const classes = [];

    if (rowConfig.highlight) {
      classes.push('row-highlight');
    }

    if (rowConfig.indent) {
      classes.push(`row-indent-x${rowConfig.indent}`);
    }

    return classes.join(' ');
  },

  actions: {
    showData() {
      console.log(this.get('data'));
    },
  },
});
