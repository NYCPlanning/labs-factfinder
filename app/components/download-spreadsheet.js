import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { getProperties } from '@ember/object';

export default Component.extend({
  tagName: '',
  data: null, // []
  // excludedProperties is an array of keys that are excluded from each condition (current mode Census, change mode Census, current mode ACS, change mode ACS)
  excludedProperties: ['codingThresholds', 'rowConfig', 'notinprofile', 'variablename', 'year', 'is_most_recent', 'geotype', 'producttype', 'release_year', 'unittype'],
  // create arrays of keys that should be included in each of the four conditions
  censusCurrent: ['numGeoids', 'profile', 'category', 'variable', 'dataset', 'estimate', 'percent', 'comparison_estimate', 'comparison_percent', 'difference_estimate', 'difference_percent'],
  censusChange: ['numGeoids', 'profile', 'category', 'variable', 'dataset', 'previous2000_estimate', 'previous2000_percent', 'estimate', 'percent', 'change_estimate', 'change_percent', 'change_percentage_point'],
  acsCurrent: ['numGeoids', 'profile', 'category', 'variable', 'dataset', 'base', 'estimate', 'moe', 'cv', 'percent', 'percent_moe', 'is_reliable', 'comparison_estimate', 'comparison_moe', 'comparison_cv', 'comparison_percent', 'comparison_percent_moe', 'comparison_is_reliable', 'difference_estimate', 'difference_moe', 'difference_reliable', 'difference_percent', 'difference_percent_moe', 'difference_percent_reliable'],
  acsChange: ['numGeoids', 'profile', 'category', 'variable', 'dataset', 'base', 'previous0610_estimate', 'previous0610_moe', 'previous0610_cv', 'previous0610_percent', 'previous0610_percent_moe', 'previous0610_is_reliable', 'estimate', 'moe', 'cv', 'percent', 'percent_moe', 'is_reliable', 'change_estimate', 'change_moe', 'change_reliable', 'change_percent', 'change_percent_moe', 'change_percent_reliable', 'change_percentage_point', 'change_percentage_point_moe', 'change_percentage_point_reliable'],
  mode: '', // change vs. current mode
  tab: '', // census, demographic, social, housing, economic
  filename: 'download',
  csv: service('csv'), // from ember-spreadsheet-export
  metrics: service('metrics'), // analytics
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
            const newProfile = getProperties(row, ...acsCurrent); // object
            // add newProfile object to array profileForPrint
            profileForPrint.push(newProfile); // array of objects

            // unused return; required by linter :(
            return row;
          })
            .sortBy('category');

        // current view AND tab IS census
        } else if (tab === 'profile.census') {
          profile.map((row) => {
            excludedProperties.forEach((item) => {
              delete row[item];
            });

            const newProfile = getProperties(row, ...censusCurrent);
            profileForPrint.push(newProfile);

            // unused return; required by linter :(
            return row;
          })
            .sortBy('category');
        }

      // change view and tab is NOT census
      } else if (mode === 'change') {
        if (tab !== 'profile.census') {
          profile.map((row) => {
            excludedProperties.forEach((item) => {
              delete row[item];
            });

            const newProfile = getProperties(row, ...acsChange);
            profileForPrint.push(newProfile);

            // unused return; required by linter :(
            return row;
          })
            .sortBy('profile', 'category').reverse();
        // change view and tab IS census
        } else if (tab === 'profile.census') {
          profile.map((row) => {
            excludedProperties.forEach((item) => {
              delete row[item];
            });

            const newProfile = getProperties(row, ...censusChange);
            profileForPrint.push(newProfile);

            // unused return; required by linter :(
            return row;
          })
            .sortBy('category');
        }
      }

      // filter out all rows with years 2006-2010 from the ACS tables and year 2000 from the census table
      function filterProfile(prof) {
        return prof.filter(d => d.dataset !== 'y2006_2010' && d.dataset !== 'y2000');
      }

      // let recentProfile = [];
      const recentProfile = filterProfile(profileForPrint); // recentProfile is now an array of objects with NO 2006-2010 and NO 2000

      // remove dataset as a column from recentProfile
      recentProfile.forEach(function(item) {
        delete item.dataset;
      });

      // sort recentProfile by category in ascending order
      recentProfile.sort(function(a, b) {
        if (a.category > b.category) {
          return 1;
        } if (b.category > a.category) {
          return -1;
        } return 0;
      });

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
