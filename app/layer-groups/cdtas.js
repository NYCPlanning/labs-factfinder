export default {
  id: 'cdtas',
  title: 'CDTAs',
  visible: true,
  layers: [
    {
      layer: {
        id: 'cdtas-fill',
        type: 'fill',
        source: 'census-admin-boundaries',
        'source-layer': 'cdtas',
        paint: {
          'fill-opacity': 0.01,
        },
      },
      highlightable: true,
    },
    // {
    //   layer: {
    //     id: 'cdtas-line-glow',
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
        id: 'cdtas-line',
        type: 'line',
        source: 'census-admin-boundaries',
        'source-layer': 'cdtas',
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
        id: 'cdtas-label',
        type: 'symbol',
        source: 'census-admin-boundaries',
        'source-layer': 'cdtas',
        minzoom: 13,
        layout: {
          'text-field': '{cdta2020}',
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
