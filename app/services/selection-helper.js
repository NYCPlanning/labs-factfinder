import Ember from 'ember';
import { computed } from 'ember-decorators/object';
import carto from 'ember-jane-maps/utils/carto';

import summaryLevels from '../queries/summary-levels';

const { service } = Ember.inject;


const configs = [
  {
    type: 'percentage',
    variable: 'fambwpv',
    table: 'economic',
    range: [25, 75],
    label: 'percentage of families living in poverty',
    data: null,
    enabled: false,
  },
  {
    type: 'percentage',
    variable: 'popu181',
    table: 'demographic',
    range: [25, 75],
    label: 'percentage of the population under age 18',
    data: null,
    enabled: false,
  },
];


export default Ember.Service.extend({
  selection: service(),
  show: true,
  configs,

  addHighlightedToSelection() {
    const geoids = this.get('filteredGeoids');
    const geoidQuotedStrings = geoids.map(d => `'${d}'`);

    const SQL = `
      SELECT * FROM (${summaryLevels.tracts(false)}) a WHERE geoid IN (${geoidQuotedStrings});
    `;

    carto.SQL(SQL, 'geojson', 'post')
      .then(({ features }) => {
        this.get('selection').handleSelectedFeatures(features);
      });
  },

  updateHelperRange(variable, range) {
    const allConfigs = this.get('configs');
    const index = allConfigs.map(d => d.variable).indexOf(variable);
    Ember.set(this.get('configs').objectAt(index), 'range', range);
  },

  getData({ variable, table }) {
    const SQL = `SELECT geoid, c, e, m, p, z FROM ${table} WHERE variable ILIKE '${variable}' AND geotype = 'CT2010'`;
    return carto.SQL(SQL);
  },

  @computed('configs.@each.data')
  ready() {
    // check if all active configs have data
    const allConfigs = this.get('configs');
    const allHaveData = allConfigs.reduce((acc, curr) => (!!(curr.data && acc)));

    if (allHaveData) {
      return true;
    }
    const promises = allConfigs.map(config => this.getData(config));

    Promise.all(promises)
      .then((promiseResults) => {
        promiseResults.forEach((data, i) => {
          const config = this.get('configs').objectAt(i);
          Ember.set(config, 'data', data);
        });
      });

    return false;
  },

  // returns an array of geoids that match the current helper filters
  @computed('configs.@each.range')
  filteredGeoids() {
    const allConfigs = this.get('configs');

    // map configs into array of geoids where variable falls within the range
    const matchesByConfig = allConfigs.map((config) => {
      const [min, max] = config.range;
      return config.data.filter(d => d.p > min && d.p < max).map(d => d.geoid);
    });

    // keep only geoids that are present in all arrays in matchesByConfig
    return matchesByConfig.reduce((agg, curr) => agg.filter(d => curr.includes(d)));
  },

  // returns a mapboxGL filter object based on filteredGeoids
  @computed('filteredGeoids')
  filter(geoids) {
    // prepend ['in', 'geoid'...
    geoids.unshift('geoid');
    geoids.unshift('in');

    return geoids;
  },

  @computed('filter')
  layer(filter) {
    return {
      id: 'helper-line',
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
