export default {
  id: 'census-blocks',
  title: 'Census Blocks',
  visible: true,
  layers: [
    {
      layer: {
        id: 'census-blocks-fill',
        type: 'fill',
        source: 'census-geoms',
        'source-layer': 'census-geoms-blocks',
        paint: {
          'fill-opacity': 0.01,
        },
      },
    },
    // {
    //   layer: {
    //     id: 'census-blocks-line-glow',
    //     type: 'line',
    //     source: 'census-geoms',
    //     'source-layer': 'census-geoms-blocks',
    //     paint: {
    //       'line-color': '#76CAF5',
    //       'line-opacity': 0.2,
    //       'line-width': {
    //         stops: [
    //           [11, 3],
    //           [16, 6],
    //         ],
    //       },
    //     },
    //   },
    // },
    {
      layer: {
        id: 'census-blocks-line',
        type: 'line',
        source: 'census-geoms',
        'source-layer': 'census-geoms-blocks',
        paint: {
          'line-color': 'rgba(0, 0, 0, 1)',
          'line-opacity': 0.3,
          'line-width': {
            stops: [
              [
                11,
                0.5,
              ],
              [
                16,
                1,
              ],
            ],
          },
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
      },
    },
    {
      layer: {
        id: 'census-blocks-label',
        type: 'symbol',
        source: 'census-geoms',
        'source-layer': 'census-geoms-blocks',
        minzoom: 13,
        layout: {
          'text-field': '{cb2010}',
          'text-font': [
            'Open Sans Semibold',
            'Arial Unicode MS Bold',
          ],
          'text-size': {
            stops: [
              [
                13,
                6,
              ],
              [
                17,
                16,
              ],
            ],
          },

        },
        paint: {
          'text-color': '#626262',
          'text-halo-color': '#FFFFFF',
          'text-halo-width': 2,
          'text-halo-blur': 2,
          'text-opacity': {
            stops: [
              [
                13,
                0,
              ],
              [
                14,
                1,
              ],
            ],
          },
        },
      },
    },
  ],
};
