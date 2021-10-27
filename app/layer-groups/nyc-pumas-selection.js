export default {
  id: 'nyc-pumas-selection',
  title: 'NYC PUMA',
  visible: true,
  layers: [
    {
      layer: {
        id: 'nyc-pumas-selection-fill',
        type: 'fill',
        source: 'census-admin-boundaries',
        'source-layer': 'nyc-pumas',
        paint: {
          'fill-opacity': 0.01,
        },
      },
      highlightable: true,
    },
    {
      layer: {
        id: 'nyc-pumas-selection-line-glow',
        type: 'line',
        source: 'census-admin-boundaries',
        'source-layer': 'nyc-pumas',
        paint: {
          'line-color': '#ae561f',
          'line-opacity': 0.05,
          'line-width': {
            stops: [
              [11, 3],
              [16, 6],
            ],
          },
        },
      },
    },
    {
      layer: {
        id: 'nyc-pumas-selection-line',
        type: 'line',
        source: 'census-admin-boundaries',
        'source-layer': 'nyc-pumas',
        paint: {
          'line-color': '#444',
          'line-opacity': 0.5,
          'line-width': {
            stops: [
              [11, 1],
              [16, 3],
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
        id: 'nyc-pumas-selection-label',
        type: 'symbol',
        source: 'census-admin-boundaries',
        'source-layer': 'nyc-pumas-centroids',
        minzoom: 9,
        paint: {
          'text-color': '#626262',
          'text-halo-color': '#FFFFFF',
          'text-halo-width': 2,
          'text-halo-blur': 2,
          'text-opacity': {
            stops: [
              [
                9,
                0,
              ],
              [
                10,
                1,
              ],
            ],
          },
        },
        layout: {
          'text-field': '{puma}',
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-size': {
            stops: [
              [
                9,
                11,
              ],
              [
                14,
                16,
              ],
            ],
          },
        },
      },
    },
  ],
};
