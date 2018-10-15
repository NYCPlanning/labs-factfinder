import Component from '@ember/component';
import { getProperties } from '@ember/object';
import trackEvent from '../utils/track-event'; // eslint-disable-line

const rawDataColumns = [
  'numgeoid',
  'profile',
  'category',
  'variable',
  'base',
  'sum',
  'm',
  'cv',
  'percent',
  'percent_m',
  'is_reliable',
  'comparison_sum',
  'comparison_m',
  'comparison_cv',
  'comparison_percent',
  'comparison_percent_m',
  'comparison_is_reliable',
  'difference_sum',
  'difference_m',
  'significant',
  'difference_percent',
  'difference_percent_m',
  'percent_significant',
];

export default Component.extend({
  tagName: '',
  data: null, // []
  filename: 'download',
  actions: {
    @trackEvent('Data', 'Downloaded CSV')
    handleDownload(format = 'csv') {
      const filename = this.get('filename');
      const profile = this.get('data')
        .map((row) => {
          const truncatedRow = row;
          delete truncatedRow.codingThresholds;
          delete truncatedRow.rowConfig;
          return truncatedRow;
        })
        .sortBy('dataset', 'profile', 'category')
        .map(row => getProperties(row, ...rawDataColumns))
        .reverse();

      const columnNames = [Object.keys(profile.get('firstObject'))];
      const matrixValues = profile.map(row => Object.values(row));

      const data = []
        .concat(
          columnNames,
          matrixValues,
        );

      if (format === 'csv') {
        this.get('csv').export(data, { fileName: `${filename}.csv`, withSeparator: false });
      }
    },
  },
});
