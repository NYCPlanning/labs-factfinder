const selectedFeatures = {
  fill: {
    id: 'selected-fill',
    type: 'fill',
    source: 'selected-features',
    paint: {
      'fill-opacity': 1,
      'fill-color': 'rgba(113, 113, 113, 1)',
    },
  },
  line: {
    id: 'selected-line',
    type: 'line',
    source: 'selected-features',
    layout: {
      'line-cap': 'round',
    },
    paint: {
      'line-opacity': 0.6,
      'line-color': 'rgba(41, 34, 191, 1)',
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
  },
};

export default selectedFeatures;
