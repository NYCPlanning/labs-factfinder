import Component from '@ember/component';

export default Component.extend({
  tagName: '',
  open: true,

  actions: {
    toggleModal() {
      this.toggleProperty('open');
    },
  },
});
