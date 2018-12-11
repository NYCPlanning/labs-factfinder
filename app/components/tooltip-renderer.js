import Component from '@ember/component';
import { computed } from '@ember/object';
import mustache from 'mustache';

export default Component.extend({
  renderedText: computed('feature', 'template', function() {
    const properties = this.get('feature.properties');
    const template = this.get('template');

    return mustache.render(template, properties);
  }),

  feature: {},

  template: '',
});
