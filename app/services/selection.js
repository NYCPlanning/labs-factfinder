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
    boroct2010,
    boroct2010 AS geoid
    FROM nyc_census_tracts_2010`;

const EMPTY_GEOJSON = {
  type: 'FeatureCollection',
  features: [],
};

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
  handleSummaryLevelToggle(level) {
    this.set('summaryLevel', level);
    if (level === 'blocks') this.explode();
    if (level === 'tracts') this.implode();
  },

  explode() {
    const blockIds = this.get('blockIds').join("','");
    const sqlQuery = `SELECT * FROM (${BLOCKS_SQL}) a WHERE boroct2010 IN ('${blockIds}')`;

    carto.SQL(sqlQuery, 'geojson')
      .then((json) => {
        this.clearSelection();
        this.set('current', json);
      });
  },

  implode() {
    const tractIds = this.get('tractIdsFromBlocks').join("','");
    const sqlQuery = `SELECT * FROM (${TRACTS_SQL}) a WHERE boroct2010 IN ('${tractIds}')`;
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
