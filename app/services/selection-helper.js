import Ember from 'ember';
import { computed } from 'ember-decorators/object';
import carto from 'ember-jane-maps/utils/carto';

import summaryLevels from '../queries/summary-levels';

const { service } = Ember.inject;


const configs = [
  {
    title: 'Families living below poverty line',
    tooltip: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    type: 'percentage',
    variable: 'fambwpv',
    table: 'economic',
    range: [25, 75],
    data: null,
    enabled: false,
  },
  {
    title: 'Population under age 18',
    tooltip: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    type: 'percentage',
    variable: 'popu181',
    table: 'demographic',
    range: [25, 75],
    data: null,
    enabled: false,
  },
  {
    title: 'Population 65 and over',
    tooltip: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    type: 'percentage',
    variable: 'pop65pl1',
    table: 'demographic',
    range: [0, 100],
    label: 'percentage of the population 65 and over',
    data: null,
    enabled: false,
  },
  {
    title: 'Population renting home',
    tooltip: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    type: 'percentage',
    variable: 'rochu',
    table: 'housing',
    range: [0, 100],
    label: 'percentage of the population that rent their home',
    data: null,
    enabled: false,
  },
];


export default Ember.Service.extend({
  selection: service(),
  configs,
  summaryLevel: 'tracts',

  addHighlightedToSelection() {
    const geoids = this.get('filteredGeoids');
    const geoidQuotedStrings = geoids.map(d => `'${d}'`);

    const summaryLevel = this.get('selection.summaryLevel');
    const subQuery = summaryLevels[summaryLevel](false);

    const SQL = `
      SELECT * FROM (${subQuery}) a WHERE geoid IN (${geoidQuotedStrings});
    `;

    carto.SQL(SQL, 'geojson', 'post')
      .then(({ features }) => {
        this.get('selection').handleSelectedFeatures(features, false);
      });
  },

  updateHelperRange(variable, range) {
    const allConfigs = this.get('configs');
    const index = allConfigs.map(d => d.variable).indexOf(variable);
    Ember.set(this.get('configs').objectAt(index), 'range', range);
  },

  toggleEnabled(variable) {
    const allConfigs = this.get('configs');
    const index = allConfigs.map(d => d.variable).indexOf(variable);
    const enabled = this.get('configs').objectAt(index).enabled;
    Ember.set(this.get('configs').objectAt(index), 'enabled', !enabled);
  },

  getData({ variable, table }) {
    const SQL = `SELECT geoid, c, e, m, p, z FROM ${table} WHERE LOWER(variable) = LOWER('${variable}')`;
    return carto.SQL(SQL);
  },

  @computed('configs.@each.data', 'configs.@each.enabled')
  ready() {
    console.log('checking ready')
    // check if all active configs have data
    const allConfigs = this.get('configs');
    const enabledHelpers = allConfigs.filter(d => d.enabled);
    if (enabledHelpers.length === 0) return false;

    console.log('enabledHelpers', enabledHelpers)

    const allHaveData = enabledHelpers.reduce((acc, config) => config.data && acc, true);

    console.log('allHaveData', allHaveData)

    if (allHaveData) {
      return true;
    }
    const promises = enabledHelpers.map(config => this.getData(config));

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
  @computed('configs.@each.range', 'configs.@each.enabled')
  filteredGeoids() {
    const allConfigs = this.get('configs');
    const enabledHelpers = allConfigs.filter(d => d.enabled);

    console.log('filtering', enabledHelpers)

    // map configs into array of geoids where variable falls within the range
    const matchesByConfig = enabledHelpers.map((config) => {
      const [min, max] = config.range;
      return config.data ? config.data.filter(d => d.p >= min && d.p <= max).map(d => d.geoid) : [];
    });

    // keep only geoids that are present in all arrays in matchesByConfig
    const filteredGeoids = matchesByConfig.reduce((agg, curr) => agg.filter(d => curr.includes(d)));
    return filteredGeoids;
  },

  // returns a mapboxGL filter object based on filteredGeoids
  @computed('filteredGeoids')
  filter(geoids) {
    // prepend ['in', 'geoid'...
    geoids.unshift('geoid');
    geoids.unshift('in');

    return geoids;
  },

  @computed('filter', 'selection.summaryLevel')
  layer(filter, summaryLevel) {
    console.log('generating layer')
    let source;
    let sourceLayer;

    switch (summaryLevel) {
      case 'tracts':
        source = 'census-geoms';
        sourceLayer = 'census-geoms-tracts';
        break;

      case 'ntas':
        source = 'admin-boundaries';
        sourceLayer = 'neighborhood-tabulation-areas';
        break;

      case 'pumas':
        source = 'admin-boundaries';
        sourceLayer = 'nyc-pumas';
        break;

      default:
    }


    return {
      id: `helper-line-${sourceLayer}`,
      type: 'line',
      source,
      'source-layer': sourceLayer,
      paint: {
        'line-color': 'rgba(38, 91, 217, 1)',
        'line-width': {
          stops: [
            [
              10,
              2,
            ],
            [
              15,
              20,
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
              15,
            ],
          ],
        },
        'line-offset': {
          stops: [
            [
              10,
              1,
            ],
            [
              15,
              3,
            ],
          ],
        },
        'line-opacity': 1,
      },
      filter,
    };
  },
});
