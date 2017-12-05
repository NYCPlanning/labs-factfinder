import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line

const { service } = Ember.inject;
const { alias } = Ember.computed;

export default Ember.Component.extend({
  registeredLayers: service(),
  visible: alias('layer.visible'),
  tagName: 'li',

  @computed('for', 'registeredLayers.layers.@each')
  layer(layerId, layers) {
    return layers.findBy('config.id', layerId);
  },

  title: alias('layer.config.title'),

  legendIcon: alias('layer.config.legendIcon'),

  legendColor: alias('layer.config.legendColor'),

  titleTooltip: alias('layer.config.titleTooltip'),

  actions: {

    toggleVisibility() {
      this.toggleProperty('visible');
    },
    updateSql(method, column, value) {
      const layer = this.get('layer');
      layer.send('updateSql', method, column, value);
    },
    updatePaintFor(id, paintObject) {
      const layer = this.get('layer');
      layer.send('updatePaintFor', id, paintObject);
    },
  },
});
