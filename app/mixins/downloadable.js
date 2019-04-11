import Mixin from '@ember/object/mixin';
import nestProfile from '../utils/nest-profile';

/**
 * The Downloadable mixin is an EmberJS feature, see https://api.emberjs.com/ember/release/classes/Mixin.
 *
 * Downloadable defines a collection of common functionality used across the profile/* routes. It is injected
 * into every one of those routes. In this case, it does two unrelated things:
 *  - Update the profile view's tab state, so that the tab is visually highlighted
 *  - It "nests" the incoming profile data, pulling 'variable' out of each row, and using that
 *    as a key for each row, making data access easier for display and download.
 */
export default Mixin.create({
  /**
   * EmberJS Route beforeModel hook.
   * Here this is used to unload the store to avoid the issue with duplicate ids.
   * TODO: There are duplicates because id is based arbitrarily on the array index.
   *
   * Also updates the profile view's tab state with the "target".
   */
  beforeModel(transition) {
    this.store.unloadAll('row');

    const { targetName } = transition;
    this.controllerFor('profile').set('tab', targetName);
  },

  /**
   * EmberJS Route hook.
   * Here it's used to nest the incoming array of profile data. Nesting is used to make data
   * display and download easier.
   */
  setupController(controller, model) {
    this._super(controller, model);

    const nestedModel = nestProfile(model, 'variable');

    controller.setProperties({
      model: nestedModel,
      rawData: model,
    });
  },
});
