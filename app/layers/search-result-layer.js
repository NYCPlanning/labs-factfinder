export default {
  id: 'search-result-line',
  type: 'line',
  source: 'searchResultSource',
  layout: {
    'line-cap': 'round',
  },
  paint: {
    'line-opacity': 0.9,
    'line-color': '#ad5620',
    'line-width': {
      stops: [
        [
          13,
          1.5,
        ],
        [
          15,
          8,
        ],
      ],
    },
    'line-dasharray': [
      2,
      1.5,
    ],
  },
};
