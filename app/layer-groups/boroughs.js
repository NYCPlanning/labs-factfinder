export default {
  id: 'boroughs',
  title: 'Boroughs',
  visible: true,
  layers: [
    {
      layer: {
        id: 'boroughs-fill',
        type: 'fill',
        source: 'census-admin-boundaries',
        'source-layer': 'boroughs',
        paint: {
          'fill-opacity': 0.01,
        },
      },
      highlightable: true,
    },
    {
      layer: {
        id: 'boroughs-line',
        type: 'line',
        source: 'census-admin-boundaries',
        'source-layer': 'boroughs',
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
        id: 'boroughs-label',
        type: 'symbol',
        source: 'census-admin-boundaries',
        'source-layer': 'boroughs',
        minzoom: 13,
        layout: {
          'text-field': '{boroname}',
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
