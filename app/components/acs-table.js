import Ember from 'ember';

export default Ember.Component.extend({
  scrollTable: null,
  mode: 'current',
  reliability: false,
  comparison: true,
  actions: {
    handleCopy() {
      const el = this.get('element').getElementsByTagName('table')[0];
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
});
