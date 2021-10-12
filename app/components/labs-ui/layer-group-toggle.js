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
      window.dataLayer = window.dataLayer || [];
      if (this.get('label') === "Thematic Map") {
        window.dataLayer.push({
          'event' : 'toggle_thematic_map',
          'toggle' : this.get('active')
        });
        this.get('metrics').trackEvent('GoogleAnalytics', {
          eventCategory: 'Thematic Map',
          eventAction: 'Toggle Thematic Map',
          eventLabel: this.get('active'),
        });
      } else if (["Subways", "ZIP Codes", "Neighborhood Tabulation Areas (NTAs)", "Community Districts (CDs)", "Community District Tabulation Areas (CDTAs)", "NYC Council Districts"].includes(this.get('label'))){
        // Only count toggle on, not toggle off
        if (this.get('active')) {
          window.dataLayer.push({
            'event' : 'toggle_map_layer',
            'toggle_map_layer' : this.get('label')
          });
          this.get('metrics').trackEvent('GoogleAnalytics', {
            eventCategory: 'Add Map Layers',
            eventAction: 'Toggle Map Layer',
            eventLabel: this.get('label'),
          });
        }
      } else {
        // This should not happen, but if it does, the data will be recorded
        window.dataLayer.push({
          'event' : 'uncategorized_event',
          'uncatogorized_event' : this.get('label'),
        });
        this.get('metrics').trackEvent('GoogleAnalytics', {
          eventCategory: 'Uncategorized Event',
          eventAction: 'Uncategorized Event',
          eventLabel: this.get('label'),
        });
      }
    },
  },
});
