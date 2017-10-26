export default {
  id: 'census-tracts',
  title: 'Census Tracts',
  visible: true,
  layers: [
    {
      layer: {
        id: 'census-tracts-fill',
        type: 'fill',
        source: 'census-geoms',
        'source-layer': 'census-geoms-tracts',
        paint: {
          'fill-opacity': 0.01,
        },
      },
    },
    {
      layer: {
        id: 'census-tracts-line-glow',
        type: 'line',
        source: 'census-geoms',
        'source-layer': 'census-geoms-tracts',
        paint: {
          'line-color': '#76F578',
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
        id: 'census-tracts-line',
        type: 'line',
        source: 'census-geoms',
        'source-layer': 'census-geoms-tracts',
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
        id: 'census-tracts-label',
        type: 'symbol',
        source: 'census-geoms',
        'source-layer': 'census-geoms-tracts',
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
          'text-field': '{ctlabel}',
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
