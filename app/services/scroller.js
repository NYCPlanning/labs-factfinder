import $ from 'jquery';
import RSVP from 'rsvp';
import Scroller from 'ember-scroll-to/services/scroller';

export default Scroller.extend({
  scrollVertical (target, opts = {}) {
    return new RSVP.Promise((resolve, reject) => {
      // workaround for issue https://github.com/NYCPlanning/labs-nyc-factfinder/issues/304
      const scrollable = $('#profile-content');
      scrollable.animate(
        {
          scrollTop: (scrollable.scrollTop() - scrollable.offset().top) + this.getVerticalCoord(target, opts.offset),
        },
        opts.duration || this.get('duration'),
        opts.easing || this.get('easing'),
        opts.complete,
      )
        .promise()
        .then(resolve, reject);
    });
  },
});
