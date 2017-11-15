import Ember from 'ember';

export default Ember.Component.extend({
  data: [],
  actions: {
    handleDownload(format = 'csv') {
      const report = this.get('data').sortBy('year', 'profile', 'category').reverse();
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
