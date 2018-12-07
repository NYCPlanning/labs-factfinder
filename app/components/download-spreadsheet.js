import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  tagName: '',
  data: null, // []
  filename: 'download',
  csv: service('csv'),
  metrics: service('metrics'),
  actions: {
    handleDownload(format = 'csv') {
      this.get('metrics').trackEvent('GoogleAnalytics', {
        eventCategory: 'Data',
        eventAction: 'Downloaded CSV',
      });
      const filename = this.get('filename');
      const profile = this.get('data')
        .map((row) => {
          const truncatedRow = row;
          delete truncatedRow.codingThresholds;
          delete truncatedRow.rowConfig;
          return truncatedRow;
        })
        .sortBy('dataset', 'profile', 'category').reverse();
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
