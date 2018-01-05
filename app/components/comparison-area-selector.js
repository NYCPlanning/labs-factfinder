import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import { nest } from 'd3-collection';
import carto from '../utils/carto';


const OPTIONS_QUERY = `
  (
    SELECT geoid, geotype, geogname AS label, 'City %26 Boroughs' AS typelabel
    FROM support_geoids
    WHERE geotype IN ('Boro2010', 'City2010')
    ORDER BY geotype DESC
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
  )
`;
  // `SELECT *, geotype || geogname || geoid AS name FROM support_geoids
  //   WHERE geotype IN ('Boro2010', 'City2010', 'PUMA2010', 'NTA2010')
  //   ORDER BY geotype`;

export default Ember.Component.extend({
  comparisonArea: null,

  @computed('comparisonArea', 'options')
  selected(area, options) {
    return options.then(
      d => d.findBy('geoid', area),
    );
  },

  @computed()
  options() {
    return carto.SQL(OPTIONS_QUERY);
  },

  @computed('options')
  nestedOptions(optsList) {
    return optsList
      .then(options => nest()
        .key(d => d.typelabel)
        .entries(options)
        .map(d => ({
          groupName: d.key,
          options: d.values,
        })),
      );
  },

  actions: {
    updateProperty({ geoid }) {
      this.set('comparisonArea', geoid);
    },
  },
});
