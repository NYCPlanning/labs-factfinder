import Ember from 'ember';
import carto from 'ember-jane-maps/utils/carto';
import { computed } from 'ember-decorators/object'; // eslint-disable-line

const BLOCKS_SQL =
  `SELECT
      the_geom,
      ct2010,
      borocode || ct2010 AS boroct2010,
      bctcb2010,
      bctcb2010 AS geoid
    FROM nyc_census_blocks_2010`;

const TRACTS_SQL =
  `SELECT
    the_geom,
    ct2010,
    ntacode,
    boroct2010,
    boroct2010 AS geoid
  FROM nyc_census_tracts_2010`;

const NTSA_SQL =
  `SELECT 
    the_geom, 
    the_geom_webmercator, 
    ntaname, 
    ntacode, 
    ntacode AS geoid 
  FROM support_admin_ntaboundaries`;


const EMPTY_GEOJSON = {
  type: 'FeatureCollection',
  features: [],
};

// order sensitive
const SUMMARY_LEVELS = ['blocks', 'tracts', 'ntas', 'pumas'];

const SUM_LEVEL_DICT = {
  blocks: { sql: BLOCKS_SQL, tracts: 'boroct2010' },
  tracts: { sql: TRACTS_SQL, ntas: 'ntacode', blocks: 'boroct2010' },
  ntas: { sql: NTSA_SQL, tracts: 'ntacode' },
  pumas: 'something_else',
};

const findUniqueBy = function(collection, id) {
  return collection
    .uniqBy(`properties.${id}`)
    .mapBy(`properties.${id}`);
};

export { SUMMARY_LEVELS };

export default Ember.Service.extend({
  current: EMPTY_GEOJSON,
  summaryLevel: 'tracts', // tracts, blocks, ntas, pumas

  @computed('current')
  blockIds(currentSelected) {
    return currentSelected.features
      .uniqBy('properties.boroct2010')
      .mapBy('properties.boroct2010');
  },

  @computed('current')
  tractIdsFromBlocks(currentSelected) {
    return currentSelected.features
      .uniqBy('properties.boroct2010')
      .mapBy('properties.boroct2010');
  },

  @computed('current')
  selectedCount(currentSelected) {
    return currentSelected.features.length;
  },

  // methods
  handleSummaryLevelToggle(toLevel) {
    const fromLevel = this.get('summaryLevel');

    this.set('summaryLevel', toLevel);

    if (this.get('selectedCount')) {
      this.explode(fromLevel, toLevel);
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

  handleSelectedFeature(features = []) {
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
        selected.features = selected.features.filter(
          selectedFeature => selectedFeature.properties.geoid !== properties.geoid,
        );
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
