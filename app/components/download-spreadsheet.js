import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  tagName: '',
  data: null, // []
  excludedProperties: ['codingThresholds', 'rowConfig', 'notinprofile', 'variablename', 'year', 'is_most_recent', 'geotype', 'producttype', 'release_year', 'unittype'],
  changeProperties: ['change_sum', 'change_m', 'change_reliable', 'change_percent', 'change_percent_m', 'change_percent_reliable', 'change_percentage_point', 'change_percentage_point_m', 'change_percentage_point_reliable'],
  comparisonProperties: ['comparison_sum', 'comparison_m', 'comparison_cv', 'comparison_percent', 'comparison_percent_m', 'comparison_is_reliable'],
  diffSigProperties: ['difference_sum', 'difference_m', 'significant', 'difference_percent', 'difference_percent_m', 'percent_significant'],
  previousProperties: ['previous_sum', 'previous_m', 'previous_cv', 'previous_percent', 'previous_percent_m', 'previous_is_reliable'],
  censusExcludedProperties: ['special', 'base', 'm', 'cv', 'percent_m', 'is_reliable'],
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
      const excludedProperties = this.get('excludedProperties');
      const changeProperties = this.get('changeProperties');
      const comparisonProperties = this.get('comparisonProperties');
      const diffSigProperties = this.get('diffSigProperties');
      const previousProperties = this.get('previousProperties');
      const censusExcludedProperties = this.get('censusExcludedProperties'); // properties deleted from census download

      // current view AND tab is NOT census
      if (mode === 'current') {
        if (tab !== 'profile.census') {
          profile.map((row) => {
            const truncatedRow = row;

            excludedProperties.forEach((item) => {
              delete truncatedRow[item];
            });

            delete truncatedRow.special;

            previousProperties.forEach((item) => {
              delete truncatedRow[item];
            });

            changeProperties.forEach((item) => {
              delete truncatedRow[item];
            });

            return truncatedRow;
          })
            .sortBy('dataset', 'profile', 'category').reverse();

        // current view AND tab IS census
        } else if (tab === 'profile.census') {
          profile.map((row) => {
            const truncatedRow = row;

            excludedProperties.forEach((item) => {
              delete truncatedRow[item];
            });

            censusExcludedProperties.forEach((item) => {
              delete truncatedRow[item];
            });

            delete truncatedRow.comparison_m;
            delete truncatedRow.comparison_cv;
            delete truncatedRow.comparison_percent_m;
            delete truncatedRow.comparison_is_reliable;

            delete truncatedRow.difference_m;
            delete truncatedRow.significant;
            delete truncatedRow.difference_percent_m;
            delete truncatedRow.percent_significant;

            previousProperties.forEach((item) => {
              delete truncatedRow[item];
            });

            changeProperties.forEach((item) => {
              delete truncatedRow[item];
            });

            return truncatedRow;
          })
            .sortBy('dataset', 'profile', 'category').reverse();
        }

      // change view and tab is NOT census
      } else if (mode === 'change') {
        if (tab !== 'profile.census') {
          profile.map((row) => {
            const truncatedRow = row;

            excludedProperties.forEach((item) => {
              delete truncatedRow[item];
            });

            delete truncatedRow.special;

            comparisonProperties.forEach((item) => {
              delete truncatedRow[item];
            });

            diffSigProperties.forEach((item) => {
              delete truncatedRow[item];
            });

            return truncatedRow;
          })
            .sortBy('dataset', 'profile', 'category').reverse();

        // change view and tab IS census
        } else if (tab === 'profile.census') {
          profile.map((row) => {
            const truncatedRow = row;

            excludedProperties.forEach((item) => {
              delete truncatedRow[item];
            });

            censusExcludedProperties.forEach((item) => {
              delete truncatedRow[item];
            });

            comparisonProperties.forEach((item) => {
              delete truncatedRow[item];
            });

            diffSigProperties.forEach((item) => {
              delete truncatedRow[item];
            });

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

      console.log('Profile!', recentProfile);

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
