import Ember from 'ember';
import carto from 'ember-jane-maps/utils/carto';
import pointLayer from '../layers/point-layer';
import searchResultLayer from '../layers/search-result-layer';

import { computed } from 'ember-decorators/object'; // eslint-disable-line

import summaryLevelQueries from '../queries/summary-levels';
import config from '../config/environment';

const DEFAULT_SELECTION = config.DEFAULT_SELECTION;
const EMPTY_GEOJSON = { type: 'FeatureCollection', features: [] };

const SUM_LEVEL_DICT = {
  blocks: { sql: summaryLevelQueries.blocks(false), tracts: 'boroct2010' },
  tracts: { sql: summaryLevelQueries.tracts(false), ntas: 'ntacode', blocks: 'boroct2010' },
  ntas: { sql: summaryLevelQueries.ntas(false), tracts: 'ntacode' },
  pumas: 'something_else',
};

const findUniqueBy = function(collection, id) {
  return collection
    .uniqBy(`properties.${id}`)
    .mapBy(`properties.${id}`);
};

export default Ember.Service.extend({
  current: DEFAULT_SELECTION,
  summaryLevel: 'tracts', // tracts, blocks, ntas, pumas

  currentMapInstance: null,
  overlayMetric: null,
  overlayData: null,

  povertyPercent: 25,

  @computed('current')
  selectedCount(currentSelected) {
    return currentSelected.features.length;
  },

  @computed('current')
  sortedLabels(currentSelected) {
    return currentSelected.features.sort((a, b) => (a.properties.geolabel - b.properties.geolabel));
  },

  pointLayer,
  currentAddress: null,

  searchResultFeature: null,
  searchResultLayer,

  @computed('currentAddress')
  addressSource(currentAddress) {
    return {
      type: 'geojson',
      data: {
        type: 'Point',
        coordinates: currentAddress,
      },
    };
  },

  @computed('searchResultFeature')
  searchResultSource(feature) {
    return {
      type: 'geojson',
      data: feature,
    };
  },

  // methods
  handleSummaryLevelToggle(toLevel) {
    const fromLevel = this.get('summaryLevel');
    this.set('summaryLevel', toLevel);

    // sigh...
    if (
      (toLevel === 'pumas' && fromLevel === 'ntas')
      || (toLevel === 'pumas' && fromLevel === 'tracts')
      || (toLevel === 'ntas' && fromLevel === 'pumas')
      || (toLevel === 'blocks' && fromLevel === 'ntas')
      || (toLevel === 'blocks' && fromLevel === 'pumas')
      || (toLevel === 'ntas' && fromLevel === 'blocks')
      || (toLevel === 'pumas' && fromLevel === 'blocks')
    ) {
      this.clearSelection();
      return;
    }

    if (this.get('selectedCount')) {
      this.explode(fromLevel, toLevel);
    } else {
      this.clearSelection();
    }
  },

  // target table is the TO and filter ID is the FROM;
  explode(fromLevel, to) {
    const crossWalkFromColumn = SUM_LEVEL_DICT[to][fromLevel];
    const crossWalkToTable = SUM_LEVEL_DICT[to].sql;

    const filterIds = findUniqueBy(this.get('current.features'), crossWalkFromColumn).join("','");
    const sqlQuery = `SELECT * FROM (${crossWalkToTable}) a WHERE ${crossWalkFromColumn} IN ('${filterIds}')`;

    carto.SQL(sqlQuery, 'geojson')
      .then((json) => {
        this.clearSelection();
        this.set('current', json);
      });
  },

  handleSelectedFeatures(features = []) {
    const selected = this.get('current');

    features.forEach((feature) => {
      const { type, geometry, properties } = feature;

      const inSelection = selected.features.find(
        selectedFeature => selectedFeature.properties.geoid === properties.geoid,
      );

      if (inSelection === undefined) {
        selected.features.push({
          type,
          geometry,
          properties,
        });
      } else {
        const newFeatures = selected.features.filter(
          selectedFeature => selectedFeature.properties.geoid !== properties.geoid,
        );

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

  showMetricOverlay() {
    // get the data for this indicator and geometry type

    const SQL = 'SELECT geoid, c, e, m, p, z FROM economic WHERE variable ILIKE \'fambwpv\' AND geotype = \'CT2010\'';
    carto.SQL(SQL)
      .then((data) => {
        console.log(data);
        this.set('overlayData', data);
        this.set('overlayMetric', 'poverty');
      });
  },

  @computed('overlayMetric', 'povertyPercent')
  overlayLayer(metric, percentage) {
    // get geoids where greater than 10% of the population lives in poverty
    const filter = this.get('overlayData').filter(d => d.p > parseInt(percentage)).map(d => d.geoid);

    console.log(filter)

    filter.unshift('geoid');
    filter.unshift('in');

    return {
      id: 'overlay-line',
      type: 'line',
      source: 'census-geoms',
      'source-layer': 'census-geoms-tracts',
      paint: {
        'line-color': 'rgba(79, 220, 79, 1)',
        'line-width': {
          stops: [
            [
              10,
              1,
            ],
            [
              15,
              8,
            ],
          ],
        },
        'line-blur': {
          stops: [
            [
              10,
              1,
            ],
            [
              15,
              8,
            ],
          ],
        },
        'line-offset': 3,
        'line-opacity': 1,
      },
      filter,
    };
  },
});
