import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function() { // eslint-disable-line
  this.route('profile', function() {
    this.route('census');
    this.route('demographic');
    this.route('social');
    this.route('economic');
    this.route('housing');
  });
});

export default Router;
