import Ember from 'ember';
import { computed } from 'ember-decorators/object'; 

const { alias } = Ember.computed;

// const getClassNames = (config) => {
//   console.log(config);
// };

export default Ember.Component.extend({
  tagName: 'tr',
  classNameBindings: ['getClassNames'],

  @computed('config')
  getClassNames(config) {
    const classes = [];

    if (config.highlight) {
      classes.push('row-highlight');
    }

    if (config.indent) {
      classes.push(`row-indent-x${config.indent}`);
    }

    return classes.join(',');
  },
});
