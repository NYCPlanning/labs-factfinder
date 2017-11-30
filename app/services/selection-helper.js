import Ember from 'ember';
import { computed } from 'ember-decorators/object';
import carto from 'ember-jane-maps/utils/carto';
import { min, max } from 'd3-array';

import configs from '../selection-helpers';
import summaryLevels from '../queries/summary-levels';

const { service } = Ember.inject;

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
        this.get('selection').handleSelectedFeatures(features);
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
    const summaryLevel = this.get('selection.summaryLevel');

    let geotype;
    switch (summaryLevel) {
      case 'ntas':
        geotype = 'NTA2010';
        break;
      case 'pumas':
        geotype = 'PUMA2010';
        break;
      default:
        geotype = 'CT2010';
    }

    const SQL = `SELECT geoid, c, e, m, p, z FROM ${table} WHERE LOWER(variable) = LOWER('${variable}') AND geotype = '${geotype}'`;
    return carto.SQL(SQL);
  },

  @computed('configs.@each.data', 'configs.@each.enabled')
  ready() {
    // check if all active configs have data
    const allConfigs = this.get('configs');
    const enabledHelpers = allConfigs.filter(d => d.enabled);
    if (enabledHelpers.length === 0) return false;


    const allHaveData = enabledHelpers.reduce((acc, config) => config.data && acc, true);


    if (allHaveData) {
      return true;
    }
    const promises = enabledHelpers.map(config => this.getData(config));

    Promise.all(promises)
      .then((promiseResults) => {
        promiseResults.forEach((data, i) => {
          const config = enabledHelpers.objectAt(i);
          console.log('getting range')
          Ember.set(config, 'data', data);
          Ember.set(config, 'defaultRange', this.getRange(config));
        });
      });

    return false;
  },

  getRange({ type, variable, data }) {
    console.log('getRange', type, variable, data)
    const property = (type === 'percentage') ? 'p' : 'e';
    const defaultValue = {};
    defaultValue[property] = 0;

    const maxValue = max(data, d => d[property]);
    const minValue = min(data, d => d[property]);

    const range = [minValue, maxValue];
    console.log(range)

    this.updateHelperRange(variable, range);

    return range;
  },

  // returns an array of geoids that match the current helper filters
  @computed('configs.@each.range', 'configs.@each.enabled')
  filteredGeoids() {
    const allConfigs = this.get('configs');
    const enabledHelpers = allConfigs.filter(d => d.enabled);


    // map configs into array of geoids where variable falls within the range
    const matchesByConfig = enabledHelpers.map((config) => {
      console.log(config)

      const [min, max] = config.range;
      console.log('getting matches', min, max)

      // handle percentage type
      if (config.type === 'percentage') {
        return config.data ? config.data.filter(d => d.p >= min && d.p <= max).map(d => d.geoid) : [];
      }

      // handle number type
      return config.data ? config.data.filter(d => d.e >= min && d.e <= max).map(d => d.geoid) : [];
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
