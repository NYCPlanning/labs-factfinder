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
            delete truncatedRow.codingThresholds;
            delete truncatedRow.rowConfig;
            delete truncatedRow.notinprofile;
            delete truncatedRow.variablename;
            delete truncatedRow.year;
            delete truncatedRow.is_most_recent;
            delete truncatedRow.geotype;
            delete truncatedRow.producttype;
            delete truncatedRow.release_year;
            delete truncatedRow.unittype;
            delete truncatedRow.special;
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
            delete truncatedRow.variablename;
            delete truncatedRow.year;
            delete truncatedRow.is_most_recent;
            delete truncatedRow.geotype;
            delete truncatedRow.producttype;
            delete truncatedRow.release_year;
            delete truncatedRow.unittype;
            delete truncatedRow.special;
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
            delete truncatedRow.change_reliable;
            delete truncatedRow.change_percent;
            delete truncatedRow.change_percent_m;
            delete truncatedRow.change_percent_reliable;
            delete truncatedRow.change_percentage_point;
            delete truncatedRow.change_percentage_point_m;
            delete truncatedRow.change_percentage_point_reliable;
            return truncatedRow;
          })
            .sortBy('dataset', 'profile', 'category').reverse();
        }
      } else if (mode === 'change') {
        if (tab !== 'profile.census') {
          profile.map((row) => {
            const truncatedRow = row;
            delete truncatedRow.codingThresholds;
            delete truncatedRow.rowConfig;
            delete truncatedRow.notinprofile;
            delete truncatedRow.variablename;
            delete truncatedRow.year;
            delete truncatedRow.is_most_recent;
            delete truncatedRow.geotype;
            delete truncatedRow.producttype;
            delete truncatedRow.release_year;
            delete truncatedRow.unittype;
            delete truncatedRow.special;
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
            delete truncatedRow.variablename;
            delete truncatedRow.year;
            delete truncatedRow.is_most_recent;
            delete truncatedRow.geotype;
            delete truncatedRow.producttype;
            delete truncatedRow.release_year;
            delete truncatedRow.unittype;
            delete truncatedRow.special;
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
            delete truncatedRow.change_reliable;
            delete truncatedRow.change_percent_m;
            delete truncatedRow.change_percent_reliable;
            delete truncatedRow.change_percentage_point_m;
            delete truncatedRow.change_percentage_point_reliable;
            return truncatedRow;
          })
            .sortBy('dataset', 'profile', 'category').reverse();
        }
      }

      // remove all rows with years 2006-2010 from the ACS tables and year 2000 from the census table
      function removeEarlier(prof) {
        return prof.filter(d => d.dataset !== 'y2006_2010' && d.dataset !== 'y2000');
      }

      const recentProfile = removeEarlier(profile);

      const columnNames = [Object.keys(recentProfile.get('firstObject'))];
      const matrixValues = recentProfile.map(row => Object.values(row));

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
