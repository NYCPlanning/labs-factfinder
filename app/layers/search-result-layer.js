export default {
  id: 'search-result-line',
  type: 'line',
  source: 'searchResultSource',
  layout: {
    'line-cap': 'round',
  },
  paint: {
    'line-opacity': 0.9,
    'line-color': 'rgba(203, 88, 13, 1)',
    'line-width': {
      stops: [
        [
          13,
          4.5,
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
