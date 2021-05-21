import EmberRouter from '@ember/routing/router';
import config from 'labs-nyc-factfinder/config/environment';
import trackPage from './mixins/track-page';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () { // eslint-disable-line
  this.route('profile', { path: 'profile/:id' }, function () {
    this.route('census');
    this.route('demographic');
    this.route('social');
    this.route('economic');
    this.route('housing');
  });
  this.route('about');
  this.route('features');
  this.route('data');
  this.route('tutorial');
});
