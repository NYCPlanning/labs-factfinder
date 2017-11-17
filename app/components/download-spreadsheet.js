import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',
  data: [],
  filename: 'download',
  actions: {
    handleDownload(format = 'csv') {
      const filename = this.get('filename');
      const profile = this.get('data').sortBy('dataset', 'profile', 'category').reverse();
      const columnNames = [Object.keys(profile.get('firstObject'))];
      const matrixValues = profile.map(
        row => Object.values(row),
      );

      const data = []
        .concat(
          columnNames,
          matrixValues,
        );

      if (format === 'csv') {
        this.get('csv').export(data, { fileName: `${filename}.csv`, withSeparator: false });
      }

      if (format === 'excel') {
        this.get('excel').export(data, { sheetName: 'sheet1', fileName: `${filename}.xlsx` });
      }
    },
  },
});
