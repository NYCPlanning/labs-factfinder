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
  },
  {
    type: 'percentage',
    variable: 'popu181',
    table: 'demographic',
    range: [25, 75],
    label: 'percentage of the population under age 18',
    data: null,
  },
];


export default Ember.Service.extend({
  selection: service(),
  show: true,
  configs,

  // toggleSelectionHelper() {
  //   console.log('toggle selection helper')
  //   const show = this.get('show');
  //
  //   console.log(!show, !this.get('data.populationBelowPoverty'))
  //   // don't set show to true until we have all the data we need to render the layer
  //   if (!show && !this.get('data.populationBelowPoverty')) {
  //     console.log('getting data')
  //     // get the data for the populationBelowPoverty indicator
  //     const SQL = 'SELECT geoid, c, e, m, p, z FROM economic WHERE variable ILIKE \'fambwpv\' AND geotype = \'CT2010\'';
  //     carto.SQL(SQL)
  //       .then((data) => {
  //         console.log(data);
  //         this.set('data.populationBelowPoverty', data);
  //         this.set('show', true);
  //       });
  //   }
  //
  //   if (show) this.set('show', false);
  // },

  addHighlightedToSelection() {
    const data = this.get('data');
    const range = this.get('populationBelowPovertyPercent');

    const [min, max] = range;
    const geoids = data.populationBelowPoverty.filter(d => d.p > min && d.p < max).map(d => d.geoid);

    const geoidQuotedStrings = geoids.map(d => `'${d}'`);

    const SQL = `
      SELECT * FROM (${summaryLevels.tracts(false)}) a WHERE geoid IN (${geoidQuotedStrings});
    `;

    console.log(SQL);
    carto.SQL(SQL, 'geojson', 'post')
      .then(({ features }) => {
        this.get('selection').handleSelectedFeatures(features);
      });
  },

  getData({ variable, table }) {
    const SQL = `SELECT geoid, c, e, m, p, z FROM ${table} WHERE variable ILIKE \'${variable}\' AND geotype = \'CT2010\'`;
    return carto.SQL(SQL);
  },

  @computed('configs.@each.data')
  ready(configs) {

    console.log('calculating ready', configs)
    // check if all active configs have data
    const allHaveData = configs.reduce((acc, curr) => (!!(curr.data && acc)));

    if (allHaveData) {
      return true;
    }
    const promises = configs.map(config => this.getData(config));

    Promise.all(promises)
      .then((promiseResults) => {
        console.log('promises complete');

        promiseResults.forEach((data, i) => {
          const config = this.get('configs').objectAt(i);
          Ember.set(config, 'data', data);
        });
      });

    return false;
  },

  // returns a mapboxGL filter object based on the current selections
  @computed('configs')
  filter(configs) {
    console.log('calculating filter', configs);

    const config = configs[0];
    const [min, max] = config.range;
    // get geoids where greater than 10% of the population lives in poverty
    const filter = config.data.filter(d => d.p > min && d.p < max).map(d => d.geoid);

    filter.unshift('geoid');
    filter.unshift('in');


    console.log(filter);
    return filter;
    // return [];
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
