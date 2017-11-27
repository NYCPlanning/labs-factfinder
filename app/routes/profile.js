import Ember from 'ember';
import fetch from 'fetch';

const { service } = Ember.inject;

const SELECTION_API_URL = (id) => {
  return `http://localhost:4000/selection/${id}`;
};

export default Ember.Route.extend({
  selection: service(),

  queryParams: {
    comparator: {
      refreshModel: true,
    },
  },

  // beforeModel({ params: { profile: { id } } }) {
  //   console.log(id);
  //   const current = this.get('selection.current');
  //
  //   if (isEmpty(current.features)) {
  //     this.transitionTo('index');
  //   }
  // },

  model({ id }) {
    console.log(id);
    const selection = this.get('selection');

    return fetch(SELECTION_API_URL(id))
      .then(response => response.json())
      .then(({ features }) => {
        selection.set('current', { type: 'FeatureCollection', features });
        return true;
      });
  },
});
