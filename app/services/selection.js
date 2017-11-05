import Ember from 'ember';
import carto from 'ember-jane-maps/utils/carto';
import { computed } from 'ember-decorators/object'; // eslint-disable-line

import config from '../config/environment';

const BLOCKS_SQL =
  `SELECT
      the_geom,
      ct2010,
      borocode || ct2010 AS boroct2010,
      bctcb2010,
      bctcb2010 AS geoid,
      (ct2010::float / 100)::text || ' - ' || cb2010 as geolabel
    FROM nyc_census_blocks_2010`;

const TRACTS_SQL =
  `SELECT
    the_geom,
    ct2010,
    ctlabel as geolabel,
    ntacode,
    boroct2010,
    boroct2010 AS geoid
  FROM nyc_census_tracts_2010`;

const NTA_SQL =
  `SELECT
    the_geom,
    the_geom_webmercator,
    ntaname,
    ntacode,
    ntacode as geolabel,
    ntacode AS geoid
  FROM support_admin_ntaboundaries`;

const DEFAULT_SELECTION = config.DEFAULT_SELECTION;
const EMPTY_GEOJSON = { type: 'FeatureCollection', features: [] };

// order sensitive
const SUMMARY_LEVELS = ['blocks', 'tracts', 'ntas', 'pumas'];

const SUM_LEVEL_DICT = {
  blocks: { sql: BLOCKS_SQL, tracts: 'boroct2010' },
  tracts: { sql: TRACTS_SQL, ntas: 'ntacode', blocks: 'boroct2010' },
  ntas: { sql: NTA_SQL, tracts: 'ntacode' },
  pumas: 'something_else',
};

const findUniqueBy = function(collection, id) {
  return collection
    .uniqBy(`properties.${id}`)
    .mapBy(`properties.${id}`);
};

export { SUMMARY_LEVELS, BLOCKS_SQL, TRACTS_SQL, NTA_SQL };

export default Ember.Service.extend({
  current: DEFAULT_SELECTION,
  summaryLevel: 'tracts', // tracts, blocks, ntas, pumas

  @computed('current')
  selectedCount(currentSelected) {
    return currentSelected.features.length;
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
});
