import Service, { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import carto from '../utils/carto';
import pointLayer from '../layers/point-layer';
import searchResultLayer from '../layers/search-result-layer';
import summaryLevelQueries from '../queries/summary-levels';
import config from '../config/environment';

const { DEFAULT_SELECTION } = config;
const EMPTY_GEOJSON = { type: 'FeatureCollection', features: [] };

const SUM_LEVEL_DICT = {
  blocks: { sql: summaryLevelQueries.blocks(false), tracts: 'boroct2010' },
  tracts: { sql: summaryLevelQueries.tracts(false), ntas: 'ntacode', blocks: 'boroct2010' },
  ntas: { sql: summaryLevelQueries.ntas(false), tracts: 'ntacode' },
  pumas: { sql: summaryLevelQueries.pumas(false) },
};

const findUniqueBy = function(collection, id) {
  return collection
    .uniqBy(`properties.${id}`)
    .mapBy(`properties.${id}`);
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
    const fromLevel = this.get('summaryLevel');

    this.set('summaryLevel', toLevel);

    const layerGroupIdMap = (level) => {
      switch (level) {
        case 'tracts':
          return 'factfinder--census-tracts';
        case 'blocks':
          return 'factfinder--census-blocks';
        case 'ntas':
          return 'factfinder--ntas';
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
      // these transitions are all calculated using spatial queries
      if (
        (fromLevel === 'blocks' && toLevel === 'ntas')
        || (fromLevel === 'blocks' && toLevel === 'pumas')
        || (fromLevel === 'tracts' && toLevel === 'pumas')
        || (fromLevel === 'ntas' && toLevel === 'blocks')
        || (fromLevel === 'ntas' && toLevel === 'tracts')
        || (fromLevel === 'ntas' && toLevel === 'pumas')
        || (fromLevel === 'pumas' && toLevel === 'blocks')
        || (fromLevel === 'pumas' && toLevel === 'tracts')
        || (fromLevel === 'pumas' && toLevel === 'ntas')
      ) {
        this.explodeGeo(fromLevel, toLevel);
        return;
      }

      // all other transitions are done using attributes (tract can be inferred from block attributes, etc..)
      this.explode(fromLevel, toLevel);
    } else {
      this.clearSelection();
    }
  },

  // transition between geometry levels using attributes
  explode(fromLevel, toLevel) {
    if (fromLevel !== toLevel) {
      const crossWalkFromColumn = SUM_LEVEL_DICT[toLevel][fromLevel];
      const crossWalkToTable = SUM_LEVEL_DICT[toLevel].sql;

      const filterIds = findUniqueBy(this.get('current.features'), crossWalkFromColumn).join("','");
      const sqlQuery = `SELECT * FROM (${crossWalkToTable}) a WHERE ${crossWalkFromColumn} IN ('${filterIds}')`;

      carto.SQL(sqlQuery, 'geojson')
        .then((json) => {
          this.clearSelection();
          this.set('current', json);
        });
    }
  },

  // transition between geometry levels using spatial queries
  explodeGeo(fromLevel, toLevel) {
    const crossWalkFromTable = SUM_LEVEL_DICT[fromLevel].sql;
    const crossWalkToTable = SUM_LEVEL_DICT[toLevel].sql;

    const filterIds = this.get('current.features').map(d => d.properties.geoid).join("','");

    let fromGeom = 'f.the_geom';
    let toGeom = 'a.the_geom';

    // logic to use centroids
    if (fromLevel !== 'pumas') fromGeom = 'ST_Centroid(f.the_geom)';
    if (toLevel !== 'pumas') toGeom = 'ST_Centroid(a.the_geom)';

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

  handleSelectedFeatures(features = []) {
    const selected = this.get('current');

    features.forEach((feature) => {
      const { type, geometry, properties } = feature;

      const inSelection = selected.features.find(selectedFeature => selectedFeature.properties.geoid === properties.geoid);

      if (inSelection === undefined) {
        selected.features.push({
          type,
          geometry,
          properties,
        });
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
