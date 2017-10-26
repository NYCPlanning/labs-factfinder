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
    {
      layer: {
        id: 'census-blocks-line-glow',
        type: 'line',
        source: 'census-geoms',
        'source-layer': 'census-geoms-blocks',
        paint: {
          'line-color': '#76CAF5',
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
        id: 'census-blocks-line',
        type: 'line',
        source: 'census-geoms',
        'source-layer': 'census-geoms-blocks',
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
        id: 'census-blocks-label',
        type: 'symbol',
        source: 'census-geoms',
        'source-layer': 'census-geoms-blocks',
        minzoom: 11,
        paint: {
          'text-color': '#626262',
          'text-halo-color': '#FFFFFF',
          'text-halo-width': 2,
          'text-halo-blur': 2,
        },
        layout: {
          'text-field': `{bctcb2010}`,
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-size': {
            stops: [
              [11, 12],
              [14, 16],
            ],
          },
        }
      },
    },
  ],
};
