'use strict';
/* eslint-env node */
const SAMPLE_SELECTION = {
  type: 'FeatureCollection',
  features: [{
    type: 'Feature',
    geometry: { type: 'Polygon', coordinates: [[[-73.91303300857544, 40.713337776624115], [-73.91035079956055, 40.711727567666486], [-73.9101791381836, 40.711255882920966], [-73.9099645614624, 40.71106070204891], [-73.91552209854126, 40.70562793820591], [-73.92189502716064, 40.70940164153686], [-73.92075777053833, 40.71054021692632], [-73.92155170440674, 40.71104443695043], [-73.92223834991455, 40.71284983862793], [-73.92404079437256, 40.71400461943608], [-73.91303300857544, 40.713337776624115]]] },
    properties: {
      boroct2010: '4053900', ct2010: '053900', geolabel: '539', geoid: '4053900', ntacode: 'QN20',
    },
  }, {
    type: 'Feature',
    geometry: { type: 'Polygon', coordinates: [[[-73.90528678894043, 40.725957863591645], [-73.90485763549805, 40.72581151031747], [-73.90421390533447, 40.7257627258212], [-73.9045786857605, 40.72301447478375], [-73.90440702438354, 40.72169722547659], [-73.90410661697388, 40.721030459717184], [-73.9049220085144, 40.72052631531858], [-73.90818357467651, 40.72039621291847], [-73.90831232070923, 40.720461264150316], [-73.91131639480591, 40.71963185618236], [-73.9129900932312, 40.72159965041678], [-73.91384840011597, 40.72290063945297], [-73.91256093978882, 40.723242144861274], [-73.90741109848022, 40.72720998400365], [-73.90528678894043, 40.725957863591645]]] },
    properties: {
      boroct2010: '4053100', ct2010: '053100', geolabel: '531', geoid: '4053100', ntacode: 'QN30',
    },
  }, {
    type: 'Feature',
    geometry: { type: 'Polygon', coordinates: [[[-73.88724088668823, 40.721274399184466], [-73.89423608779907, 40.717924219001446], [-73.89457941055298, 40.7183795931995], [-73.89286279678345, 40.719209016770435], [-73.89475107192993, 40.721583387892935], [-73.89427900314331, 40.721778537917146], [-73.89496564865112, 40.722819328383196], [-73.89018058776855, 40.72494964561906], [-73.88724088668823, 40.721274399184466]]] },
    properties: {
      boroct2010: '4066701', ct2010: '066701', geolabel: '667.01', geoid: '4066701', ntacode: 'QN21',
    },
  }, {
    type: 'Feature',
    geometry: { type: 'Polygon', coordinates: [[[-73.89503002166748, 40.712475750409226], [-73.88842105865479, 40.71226430831243], [-73.88730525970459, 40.71055648214798], [-73.88814210891724, 40.710345033956486], [-73.88784170150757, 40.7098896048019], [-73.88861417770386, 40.70966188905655], [-73.88822793960571, 40.70889740907319], [-73.88938665390015, 40.708555830073635], [-73.88930082321167, 40.70790519856075], [-73.8855242729187, 40.70644125441473], [-73.88554573059082, 40.70614846172376], [-73.8865327835083, 40.70622979315593], [-73.88912916183472, 40.70559540535095], [-73.89127492904663, 40.703594604229664], [-73.89279842376709, 40.70196789235325], [-73.89271259307861, 40.70185402103405], [-73.89344215393066, 40.702179367143856], [-73.89127492904663, 40.7050748775105], [-73.89181137084961, 40.706392455722295], [-73.89633893966675, 40.705270075927444], [-73.89756202697754, 40.707758805594295], [-73.89936447143555, 40.710328768683155], [-73.90058755874634, 40.712703456531784], [-73.89503002166748, 40.712475750409226]]] },
    properties: {
      boroct2010: '4061301', ct2010: '061301', geolabel: '613.01', geoid: '4061301', ntacode: 'QN20',
    },
  }, {
    type: 'Feature',
    geometry: { type: 'Polygon', coordinates: [[[-73.93616437911987, 40.68862735642398], [-73.94193649291992, 40.687960259507435], [-73.94251585006714, 40.69088892798021], [-73.93676519393921, 40.69155599557874], [-73.93616437911987, 40.68862735642398]]] },
    properties: {
      boroct2010: '3027900', ct2010: '027900', geolabel: '279', geoid: '3027900', ntacode: 'BK35',
    },
  }],
};

module.exports = function (environment) {
  const ENV = {
    modulePrefix: 'labs-nyc-factfinder',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false,
      },
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    'ember-mapbox-composer': {
      host: 'https://labs-layers-api.herokuapp.com',
      namespace: 'v1',
    },

    'mapbox-gl': {
      accessToken: 'pk.eyJ1Ijoid21hdHRnYXJkbmVyIiwiYSI6Ii1icTRNT3MifQ.WnayxAOEoXX-jWsNmHUhyg',
      map: {
        style: 'https://labs-layers-api-staging.herokuapp.com/v1/base/style.json',
      },
    },

    metricsAdapters: [
      {
        name: 'GoogleAnalytics',
        environments: ['production', 'development'],
        config: {
          id: 'UA-84250233-10',
          // Use `analytics_debug.js` in development
          debug: environment === 'development-ga',
          // Use verbose tracing of GA events
          trace: environment === 'development-ga',
          // Ensure development env hits aren't sent to GA
          sendHitTask: environment !== 'development',
        },
      },
    ],

    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self' www.google-analytics.com",
    },

    SAMPLE_SELECTION,

    SupportServiceHost: 'https://factfinder-api.herokuapp.com',
  };

  ENV.DEFAULT_SELECTION = {
    type: 'FeatureCollection',
    features: [],
  };

  if (environment === 'development') {
    // ENV.DEFAULT_SELECTION = SAMPLE_SELECTION;
    ENV.SupportServiceHost = 'http://localhost:3000';
    ENV['ember-cli-mirage'] = {
      enabled: false,
    };
  }

  if (environment === 'staging') {
    // The "develop" client deployment also uses this staging environment to build (to make sure assets are
    // minified, etc.). To switch the SupportServiceHost to the develop Factfinder API, the API_URL
    // environment variable should be set to 'https://factfinder-api-staging.herokuapp.com/'.
    // See netlify.toml for setting netlify environment variable during build.
    ENV.SupportServiceHost = process.env.API_URL || 'https://factfinder-api-staging.herokuapp.com/';
    ENV['ember-cli-mirage'] = {
      enabled: false,
    };
  }

  if (environment === 'devlocal') {
    ENV.SupportServiceHost = 'http://localhost:3000';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';
    ENV.SupportServiceHost = 'https://factfinder-api.herokuapp.com';

    ENV.DEFAULT_SELECTION = SAMPLE_SELECTION;

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    ENV['mapbox-gl'].map.style = 'https://labs-layers-api.herokuapp.com/v1/base/style.json';
    ENV['ember-mapbox-composer'].host = 'https://labs-layers-api.herokuapp.com';
    ENV.SupportServiceHost = 'https://factfinder-api.herokuapp.com';
  }

  return ENV;
};
