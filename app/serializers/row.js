import DS from 'ember-data';

export default DS.JSONSerializer.extend({
  normalizeQueryResponse (store, primaryModelClass, payload, id, requestType) {
    const json = payload.map((row, i) => {
      const mutatedRow = row;
      mutatedRow.id = i;
      return mutatedRow;
    });

    return this._super(store, primaryModelClass, json, id, requestType);
  },
});
