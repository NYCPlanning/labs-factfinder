import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { getProperties } from '@ember/object';

export default Component.extend({
  tagName: '',
  data: null, // []
  // excludedProperties is an array of keys that are excluded from each condition
  excludedProperties: ['codingThresholds', 'rowConfig', 'notinprofile', 'variablename', 'year', 'is_most_recent', 'geotype', 'producttype', 'release_year', 'unittype'],
  // create arrays of keys that should be included in each of the four conditions
  censusCurrent: ['numGeoids', 'profile', 'category', 'variable', 'sum', 'percent', 'comparison_sum', 'comparison_percent', 'difference_sum', 'difference_percent'],
  censusChange: ['numGeoids', 'profile', 'category', 'variable', 'previous_sum', 'previous_percent', 'sum', 'percent', 'change_sum', 'change_percent', 'change_percentage_point'],
  acsCurrent: ['numGeoids', 'profile', 'category', 'variable', 'base', 'sum', 'm', 'cv', 'percent', 'percent_m', 'is_reliable', 'comparison_sum', 'comparison_m', 'comparison_cv', 'comparison_percent', 'comparison_percent_m', 'comparison_is_reliable', 'difference_sum', 'difference_m', 'significant', 'difference_percent', 'difference_percent_m', 'percent_significant'],
  acsChange: ['numGeoids', 'profile', 'category', 'variable', 'base', 'previous_sum', 'previous_m', 'previous_cv', 'previous_percent', 'previous_percent_m', 'previous_is_reliable', 'sum', 'm', 'cv', 'percent', 'percent_m', 'is_reliable', 'change_sum', 'change_m', 'change_reliable', 'change_percent', 'change_percent_m', 'change_percent_reliable', 'change_percentage_point', 'change_percentage_point_m', 'change_percentage_point_reliable'],
  mode: '',
  tab: '',
  filename: 'download',
  csv: service('csv'), // from ember-spreadsheet-export
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
      const censusCurrent = this.get('censusCurrent');
      const censusChange = this.get('censusChange');
      const acsCurrent = this.get('acsCurrent');
      const acsChange = this.get('acsChange');

      // profileForPrint is set to an empty array at beginning of each profile.map
      const profileForPrint = [];
      // current view AND tab is NOT census
      if (mode === 'current') {
        if (tab !== 'profile.census') {
          profile.map((row) => {
            // remove properties that are listed in excludedProperties array
            excludedProperties.forEach((item) => {
              delete row[item];
            });

            // create an object of properties that match array acsCurrent
            const newProfile = getProperties(row, acsCurrent);
            // add this object to profileForPrint array
            profileForPrint.push(newProfile);

            // unused return; required by linter :(
            return row;
          })
            .sortBy('dataset', 'profile', 'category').reverse();

        // current view AND tab IS census
        } else if (tab === 'profile.census') {
          profile.map((row) => {
            excludedProperties.forEach((item) => {
              delete row[item];
            });

            const newProfile = getProperties(row, censusCurrent);
            profileForPrint.push(newProfile);

            // unused return; required by linter :(
            return row;
          })
            .sortBy('dataset', 'profile', 'category').reverse();
        }

      // change view and tab is NOT census
      } else if (mode === 'change') {
        if (tab !== 'profile.census') {
          profile.map((row) => {
            excludedProperties.forEach((item) => {
              delete row[item];
            });

            const newProfile = getProperties(row, acsChange);
            profileForPrint.push(newProfile);

            // unused return; required by linter :(
            return row;
          })
            .sortBy('dataset', 'profile', 'category').reverse();
        // change view and tab IS census
        } else if (tab === 'profile.census') {
          profile.map((row) => {
            excludedProperties.forEach((item) => {
              delete row[item];
            });

            const newProfile = getProperties(row, censusChange);
            profileForPrint.push(newProfile);

            // unused return; required by linter :(
            return row;
          })
            .sortBy('dataset', 'profile', 'category').reverse();
        }
      }

      // remove all rows with years 2006-2010 from the ACS tables and year 2000 from the census table
      function removeEarlier(prof) {
        return prof.filter(d => d.dataset !== 'y2006_2010' && d.dataset !== 'y2000');
      }

      const recentProfile = removeEarlier(profileForPrint);

      const columnNames = [Object.keys(recentProfile.get('firstObject'))]; // column names do not exist in our print object
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
