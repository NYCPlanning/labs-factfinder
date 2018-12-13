import LabsMap from 'ember-mapbox-composer/components/labs-map';
import { ParentMixin } from 'ember-composability-tools';
import { inject as service } from '@ember/service';
import layout from '../templates/components/labs-map';

export default LabsMap.extend(ParentMixin, {
  layout,

  registeredLayers: service(),

  init(...args) {
    this._super(...args);

    this.set('registeredLayers.layers', this.get('childComponents'));
  },
});
