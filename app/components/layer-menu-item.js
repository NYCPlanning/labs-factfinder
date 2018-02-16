import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line

const { service } = Ember.inject;
const { alias } = Ember.computed;

export default Ember.Component.extend({
  registeredLayers: service(),
  metrics: service(),

  visible: alias('layer.visible'),
  // tagName: 'li',
  classNames: 'layer-menu-item',

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
      this.get('metrics').trackEvent('GoogleAnalytics', {
        eventCategory: 'Advanced Options',
        eventAction: `${this.get('visible') ? 'Turned off' : 'Turned on'} ${this.get('layer.config.title')}`,
      });

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
