import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import bbox from 'npm:@turf/bbox';

import sources from '../sources';
import selectedFeatures from '../layers/selected-features';
import bkQnMhBoundarySource from '../sources/bk-qn-mh-boundary';
import bkQnMhBoundaryLayer from '../layers/bk-qn-mh-boundary';
import trackEvent from '../utils/track-event';

const selectedFillLayer = selectedFeatures.fill;

const { service } = Ember.inject;
const { alias } = Ember.computed;

export default Ember.Component.extend({

  selection: service(),
  metrics: service(),

  @computed()
  currentProfile() {
    return this.get('profile').target.currentRouteName.split('.')[1];
  },

  bkQnMhBoundarySource,
  bkQnMhBoundaryLayer,

  sources,
  zoom: 10,
  center: [-73.916016, 40.697299],

  @computed('selection.current')
  selectedSource(current) {
    return {
      type: 'geojson',
      data: current,
    };
  },

  selectionCount: alias('selection.selectedCount'),
  summaryLevel: alias('selection.summaryLevel'),

  selectedFillLayer,

  fitBounds(map) {
    const FC = this.get('selection').current;
    map.fitBounds(bbox(FC), {
      padding: 20,
    });
  },

  actions: {
    handleMapLoad(map) {
      this.fitBounds(map);
    },

    handleResize(e) {
      this.fitBounds(e.target);
    },

    @trackEvent('Profile Navigation', 'Returned to Selection', 'static-map')
    backToSelection() {
    },

    toggleReliability() {
      this.get('metrics').trackEvent('GoogleAnalytics', {
        eventCategory: 'Profile Settings',
        eventAction: `${this.get('profile.reliability') ? 'Turned off' : 'Turned on'} reliability data`,
      });

      this.set('profile.reliability', !this.get('profile.reliability'));
    },

    toggleCharts() {
      this.get('metrics').trackEvent('GoogleAnalytics', {
        eventCategory: 'Profile Settings',
        eventAction: `${this.get('profile.charts') ? 'Turned off' : 'Turned on'} charts`,
      });

      this.set('profile.charts', !this.get('profile.charts'));
    },

    setMode(mode) {
      this.get('metrics').trackEvent('GoogleAnalytics', {
        eventCategory: 'Profile Settings',
        eventAction: `Switched Mode: ${mode}`,
      });

      this.set('mode', mode);
    },
  },

});
