import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function() {
  // eslint-disable-line
  this.route('profile', { path: 'profile/:id' }, function() {
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

export default Router;
