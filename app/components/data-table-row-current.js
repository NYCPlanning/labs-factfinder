import Ember from 'ember';
import { computed } from 'ember-decorators/object';

export default Ember.Component.extend({
  mode: 'current',
  reliability: false,
  comparison: true,

  tagName: 'tr',
  classNameBindings: ['getClassNames'],

  // (eq data.sum 0)
  // (gte data.cv 20)
  @computed('data.sum')
  isSumZero(sum) {
    return !!sum;
  },

  @computed('rowconfig')
  getClassNames(rowconfig) {
    const classes = [];

    if (rowconfig.highlight) {
      classes.push('row-highlight');
    }

    if (rowconfig.indent) {
      classes.push(`row-indent-x${rowconfig.indent}`);
    }

    return classes.join(' ');
  },
});
