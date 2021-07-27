export default {
  id: 'districts',
  title: 'Community Districts',
  visible: true,
  layers: [
    {
      layer: {
        id: 'districts-fill',
        type: 'fill',
        source: 'census-admin-boundaries',
        'source-layer': 'districts',
        paint: {
          'fill-opacity': 0.01,
        },
      },
      highlightable: true,
    },
    // {
    //   layer: {
    //     id: 'districts-line-glow',
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
        id: 'districts-line',
        type: 'line',
        source: 'census-admin-boundaries',
        'source-layer': 'districts',
        paint: {
          'line-color': '#444',
          'line-opacity': 0.5,
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
        id: 'districts-label',
        type: 'symbol',
        source: 'census-admin-boundaries',
        'source-layer': 'districts',
        minzoom: 13,
        layout: {
          'text-field': '{borocd}',
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
