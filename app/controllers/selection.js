import Ember from 'ember';
import layerGroups from '../layer-groups';
import sources from '../sources';

export default Ember.Controller.extend({
  layerGroups,
  sources,
  zoom: 12,
  center: [-73.916016, 40.697299],
});
