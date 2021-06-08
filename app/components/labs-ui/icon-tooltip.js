import Component from '@ember/component';

export default Component.extend({
  tagName: 'span',
  classNames: 'icon-tooltip',

  tip: '',
  side: 'top',
  icon: 'info-circle',
  transform: '',
  fixedWidth: false,
});
