export default {
  id: 'subdued_nta_labels',
  type: 'symbol',
  source: 'census-admin-boundaries',
  'source-layer': 'neighborhood-tabulation-areas-centroids',
  paint: {
    'text-halo-color': 'hsl(0, 0%, 100%)',
    'text-halo-width': 1,
    'text-color': 'hsl(0, 0%, 62%)',
    'text-halo-blur': 0,
  },
  layout: {
    'text-field': '{ntaname}',
    'text-transform': 'uppercase',
    'text-letter-spacing': 0.1,
    'text-max-width': 7,
    'text-font': [
      'DIN Offc Pro Regular',
      'Arial Unicode MS Regular',
    ],
    'text-padding': 3,
    'text-size': {
      base: 1,
      stops: [
        [
          12,
          11,
        ],
        [
          16,
          16,
        ],
      ],
    },
  },
};
