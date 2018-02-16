import Ember from 'ember';
import config from './config/environment';
import trackPage from './mixins/track-page';

const Router = Ember.Router.extend(trackPage, {
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function() { // eslint-disable-line
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
});

export default Router;
