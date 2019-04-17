import Route from '@ember/routing/route';

/**
 * The ProfileIndex Route is responsible for redirecting the user to a specific profile
 * if they land on profile/index alone.
 *
 * See https://api.emberjs.com/ember/release/classes/Route
 */
export default Route.extend({
  /**
   * EmberJS Route hook called before the model hook is triggered.
   * Here, it's used to direct the user from /profile to /profile/demographic
   */
  beforeModel() {
    this.replaceWith('profile.demographic');
  },
});
