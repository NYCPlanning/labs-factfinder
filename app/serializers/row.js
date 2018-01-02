import DS from 'ember-data';
import Ember from 'ember';

export default DS.JSONSerializer.extend({
  normalizeQueryResponse(store, primaryModelClass, payload, queryId, requestType) {
    return this._super(store,
      primaryModelClass,
      payload,
      queryId,
      requestType);
  },
});
