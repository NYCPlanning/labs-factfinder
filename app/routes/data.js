import Route from '@ember/routing/route';
import layerGroups from '../layer-groups';

/**
 * The data route is responsible for statically importing layer groups
 * and displaying their information through the model hook.
 *
 * See See https://api.emberjs.com/ember/release/classes/Route
 */
export default Route.extend({
  /**
   * Used to statically pull in layer groups, iterated over in the template.
   * TODO: this should be using the real layer group data.
   */
  model() {
    return Object.keys(layerGroups).map(key => layerGroups[key]);
  },
});
