import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Downloadable from '../../mixins/downloadable';

export default Route.extend(Downloadable, {
  selection: service(),

  model(params, { queryParams: { comparator = '0' } }) {
    const selectionId = this.modelFor('profile').id;

    return this.store.query('row', { selectionId, comparator, type: 'economic' })
      .then(rows => rows.toArray());
  },
});
