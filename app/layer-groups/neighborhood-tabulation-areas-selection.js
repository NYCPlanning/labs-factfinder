export default {
  id: 'neighborhood-tabulation-areas-selection',
  title: 'Neighborhood Tabulation Areas',
  visible: true,
  layers: [
    {
      layer: {
        id: 'neighborhood-tabulation-areas-fill',
        type: 'fill',
        source: 'census-admin-boundaries',
        'source-layer': 'neighborhood-tabulation-areas',
        paint: {
          'fill-opacity': 0.01,
        },
      },
      highlightable: true,
    },
    {
      layer: {
        id: 'neighborhood-tabulation-areas-line-glow',
        type: 'line',
        source: 'census-admin-boundaries',
        'source-layer': 'neighborhood-tabulation-areas',
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
        id: 'neighborhood-tabulation-areas-line',
        type: 'line',
        source: 'census-admin-boundaries',
        'source-layer': 'neighborhood-tabulation-areas',
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
        id: 'neighborhood-tabulation-areas-label',
        type: 'symbol',
        source: 'census-admin-boundaries',
        'source-layer': 'neighborhood-tabulation-areas-centroids',
        minzoom: 11,
        paint: {
          'text-color': '#626262',
          'text-halo-color': '#FFFFFF',
          'text-halo-width': 2,
          'text-halo-blur': 2,
        },
        layout: {
          'text-field': '{ntaname}',
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-size': {
            stops: [
              [11, 12],
              [14, 16],
            ],
          },
        },
      },
    },
  ],
};
