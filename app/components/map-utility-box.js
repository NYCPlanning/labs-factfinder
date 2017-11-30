import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import { task } from 'ember-concurrency';
import fetch from 'fetch';
import Environment from '../config/environment';

const { service } = Ember.inject;
const { alias } = Ember.computed;
const { SupportServiceHost } = Environment;

export default Ember.Component.extend({
  selection: service(),
  selectionHelper: service(),
  router: service(),

  classNames: ['map-utility-box'],

  selectionCount: alias('selection.selectedCount'),
  mode: 'direct-select',
  advanced: true,

  summaryLevel: alias('selection.summaryLevel'),

  @computed('selection.selectedCount', 'generateProfileId.isIdle')
  profileButtonClasses(count, isIdle) {
    return (count > 0 && isIdle) ? 'button large expanded view-profile-button' : 'button large expanded disabled view-profile-button';
  },

  generateProfileId: task(function* (type, geoids) {
    const postBody = {
      type,
      geoids,
    };

    const { id } = yield fetch(`${SupportServiceHost}/selection`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(postBody),
    })
      .then(d => d.json());

    yield this.get('router')
      .transitionTo('profile', id, { queryParams: { mode: 'current', comparator: '0' } });
  }).restartable(),

  actions: {
    clearSelection() {
      this.get('selection').clearSelection();
    },
    handleDrawButtonClick() {
      this.sendAction('handleDrawButtonClick');
    },
    transitionTo() {},
    generateProfileId() {
      const type = this.get('summaryLevel');
      const geoids = this.get('selection.current.features')
        .mapBy('properties.geoid');

      this.get('generateProfileId').perform(type, geoids);
    },

    toggleSelectionHelper() {
      this.get('selectionHelper').toggleSelectionHelper();
    },

    handleSliderChange(sliderValue, variable) {
      this.get('selectionHelper').updateHelperRange(variable, sliderValue);
    },

    toggleEnabled(variable) {
      this.get('selectionHelper').toggleEnabled(variable);
    },

    addHighlightedToSelection() {
      this.get('selectionHelper').addHighlightedToSelection();
    },
  },
});
