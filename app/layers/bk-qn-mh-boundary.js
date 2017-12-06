export default {
  id: 'bk-qn-mh-boundary-line',
  type: 'line',
  source: 'bk-qn-mh-boundary',
  paint: {
    'line-opacity': 0.9,
    'line-color': 'rgba(91, 91, 91, 1)',
    'line-width': {
      stops: [
        [
          10,
          3,
        ],
        [
          14,
          5,
        ],
      ],
    },
  },
  layout: {
    'line-cap': 'round',
  },
};
