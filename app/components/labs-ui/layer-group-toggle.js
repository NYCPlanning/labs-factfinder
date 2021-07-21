import Component from '@ember/component';

export default Component.extend({
  init(...args) {
    this._super(...args);

    this.get('didInit')(this);

    this.set('icon', []);
  },

  classNames: ['layer-group-toggle'],
  classNameBindings: ['active'],

  label: null,

  tooltip: '',

  infoLink: '',

  infoLinkIcon: 'external-link-alt',

  tooltipIcon: 'info-circle',

  active: true,

  activeTooltip: '',

  activeTooltipIcon: 'exclamation-triangle',

  didInit() {},

  willDestroyHook() {},

  willDestroy() {
    this.get('willDestroyHook')(this);
  },

  actions: {
    toggle() {
      this.toggleProperty('active');
    },
  },
});
