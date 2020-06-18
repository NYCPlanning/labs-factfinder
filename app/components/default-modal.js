import Component from '@ember/component';
import { action } from '@ember/object';

export default Component.extend({
  tagName: '',
  open: true,

  actions: {
    toggleModal() {
      this.toggleProperty('open');
    },
  },
});
