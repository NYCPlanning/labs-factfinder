'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    'ember-cli-babel': {
      includePolyfill: true,
    },
    postcssOptions: {
      compile: {
        extension: 'scss',
        enabled: true,
        parser: require('postcss-scss'),
        plugins: [
          {
            module: require('@csstools/postcss-sass'),
            options: {
              includePaths: [
                'node_modules/foundation-sites/scss',
                'node_modules/nyc-planning-style-guide/dist/assets/scss',
              ],
            },
          },
        ],
      },
    },
    autoImport: {
      skipBabel: [
        {
          package: 'mapbox-gl',
          semverRange: '*',
        },
        {
          package: 'mapbox-gl-draw',
          semverRange: '*',
        },
        {
          package: 'ember-mapbox-gl',
          semverRange: '*',
        },
        {
          package: 'ember-mapbox-gl-draw',
          semverRange: '*',
        },
        {
          package: 'ember-mapbox-composer',
          semverRange: '*',
        },
        {
          package: '@mapbox/mapbox-gl-draw',
          semverRange: '*',
        },
      ],
      webpack: {
        node: {
          fs: 'empty',
        },
      },
    },
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
