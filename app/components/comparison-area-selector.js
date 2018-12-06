import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { nest } from 'd3-collection';
import carto from '../utils/carto';

const OPTIONS_QUERY = `
  (
    SELECT geoid, geotype, geogname AS label, 'City %26 Boroughs' AS typelabel
    FROM support_geoids
    WHERE geotype IN ('Boro2010', 'City2010')
    ORDER BY CASE
      WHEN geogname = 'New York City' THEN '1'
      WHEN geogname = 'Bronx' THEN '2'
      WHEN geogname = 'Brooklyn' THEN '3'
      WHEN geogname = 'Manhattan' THEN '4'
      WHEN geogname = 'Queens' THEN '5'
      WHEN geogname = 'Staten Island' THEN '6'
      ELSE geogname END ASC
  )

  UNION ALL

  (
    SELECT
      geoid, geotype, geogname || ' (' || geoid || ')' AS label,
      'Neighborhood Tabulation Areas (NTAs)' AS typelabel
    FROM support_geoids
    WHERE geotype IN ('NTA2010')
    AND geogname NOT ILIKE 'park-cemetery-etc%25'
    ORDER BY geogname ASC
  )

  UNION ALL

  (
    SELECT geoid, geotype, neighborhoods || ' - ' || geoid || ' (approx. ' || puma_roughcd_equiv || ')' as label, 'PUMAS (approximations of Community Districts)' AS typelabel
    FROM (
      SELECT a.*, b.neighborhoods, b.puma_roughcd_equiv FROM support_geoids a
      LEFT OUTER JOIN nyc_puma b ON (a.geoid = b.puma::text)
      WHERE geotype IN ('PUMA2010')
    ) x
    ORDER BY geoid ASC
  )
`;
// `SELECT *, geotype || geogname || geoid AS name FROM support_geoids
//   WHERE geotype IN ('Boro2010', 'City2010', 'PUMA2010', 'NTA2010')
//   ORDER BY geotype`;

export default Component.extend({
  comparisonArea: null,
  selection: service(),

  metrics: service(),

  selected: computed('comparisonArea', 'options', function() {
    const area = this.get('comparisonArea');
    const options = this.get('options');

    return options
      .then(d => d.findBy('geoid', area))
      .then((selected) => {
        this.set('selection.comparisonLabel', selected.label);
        return selected;
      });
  }),

  options: computed(function() {
    return carto.SQL(OPTIONS_QUERY);
  }),

  nestedOptions: computed('options', function() {
    const optsList = this.get('options');
    return optsList
      .then(options => nest()
        .key(d => d.typelabel)
        .entries(options)
        .map(d => ({
          groupName: d.key,
          options: d.values,
        })));
  }),

  actions: {
    updateProperty({ geoid, label }) {
      this.get('metrics').trackEvent('GoogleAnalytics', {
        eventCategory: 'Profile Settings',
        eventAction: 'Selected Comparison Area',
        eventLabel: label,
      });
      this.set('comparisonArea', geoid);
    },
  },
});
