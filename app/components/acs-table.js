import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Component.extend({
  mode: 'current',
  reliability: false,
  comparison: true,
  classNames: 'acs-table',

  windowResize: service(),

  actions: {
    handleCopy() {
      const [el] = this.get('element').getElementsByClassName('table-scroll');
      const body = document.body;
      let range;
      let sel;
      if (document.createRange && window.getSelection) {
        range = document.createRange();
        sel = window.getSelection();
        sel.removeAllRanges();
        try {
          range.selectNodeContents(el);
          sel.addRange(range);
        } catch (e) {
          range.selectNode(el);
          sel.addRange(range);
        }
      } else if (body.createTextRange) {
        range = body.createTextRange();
        range.moveToElementText(el);
        range.select();
      }

      document.execCommand('copy');
    },
  },

  didInsertElement() {
    this.$('.table-scroll').on('scroll', function() {
      const thisOffset = $(this).offset();
      const tableOffset = $(this).find('.data-table').offset();
      const offset = tableOffset.left - thisOffset.left;
      $(this).parents('.acs-table').find('.header-table').css({ marginLeft: offset });

      // const offset = $(this).find('.data-table').offset();
      // $(this).find('.sticky-element--sticky table').offset({ left: offset.left });
    });

    this.get('windowResize').on('didResize', () => {
      const tableWidth = this.$().find('.table-scroll').width();
      this.$().find('.sticky-element--sticky').width(tableWidth);
    });
  },

});
