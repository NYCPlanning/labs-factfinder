import Component from '@ember/component';

export default Component.extend({
  tagName: 'header',
  classNames: ['top-bar site-header'],

  closed: true,

  responsiveNav: false,

  responsiveSize: 'large',
});
