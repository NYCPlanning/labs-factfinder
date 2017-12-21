import Ember from 'ember';
import { computed } from 'ember-decorators/object';

const { service } = Ember.inject;

export default Ember.Component.extend({
  mode: 'current',
  reliability: false,
  comparison: true,

  year1: 'y2012_2016',
  year2: 'y2006_2010',
  category: '',

  @computed('year1')
  t1(year1) {
    return this.get(`model.${year1}`);
  },

  @computed('year2')
  t2(year2) {
    return this.get(`model.${year2}`);
  },

  @computed('media.isLarge')
  stickyTop(isLarge) {
    return isLarge ? 175 : 0;
  },

  classNames: 'data-table',

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
      $(this).parents('.data-table').find('.header-table').css({ marginLeft: offset });
    });

    this.get('windowResize').on('didResize', () => {
      const tableWidth = this.$().find('.table-scroll').width();
      this.$().find('.sticky-element--sticky').width(tableWidth);
    });
  },

});
