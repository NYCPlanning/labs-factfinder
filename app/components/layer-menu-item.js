import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  init(...args) {
    this._super(...args);

    const recordIdentifier = this.get('for');
    const foundRecord = this.get('store').peekRecord('layer-group', recordIdentifier);

    if (foundRecord) {
      foundRecord.set('layers', foundRecord.layers.map(layer => {
        if(layer.id === 'choropleth-nta-fill') {
          layer.paint = {
            ...layer.paint,
            ...this.defaultFill
          }
        }
        if(layer.id === 'choropleth-nta-line') {
          layer.paint = {
            ...layer.paint,
            ...this.defaultLine
          }
        }
        return layer
      }))
      this.set('model', foundRecord);
    }
  },

  store: service(),

  for: '',
  
  actions: {
    updatePaintFor(layerId, newPaintStyle) {
      const model = this.get('model')
      model.set('layers', model.layers.map(layer => {
        if(layer.id === layerId) {
          layer.paint = {
            ...layer.paint,
            ...newPaintStyle
          }
        }
        return layer
      }))
    },
    toggle() {
      this.get('model').toggleProperty('visible')
    }
  }
});
