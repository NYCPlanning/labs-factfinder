import Component from '@ember/component';

export default Component.extend({
  tagName: 'header',
  classNames: ['site-header'],

  ariaRole: 'banner',

  closed: true,

  responsiveNav: false,

  responsiveSize: 'large',
});
