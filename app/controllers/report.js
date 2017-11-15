import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import bbox from 'npm:@turf/bbox';

import layerGroups from '../layer-groups';
import sources from '../sources';
import selectedFeatures from '../layers/selected-features';

const selectedFillLayer = selectedFeatures.fill;

const { service } = Ember.inject;
const { alias } = Ember.computed;

// 0 = city; 1..5 = boro
const COMPARISON_GEOIDS = [0, 1, 2, 3, 4, 5]; // eslint-disable-line

export default Ember.Controller.extend({
  mode: 'current',
  reliability: false,
  comparison: true,
  changeReliability: true,
  changeComparison: false,
  scrollTable: true,

  selection: service(),
  mapMouseover: service(),

  queryParams: ['mode', 'comparator'],
  comparator: '0',

  layerGroups,
  sources,
  zoom: 10,
  center: [-73.916016, 40.697299],

  @computed('selection.current')
  selectedSource(current) {
    return {
      type: 'geojson',
      data: current,
    };
  },

  selectionCount: alias('selection.selectedCount'),
  summaryLevel: alias('selection.summaryLevel'),

  selectedFillLayer,

  fitBounds(map) {
    const FC = this.get('selection').current;
    map.fitBounds(bbox(FC), {
      padding: 40,
    });
  },

  actions: {
    handleMapLoad(map) {
      this.fitBounds(map);
    },

    handleResize(e) {
      this.fitBounds(e.target);
    },

    handleDownload(format = 'csv') {
      const report = this.get('model').sortBy('year', 'profile', 'category').reverse();
      const columnNames = [Object.keys(report.get('firstObject'))];
      const matrixValues = report.map(
        row => Object.values(row),
      );

      const data = []
        .concat(
          columnNames,
          matrixValues,
        );

      if (format === 'csv') {
        this.get('csv').export(data, { fileName: 'download.csv', withSeparator: false });
      }

      if (format === 'excel') {
        this.get('excel').export(data, { sheetName: 'sheet1', fileName: 'download.xlsx' });
      }
    },
  },

});
