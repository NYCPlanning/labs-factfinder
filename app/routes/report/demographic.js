import Ember from 'ember';
import carto from 'ember-jane-maps/utils/carto';
import generateReportSQL from '../../queries/report';

import nestReport from '../../utils/nest-report';

const { service } = Ember.inject;

export default Ember.Route.extend({
  selection: service(),

  model(params, { queryParams: { comparator = '0' } }) {
    const geoids = this.get('selection.current.features').mapBy('properties.geoid');
    const selectionSQL = generateReportSQL(geoids, comparator, 'demographic');

    return carto.SQL(selectionSQL, 'json', 'post');
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.setProperties({
      model: nestReport(model),
      rawData: model,
    });
  },
});
