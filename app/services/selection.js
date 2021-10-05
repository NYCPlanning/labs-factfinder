import Service, { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import carto from '../utils/carto';
import pointLayer from '../layers/point-layer';
import searchResultLayer from '../layers/search-result-layer';
import summaryLevelQueries from '../queries/summary-levels';
import { task } from 'ember-concurrency';
import config from '../config/environment';

const { DEFAULT_SELECTION } = config;
const EMPTY_GEOJSON = { type: 'FeatureCollection', features: [] };

const SUM_LEVEL_DICT = {
  blocks: { sql: summaryLevelQueries.blocks(false), tracts: 'boroct2020' },
  tracts: { sql: summaryLevelQueries.tracts(false), ntas: 'ntacode', blocks: 'boroct2020' },
  cdtas: { sql: summaryLevelQueries.cdtas(false), cdtas: 'cdta2020' },
  districts: { sql: summaryLevelQueries.districts(false), districts: 'borocd' },
  boroughs: { sql: summaryLevelQueries.boroughs(false), boroughs: 'borocode' },
  cities: { sql: summaryLevelQueries.cities(false), cities: 'id' },
  ntas: { sql: summaryLevelQueries.ntas(false), tracts: 'ntacode' },
  pumas: { sql: summaryLevelQueries.pumas(false) },
};

export default Service.extend({
  current: DEFAULT_SELECTION,
  summaryLevel: 'tracts', // tracts, blocks, ntas, pumas
  comparator: '0',
  reliability: false,

  store: service(),

  currentMapInstance: null,

  selectedCount: computed('current.[]', function() {
    const currentSelected = this.get('current');
    return currentSelected.features.length;
  }),

  sortedLabels: computed('current', function() {
    const currentSelected = this.get('current');
    const { features } = currentSelected;

    const bronx = features.filter(d => d.properties.borocode === '2');
    const brooklyn = features.filter(d => d.properties.borocode === '3');
    const manhattan = features.filter(d => d.properties.borocode === '1');
    const queens = features.filter(d => d.properties.borocode === '4');
    const statenisland = features.filter(d => d.properties.borocode === '5');

    return [
      {
        label: 'Bronx',
        features: bronx,
      },
      {
        label: 'Brooklyn',
        features: brooklyn,
      },
      {
        label: 'Manhattan',
        features: manhattan,
      },
      {
        label: 'Queens',
        features: queens,
      },
      {
        label: 'Staten Island',
        features: statenisland,
      },
    ];
  }),

  pointLayer,
  currentAddress: null,

  searchResultFeature: null,
  searchResultLayer,

  addressSource: computed('currentAddress', function() {
    const currentAddress = this.get('currentAddress');
    return {
      type: 'geojson',
      data: {
        type: 'Point',
        coordinates: currentAddress,
      },
    };
  }),

  searchResultSource: computed('searchResultFeature', function() {
    const feature = this.get('searchResultFeature');
    return {
      type: 'geojson',
      data: feature,
    };
  }),

  // methods
  handleSummaryLevelToggle(toLevel) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'event' : 'selection_geotype',
      'selection_geotype' : toLevel
    });
    const fromLevel = this.get('summaryLevel');

    this.set('summaryLevel', toLevel);

    const layerGroupIdMap = (level) => {
      switch (level) {
        case 'tracts':
          return 'factfinder--census-tracts-2020';
        case 'blocks':
          return 'factfinder--census-blocks';
        case 'cdtas':
          return 'factfinder--cdtas';
        case 'districts':
          return 'factfinder--districts';
        case 'ntas':
          return 'factfinder--ntas';
        case 'boroughs':
          return 'factfinder--boroughs';
        case 'cities':
          return 'factfinder--cities';
        case 'pumas':
          return 'factfinder--pumas';
        default:
          return null;
      }
    };

    const fromLayerGroup = this.get('store').peekRecord('layer-group', layerGroupIdMap(fromLevel));
    const toLayerGroup = this.get('store').peekRecord('layer-group', layerGroupIdMap(toLevel));

    fromLayerGroup.set('visible', false);
    toLayerGroup.set('visible', true);

    // remove mapbox neighborhood labels if current Level is NTAs
    const map = this.get('currentMapInstance');
    if (map) {
      if (toLevel === 'ntas') {
        map.setLayoutProperty('subdued_nta_labels', 'visibility', 'none');
      } else {
        map.setLayoutProperty('subdued_nta_labels', 'visibility', 'visible');
      }
    }


    if (this.get('selectedCount')) {
      // All transitions now calculated using spatial queries
      this.explodeGeo(fromLevel, toLevel);
    } else {
      this.clearSelection();
    }
  },

  // transition between geometry levels using spatial queries
  explodeGeo(fromLevel, toLevel) {
    if(fromLevel === toLevel) {
      return;
    }

    const crossWalkFromTable = SUM_LEVEL_DICT[fromLevel].sql;
    const crossWalkToTable = SUM_LEVEL_DICT[toLevel].sql;

    const filterIds = this.get('current.features').map(d => d.properties.geoid).join("','");

    let fromGeom = 'f.the_geom';
    let toGeom = 'a.the_geom';

    // special handling for blocks to ntas and ntas to blocks
    if (fromLevel === 'blocks' && toLevel === 'ntas') {
      toGeom = 'a.the_geom';
    }

    if (fromLevel === 'ntas' && ((toLevel === 'blocks') || (toLevel === 'tracts'))) {
      fromGeom = 'f.the_geom';
    }

    const sqlQuery = `
      WITH f AS (
        SELECT * FROM (${crossWalkFromTable}) a WHERE geoid IN ('${filterIds}')
      )

      SELECT DISTINCT ON (geoid) a.* FROM (${crossWalkToTable}) a, f WHERE ST_Intersects(${toGeom}, ${fromGeom})
    `;

    carto.SQL(sqlQuery, 'geojson', 'post')
      .then((json) => {
        this.clearSelection();
        this.set('current', json);
      });
  },

  getEntireGeoTask: task(function* (sqlQuery, onTaskComplete) {
    yield carto.SQL(sqlQuery, 'geojson', 'post')
      .then((json) => onTaskComplete(json));
  }).restartable(),

  handleSelectedFeatures(features = []) {
    const selected = this.get('current');

    features.forEach((feature) => {
      const { type, geometry, properties } = feature;

      const inSelection = selected.features.find(selectedFeature => selectedFeature.properties.geoid === properties.geoid);

      if (inSelection === undefined) {

      if (['boroughs', 'cdtas', 'districts', 'cities'].includes(this.get('summaryLevel'))) {
          const currentGeographyTable = SUM_LEVEL_DICT[this.get('summaryLevel')].sql;
          // Temporary patch: ensure entire geography geojson is used, not just the geometry within clicked tile. 
          const sqlQuery = `
            SELECT * FROM (${currentGeographyTable}) a WHERE geoid = '${properties.geoid}'
          `;

          this.getEntireGeoTask.perform(sqlQuery, (json) => {
            this.set('current', { ...selected, features: selected.features.concat(json.features)});
          });
        } else {
          selected.features.push({
            type,
            geometry,
            properties,
          });
        }
      } else {
        const newFeatures = selected.features.filter(selectedFeature => selectedFeature.properties.geoid !== properties.geoid);

        this.set('current.features', newFeatures);
      }
    });

    this.set(
      'current',
      { type: 'FeatureCollection', features: selected.features },
    );
  },

  clearSelection() {
    // not sure why we have to do both of these lines, but it works
    this.set('current', EMPTY_GEOJSON);
    this.set('current.features', []);
  },
});
