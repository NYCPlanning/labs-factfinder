import Service, { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import carto from '../utils/carto';
import pointLayer from '../layers/point-layer';
import searchResultLayer from '../layers/search-result-layer';
import summaryLevelQueries from '../queries/summary-levels';
import { all, task } from 'ember-concurrency';
import config from '../config/environment';
import fetchSelectionSummary from '../utils/fetch-selection-summary';

const { DEFAULT_SELECTION } = config;
const EMPTY_GEOJSON = { type: 'FeatureCollection', features: [] };

const SUM_LEVEL_DICT = {
  blocks: { sql: summaryLevelQueries.blocks(false), id: 'bctcb2020', tracts: 'boroct2020' },
  tracts: { sql: summaryLevelQueries.tracts(false), id: 'boroct2020', ntas: 'ntacode', blocks: 'boroct2020' },
  cdtas: { sql: summaryLevelQueries.cdtas(false), id: 'cdta2020', cdtas: 'cdta2020', ntas: 'nta2020', blocks: 'boroct2020' },
  districts: { sql: summaryLevelQueries.districts(false), districts: 'borocd' },
  boroughs: { sql: summaryLevelQueries.boroughs(false),  id: 'borocode', boroughs: 'borocode' },
  cities: { sql: summaryLevelQueries.cities(false), cities: 'id' },
  ntas: { sql: summaryLevelQueries.ntas(false), id: 'nta2020', tracts: 'ntacode' },
  pumas: { sql: summaryLevelQueries.pumas(false) },
};

const findUniqueBy = function(collection, id) {
  return collection
    .uniqBy(`properties.${id}`)
    .mapBy(`properties.${id}`);
};

const findUniqueByGeoId = function(collection) {
  return collection
    .uniqBy(`properties.geoid`)
    .mapBy(`properties.geoid`);
};

export default Service.extend({
  current: DEFAULT_SELECTION,
  summaryLevel: 'tracts', // tracts, blocks, ntas, pumas
  comparator: '0',
  reliability: false,
  metrics: service('metrics'),

  store: service(),

  currentMapInstance: null,

  selectedCount: computed('current.[]', function() {
    const currentSelected = this.get('current');
    return currentSelected.features.length;
  }),

  selectedSummary: computed('current.[]', function() {
    const currentSelectedSummary = this.get('current');
    // City level returns 'New York City' but database id is 0
    const output = currentSelectedSummary.features.map(({ properties }) => properties.geoid);
    return (output[0] === "New York City" ? ['0'] : output);
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

  handleSelectedSummaryDataExplode: task(function* ()  {
    yield fetchSelectionSummary('decennial', 'pop1,hunits', this.selectedSummary)
      .then((selectionSummary) => this.set('current', { ...this.get('current'), selectionSummary: selectionSummary }))
  }).restartable(),

  // methods
  handleSummaryLevelToggle(toLevel) {
    const fromLevel = this.get('summaryLevel');

    if (fromLevel !== toLevel) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'event' : 'selection_geotype',
        'selection_geotype' : toLevel
      });
      this.get('metrics').trackEvent('GoogleAnalytics', {
        eventCategory: 'Geotype Selection',
        eventAction: 'Geotype Selection',
        eventLabel: toLevel,
      });
    }

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
      if (toLevel === 'ntas' || toLevel === 'cdtas') {
        map.setLayoutProperty('subdued_nta_labels', 'visibility', 'none');
      } else {
        map.setLayoutProperty('subdued_nta_labels', 'visibility', 'visible');
      }
    }


    if (this.get('selectedCount')) {
      if (toLevel === 'cities') {
        // If to cities, select all cities
        this.explodeToCity();
      } else if (fromLevel === 'cities') {
        // If from cities, select all items of toLevel
        this.explodeFromCity(toLevel);
      } else if ((fromLevel === 'districts') && (toLevel === 'districts')) {
        // This is to maintain the selection of districts when switching back to the map page from the data explorer page
      } else if ((fromLevel === 'districts') || (toLevel === 'districts')) {
        // District transitions should clear selection
        this.clearSelection();
      } else if ((toLevel === 'blocks') && (['cdtas', 'ntas'].includes(fromLevel))) {
        this.explodeToBlocks(fromLevel);
      } else if ((fromLevel === 'blocks') && (['cdtas', 'ntas'].includes(toLevel)) ) {
        this.explodeFromBlocks(toLevel);
      } else {
        this.explode(fromLevel, toLevel);
      }
    } else {
      this.clearSelection();
    }
  },

  explodeToCity() {
    const sqlQuery = `SELECT * FROM (${SUM_LEVEL_DICT['cities'].sql}) a`;
    carto.SQL(sqlQuery, 'geojson')
    .then((json) => {
      this.clearSelection();
      this.set('current', json);
    })
    .then(() => {this.handleSelectedSummaryDataExplode.perform()});
  },

  explodeFromCity(toLevel) {
    const sqlQuery = `SELECT * FROM (${SUM_LEVEL_DICT[toLevel].sql}) a`;
    carto.SQL(sqlQuery, 'geojson')
    .then((json) => {
      this.clearSelection();
      this.set('current', json);
    })
    .then(() => {this.handleSelectedSummaryDataExplode.perform()});
  },

  // transition between geometry levels using attributes
  explode(fromLevel, toLevel) {
    if (fromLevel !== toLevel) {
      const crossWalkFromColumn = SUM_LEVEL_DICT[fromLevel].id;
      var crossWalkToTable = SUM_LEVEL_DICT['tracts'].sql;
      if ((fromLevel === 'blocks') || (toLevel === 'blocks')) {
        crossWalkToTable = SUM_LEVEL_DICT['blocks'].sql;
      }

      var filterFromLevelIds = findUniqueByGeoId(this.get('current.features')).join("','");
      if (fromLevel === 'blocks') {
        filterFromLevelIds = findUniqueBy(this.get('current.features'), 'bctcb2020').join("','");
      }

      const sqlQuery = `SELECT * FROM (${SUM_LEVEL_DICT[toLevel].sql}) a WHERE ${SUM_LEVEL_DICT[toLevel].id} IN (SELECT ${SUM_LEVEL_DICT[toLevel].id}  FROM (${crossWalkToTable}) a WHERE ${crossWalkFromColumn} IN ('${filterFromLevelIds}'))`;
      
      carto.SQL(sqlQuery, 'geojson')
        .then((json) => {
          this.clearSelection();
          this.set('current', json);
        })
        .then(() => {this.handleSelectedSummaryDataExplode.perform()});
    }
  },
  
  // transition between geometry levels using attributes
  explodeToBlocks(fromLevel) {
    if (fromLevel !== 'blocks') {
      const crossWalkFromColumn = SUM_LEVEL_DICT[fromLevel].id;
      const crossWalkToTable = SUM_LEVEL_DICT['tracts'].sql;
      const filterFromLevelIds = findUniqueByGeoId(this.get('current.features')).join("','");

      const sqlQuery = `SELECT * FROM (${SUM_LEVEL_DICT['blocks'].sql}) a WHERE ${SUM_LEVEL_DICT['tracts'].id} IN (SELECT ${SUM_LEVEL_DICT['tracts'].id}  FROM (${crossWalkToTable}) a WHERE ${crossWalkFromColumn} IN ('${filterFromLevelIds}'))`;
      
      carto.SQL(sqlQuery, 'geojson')
        .then((json) => {
          this.clearSelection();
          this.set('current', json);
        })
        .then(() => {this.handleSelectedSummaryDataExplode.perform()});
    }
  },

  // transition between geometry levels using attributes
  explodeFromBlocks(toLevel) {
    if ('blocks' !== toLevel) {
      const crossWalkFromColumn = SUM_LEVEL_DICT['blocks'].id;
      const crossWalkToTable = SUM_LEVEL_DICT['tracts'].sql;
      const tractGeoidColumn = SUM_LEVEL_DICT['tracts'].id
      const filterFromLevelIds = findUniqueBy(this.get('current.features'), 'bctcb2020').join("','");
      
      const sqlQuery = `SELECT * FROM (${SUM_LEVEL_DICT[toLevel].sql}) a WHERE ${SUM_LEVEL_DICT[toLevel].id} IN (SELECT ${SUM_LEVEL_DICT[toLevel].id}  FROM (${crossWalkToTable}) a WHERE ${tractGeoidColumn} IN (SELECT ${tractGeoidColumn} FROM (${SUM_LEVEL_DICT['blocks'].sql}) a WHERE ${crossWalkFromColumn} IN ('${filterFromLevelIds}')))`;

      carto.SQL(sqlQuery, 'geojson')
        .then((json) => {
          this.clearSelection();
          this.set('current', json);
        })
        .then(() => {this.handleSelectedSummaryDataExplode.perform()});
    }
  },

  getEntireGeoTask: task(function* (sqlQuery, onTaskComplete) {
    yield carto.SQL(sqlQuery, 'geojson', 'post')
      .then((json) => onTaskComplete(json));
  }).restartable(),

  handleSelectedFeatures: task(function* (features = []) {
    let getGeoTasks = [];

    features.forEach((feature) => {
      const { type, geometry, properties } = feature;

      const inSelection = this.get('current').features.find(selectedFeature => selectedFeature.properties.geoid === properties.geoid);

      if (inSelection === undefined) {

      if (['boroughs', 'cdtas', 'districts', 'cities'].includes(this.get('summaryLevel'))) {
          const currentGeographyTable = SUM_LEVEL_DICT[this.get('summaryLevel')].sql;
          // Temporary patch: ensure entire geography geojson is used, not just the geometry within clicked tile. 
          const sqlQuery = `
            SELECT * FROM (${currentGeographyTable}) a WHERE geoid = '${properties.geoid}'
          `;

          getGeoTasks.push(this.getEntireGeoTask.perform(sqlQuery, (json) => {
            this.set('current', { ...this.get('current'), features: this.get('current').features.concat(json.features)});
          }));
        } else {
          this.get('current').features.push({
            type,
            geometry,
            properties,
          });
        }
      } else {
        const newFeatures = this.get('current').features.filter(selectedFeature => selectedFeature.properties.geoid !== properties.geoid);

        this.set('current.features', newFeatures);
      }
    });

    yield all(getGeoTasks);

    yield fetchSelectionSummary('decennial', 'pop1,hunits', this.selectedSummary)
      .then((selectionSummary) => this.set(
        'current',
        { type: 'FeatureCollection', features: this.get('current').features, selectionSummary: selectionSummary },
      ));
  }).restartable(),

  clearSelection() {
    // not sure why we have to do both of these lines, but it works
    this.set('current', EMPTY_GEOJSON);
    this.set('current.features', []);
  },
});
