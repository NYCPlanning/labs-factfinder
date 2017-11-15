import Ember from 'ember';

const { isEmpty } = Ember;
const { service } = Ember.inject;

export default Ember.Route.extend({
  selection: service(),

  beforeModel() {
    const current = this.get('selection.current');

    if (isEmpty(current.features)) {
      this.transitionTo('index');
    }
  },
});
