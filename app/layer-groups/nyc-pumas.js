export default {
  id: 'nyc-pumas',
  title: 'NYC PUMA',
  visible: true,
  layers: [
    {
      layer: {
        id: 'nyc-pumas-fill',
        type: 'fill',
        source: 'admin-boundaries',
        'source-layer': 'nyc-pumas',
        paint: {
          'fill-opacity': 0.01,
        },
      },
      highlightable: true,
    },
    {
      layer: {
        id: 'nyc-pumas-line-glow',
        type: 'line',
        source: 'admin-boundaries',
        'source-layer': 'nyc-pumas',
        paint: {
          'line-color': '#000000',
          'line-opacity': 0.2,
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
        id: 'nyc-pumas-line',
        type: 'line',
        source: 'admin-boundaries',
        'source-layer': 'nyc-pumas',
        paint: {
          'line-color': '#444',
          'line-opacity': 0.3,
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
        id: 'nyc-pumas-label',
        type: 'symbol',
        source: 'admin-boundaries',
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
