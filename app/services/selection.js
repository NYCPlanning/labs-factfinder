import Ember from 'ember';
import carto, { buildSqlUrl } from 'ember-jane-maps/utils/carto';
import { computed } from 'ember-decorators/object';

const BLOCKS_SQL = 'SELECT the_geom, the_geom_webmercator, ct2010, bctcb2010, bctcb2010 AS geoid FROM nyc_census_blocks_2010';

const current = {
  type: 'FeatureCollection',
  features: [],
};

export default Ember.Service.extend({
  current,
  summaryLevel: 'tracts', // tracts, blocks, ntas, pumas

  @computed('current')
  tractIds(currentSelected) {
    return currentSelected.features
      .uniqBy('properties.ct2010')
      .mapBy('properties.ct2010');
  },

  // methods
  explode() {
    const tractIds = this.get('tractIds').join("','");
    const sqlQuery = `${BLOCKS_SQL} WHERE ct2010 IN ('${tractIds}')`;

    carto.SQL(sqlQuery, 'geojson').then((json) => {
      this.clearSelection();
      this.set('current', json);
    });
  },

  handleSummaryLevelToggle(level) {
    this.set('summaryLevel', level);
    if (level === 'blocks') this.explode();
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

  @computed('current')
  selectedCount(currentSelected) {
    return currentSelected.features.length;
  },

  clearSelection() {
    this.set('current', {
      type: 'FeatureCollection',
      features: [],
    });
  },
});
