import profilesAllNTA from './static/profile-all-nta';
import selectionAllNTA from './static/selection-all-nta';
import patchXMLHTTPRequest from './helpers/mirage-mapbox-gl-monkeypatch';

export default function() {
  patchXMLHTTPRequest();

  /*
    Config
    Note: these only affect routes defined *after* them!

    this.namespace = '';    // make this `/api`, for example, if your API is namespaced
    this.timing = 400;      // delay for each request, automatically set to 0 during testing
  */
  this.urlPrefix = 'https://factfinder-api.herokuapp.com';

  /*
    Routes

    Shorthand cheatsheet:
    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');
  */
  this.get('/explorer/:id', () => ({
    profile: profilesAllNTA,
    selection: selectionAllNTA,
  }));


  /*
    Passthroughs
  */
  this.passthrough('https://labs-layers-api.herokuapp.com/**');
  this.passthrough('https://labs-layers-api-staging.herokuapp.com/v1/base/style.json');

  this.passthrough('https://layers-api.planninglabs.nyc/**');
  this.passthrough('https://layers-api-staging.planninglabs.nyc/**');
  this.passthrough('https://search-api.planninglabs.nyc/**');
  this.passthrough('https://tiles.planninglabs.nyc/**');

  this.passthrough('https://planninglabs.carto.com/**');

  this.passthrough('https://raw.githubusercontent.com/**');
  this.passthrough('http://raw.githubusercontent.com/**');
}
