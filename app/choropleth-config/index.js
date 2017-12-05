export default [
  {
    id: 'poverty',
    paint: {
      'fill-color': {
        property: 'poverty_e',
        stops: [
          [4999, '#E5E544'],

          [5000, '#E5BD44'],
          [9999, '#E5BD44'],

          [10000, '#E59544'],
          [14999, '#E59544'],

          [15000, '#E56D44'],
          [19999, '#E56D44'],

          [20000, '#E54444'],
        ],
      },
    },
  },
  {
    id: 'populationDensity',
    paint: {
      'fill-color': {
        property: 'population_density',
        stops: [

          [24.9, '#E5E544'],

          [25, '#E5BD44'],
          [49.9, '#E5BD44'],

          [50, '#E59544'],
          [99.9, '#E59544'],

          [100, '#E56D44'],
          [149.9, '#E56D44'],

          [150.0, '#E54444'],
        ],
      },
    },
  },
];
