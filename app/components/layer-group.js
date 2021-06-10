import Ember from 'ember';
import { computed } from '@ember/object';
import { ParentMixin, ChildMixin } from 'ember-composability-tools';
import { copy } from 'ember-copy';
import carto from '../utils/carto';
import layout from '../templates/components/layer-group';

const { merge, set } = Ember;
const { service } = Ember.inject;
const { alias } = Ember.computed;
const { warn } = Ember.Logger;

// This is a component avaialble in our "mapbox composer" addon...
// we should consider replacing this with the addon or at least extending...
export default Ember.Component.extend({
  layout,

  init(...args) {
    this._super(...args);

    if (this.get('childComponents.length') > 1) {
      warn('Only one layer-control per layer is supported.');
    }
  },

  registeredLayers: service(),
  // mainMap: service(),

  tagName: '',
  qps: null,
  config: {},
  sql: '',
  visible: false,

  minzoom: computed('config.layers', function() {
    const { 'config.layers': layers } = this.getProperties('config.layers');

    const allZooms = layers.map(layer => layer.layer.minzoom).filter(zoom => !!zoom);
    if (allZooms.length) return Math.min(...allZooms);
    return false;
  }),

  layerIds: computed('config.layers.@each.id', function() {
    const { 'config.layers': layers } = this.getProperties('config.layers');

    return layers.mapBy('layer.id');
  }),

  isReady: computed('isCarto', 'configWithTemplate.isSuccessful', 'config', 'visible', function() {
    const { isCarto, 'configWithTemplate.isSuccessful': successful, config } = this.getProperties('isCarto', 'configWithTemplate.isSuccessful', 'config', 'visible');

    return !!(
      ((isCarto && successful) || !isCarto) && config
    );
  }),

  'query-param': alias('config.id'),
  queryParamBoundKey: 'visible',

  isCarto: computed('config.type', function() {
    const { 'config.type': type } = this.getProperties('config.type');

    return type === 'carto';
  }),

  before: computed('registeredLayers.layers', function() {
    const { 'registeredLayers.layers': allLayerGroups } = this.getProperties('registeredLayers.layers');

    const position = allLayerGroups.map(layerGroup => layerGroup.config.id).indexOf(this.get('config.id'));

    // walk all layergroups that should be displayed above this one
    for (let i = position - 1; i >= 0; i -= 1) {
      const { config } = allLayerGroups[i];
      const bottomLayer = config.layers[0].layer.id;
      const map = this.get('parentComponent.map');

      const { visible } = allLayerGroups[i].attrs;
      if (visible) {
        // if the bottom-most layer of the layergroup exists on the map, use it as the 'before'
        if (map.getLayer(bottomLayer)) {
          return bottomLayer;
        }
      }
    }

    // if we can't find any before when walking the layergroups, use this 'global before'
    return 'place_other';
  }),

  layers: alias('config.layers'),

  sourceOptions: computed('config', 'isCarto', 'sql', function() {
    const { config, isCarto } = this.getProperties('config', 'isCarto', 'sql');

    if (isCarto) return this.get('configWithTemplate.value');

    if (config.type === 'raster') {
      return {
        type: 'raster',
        tiles: config.tiles,
        tileSize: config.tileSize,
      };
    }

    return config;
  }),

  buildRangeSQL(sql, column = '', range = [0, 1] || ['a', 'b']) {
    let newSql = sql;
    let cleanRange = range;

    if (typeof range[0] === 'string') {
      cleanRange = cleanRange.map(step => `'${step}'`);
    }

    newSql += ` WHERE ${column} > ${cleanRange[0]} AND ${column} < ${cleanRange[1]}`;

    return newSql;
  },

  buildMultiSelectSQL(sql, column = '', values = [0, 1] || ['a', 'b']) {
    let newSql = sql;
    const valuesCleaned = values.map(value => `'${value}'`).join(',');
    if (!Ember.isEmpty(values)) {
      newSql += ` WHERE ${column} IN (${valuesCleaned})`;
    }
    return newSql;
  },

  actions: {
    toggleVisibility() {
      this.toggleProperty('visible');
    },
    updateSql(method, source, column, value) {
      const sourceLayer = source['source-layers'][0];
      const sql = this[method](sourceLayer.sql, column, value);

      // get a new template and update the source tiles
      carto.getVectorTileTemplate([{
        id: sourceLayer.id,
        sql,
      }])
        .then((template) => {
          // replace this source's tiles
          const map = this.get('parentComponent.map');
          const newStyle = map.getStyle();
          newStyle.sources[source.id].tiles = [template];
          map.setStyle(newStyle);
        });
    },
    updatePaintFor(layerId, newPaintStyle) {
      const layers = this.get('config.layers');
      const targetLayerIndex = layers.findIndex(el => el.layer.id === layerId);
      const targetLayer = layers.objectAt(targetLayerIndex);
      const copyTargetLayer = copy(targetLayer, true);
      copyTargetLayer.layer.paint = merge(copyTargetLayer.layer.paint, newPaintStyle);
      set(targetLayer, 'layer', copyTargetLayer.layer);
    },
  },
});
