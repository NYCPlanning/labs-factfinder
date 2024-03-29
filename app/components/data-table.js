import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  media: service('media'),
  /* arguments */
  mode: 'current',
  reliability: false,
  comparison: true,
  config: {},
  model: {},
  /* end arguments */

  category: '',

  stickyTop: computed('media.isLarge', function() {
    const { 'media.isLarge': isLarge } = this.getProperties('media.isLarge');

    return isLarge ? 127 : 0;
  }),

  classNames: 'data-table',

  windowResize: service(),
  metrics: service(),

  actions: {
    handleCopy() {
      const [el] = this.get('element').getElementsByClassName('wrapper-for-copy');

      if (!navigator.clipboard) {
        alert("Clipboard copy feature works best on Chrome or Safari browsers ");
        return
      }

      navigator.permissions.query({name: 'clipboard-write'}).then((result) => {
        try {
          if (result.state === 'granted' || result.state === 'prompt') {
            navigator.clipboard.writeText(el.innerText);
          }

        } catch (e) {
          console.log('error in table copy ', e.name + '\n' + e.message);
        }
      });

      this.get('metrics').trackEvent('GoogleAnalytics', {
        eventCategory: 'Data',
        eventAction: 'Copy table to clipboard',
      });
    },
  },

  didInsertElement() {
    this.$('.table-scroll').on('scroll', function() {
      const thisOffset = $(this).offset(); // eslint-disable-line
      const tableOffset = $(this).find('.body-table').offset(); // eslint-disable-line
      const offset = tableOffset.left - thisOffset.left;
      $(this).parents('.data-table').find('.header-table').css({ marginLeft: offset }); // eslint-disable-line
    });

    this.get('windowResize').on('didResize', () => {
      if (!this.get('isDestroyed') || !this.get('isDestroying')) {
        const tableWidth = this.$().find('.table-scroll').width();
        this.$().find('.sticky-element--sticky').width(tableWidth);
      }
    });
  },

});
