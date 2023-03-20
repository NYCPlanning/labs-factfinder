import EmberRouter from '@ember/routing/router';
import config from 'labs-nyc-factfinder/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;

  rootURL = config.rootURL;
}

Router.map(function () { // eslint-disable-line
  this.route('explorer', { path: 'explorer/:geotype/:geoid' });
  this.route('about');
  this.route('features');
  this.route('data');
  this.route('tutorial');
  this.route('map-to-');
});
