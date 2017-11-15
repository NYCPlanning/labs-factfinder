import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import carto from 'ember-jane-maps/utils/carto';
import { nest } from 'd3-collection';

const OPTIONS_QUERY =
  `SELECT *, geotype || geogname || geoid AS name FROM support_geoids 
    WHERE geotype IN ('Boro2010', 'City2010', 'PUMA2010', 'NTA2010') 
    ORDER BY geotype`;

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
        .key(d => d.geotype)
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
