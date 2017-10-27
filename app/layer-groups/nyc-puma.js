export default {
  id: 'nyc-puma',
  title: 'NYC PUMA',
  visible: true,
  layers: [
    {
      layer: {
        id: 'nyc-puma-fill',
        type: 'fill',
        source: 'admin-boundaries',
        'source-layer': 'nyc-puma',
        paint: {
          'fill-opacity': 0.01,
        },
      },
      highlightable: true,
    },
    {
      layer: {
        id: 'nyc-puma-line-glow',
        type: 'line',
        source: 'admin-boundaries',
        'source-layer': 'nyc-puma',
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
        id: 'nyc-puma-line',
        type: 'line',
        source: 'admin-boundaries',
        'source-layer': 'nyc-puma',
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
        id: 'nyc-puma-label',
        type: 'symbol',
        source: 'admin-boundaries',
        'source-layer': 'nyc-puma',
        minzoom: 11,
        paint: {
          'text-color': '#626262',
          'text-halo-color': '#FFFFFF',
          'text-halo-width': 2,
          'text-halo-blur': 2,
          'text-opacity': {
            stops: [
              [
                12,
                0,
              ],
              [
                13,
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
                11,
                8,
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
