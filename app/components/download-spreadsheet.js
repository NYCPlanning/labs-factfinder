import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  tagName: '',
  data: null, // []
  mode: '',
  tab: '',
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
      const profile = this.get('data');
      const mode = this.get('mode');
      const tab = this.get('tab');

      if (mode === 'current') {
        if (tab !== 'profile.census') {
          profile.map((row) => {
            const truncatedRow = row;
            // if (truncatedRow.dataset === 'y2006_2010') {
            //   delete truncatedRow;
            // }
            delete truncatedRow.codingThresholds;
            delete truncatedRow.rowConfig;
            delete truncatedRow.notinprofile;
            delete truncatedRow.previous_sum;
            delete truncatedRow.previous_m;
            delete truncatedRow.previous_cv;
            delete truncatedRow.previous_percent;
            delete truncatedRow.previous_percent_m;
            delete truncatedRow.previous_is_reliable;
            delete truncatedRow.change_sum;
            delete truncatedRow.change_m;
            delete truncatedRow.change_significant;
            delete truncatedRow.change_percent;
            delete truncatedRow.change_percent_m;
            delete truncatedRow.change_percent_reliable;
            delete truncatedRow.change_percentage_point;
            delete truncatedRow.change_percentage_point_m;
            delete truncatedRow.change_percentage_point_reliable;
            return truncatedRow;
          })
            .sortBy('dataset', 'profile', 'category').reverse();
        } else if (tab === 'profile.census') {
          profile.map((row) => {
            const truncatedRow = row;
            delete truncatedRow.codingThresholds;
            delete truncatedRow.rowConfig;
            delete truncatedRow.notinprofile;
            delete truncatedRow.base;
            delete truncatedRow.m;
            delete truncatedRow.cv;
            delete truncatedRow.percent_m;
            delete truncatedRow.is_reliable;
            delete truncatedRow.comparison_m;
            delete truncatedRow.comparison_cv;
            delete truncatedRow.comparison_percent_m;
            delete truncatedRow.comparison_is_reliable;
            delete truncatedRow.difference_m;
            delete truncatedRow.significant;
            delete truncatedRow.difference_percent_m;
            delete truncatedRow.percent_significant;
            delete truncatedRow.previous_sum;
            delete truncatedRow.previous_m;
            delete truncatedRow.previous_cv;
            delete truncatedRow.previous_percent;
            delete truncatedRow.previous_percent_m;
            delete truncatedRow.previous_is_reliable;
            delete truncatedRow.change_sum;
            delete truncatedRow.change_m;
            delete truncatedRow.change_significant;
            delete truncatedRow.change_percent;
            delete truncatedRow.change_percent_m;
            delete truncatedRow.change_percent_reliable;
            delete truncatedRow.change_percentage_point;
            delete truncatedRow.change_percentage_point_m;
            delete truncatedRow.change_percentage_point_reliable;
            return truncatedRow;
          });
        }
      } else if (mode === 'change') {
        if (tab !== 'profile.census') {
          profile.map((row) => {
            const truncatedRow = row;
            delete truncatedRow.codingThresholds;
            delete truncatedRow.rowConfig;
            delete truncatedRow.notinprofile;
            delete truncatedRow.comparison_sum;
            delete truncatedRow.comparison_m;
            delete truncatedRow.comparison_cv;
            delete truncatedRow.comparison_percent;
            delete truncatedRow.comparison_percent_m;
            delete truncatedRow.comparison_is_reliable;
            delete truncatedRow.difference_sum;
            delete truncatedRow.difference_m;
            delete truncatedRow.significant;
            delete truncatedRow.difference_percent;
            delete truncatedRow.difference_percent_m;
            delete truncatedRow.percent_significant;
            return truncatedRow;
          })
            .sortBy('dataset', 'profile', 'category').reverse();
        } else if (tab === 'profile.census') {
          profile.map((row) => {
            const truncatedRow = row;
            delete truncatedRow.codingThresholds;
            delete truncatedRow.rowConfig;
            delete truncatedRow.notinprofile;
            delete truncatedRow.base;
            delete truncatedRow.m;
            delete truncatedRow.cv;
            delete truncatedRow.percent_m;
            delete truncatedRow.is_reliable;
            delete truncatedRow.comparison_sum;
            delete truncatedRow.comparison_m;
            delete truncatedRow.comparison_cv;
            delete truncatedRow.comparison_percent;
            delete truncatedRow.comparison_percent_m;
            delete truncatedRow.comparison_is_reliable;
            delete truncatedRow.difference_sum;
            delete truncatedRow.difference_m;
            delete truncatedRow.significant;
            delete truncatedRow.difference_percent;
            delete truncatedRow.difference_percent_m;
            delete truncatedRow.percent_significant;
            delete truncatedRow.previous_m;
            delete truncatedRow.previous_cv;
            delete truncatedRow.previous_percent_m;
            delete truncatedRow.previous_is_reliable;
            delete truncatedRow.change_m;
            delete truncatedRow.change_significant;
            delete truncatedRow.change_percent_m;
            delete truncatedRow.change_percent_significant;
            delete truncatedRow.change_percentage_point_m;
            delete truncatedRow.change_percentage_point_significant;
            return truncatedRow;
          })
            .sortBy('dataset', 'profile', 'category').reverse();
        }
      }

      const columnNames = [Object.keys(profile.get('firstObject'))];
      const matrixValues = profile.map(row => Object.values(row));

      const data = []
        .concat(
          columnNames,
          matrixValues,
        );

      console.log(data);
      console.log('mode', mode);
      console.log('tab', tab);

      if (format === 'csv') {
        this.get('csv').export(data, { fileName: `${filename}.csv`, withSeparator: false });
      }
    },
  },
});
