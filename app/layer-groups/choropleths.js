export default {
  id: 'choropleths',
  title: 'Choropleths',
  visible: true,
  layers: [
    {
      layer: {
        id: 'choropleth-nta-fill',
        type: 'fill',
        source: 'admin-boundaries',
        'source-layer': 'neighborhood-tabulation-areas',
        paint: {
          'fill-opacity': 0.6,
          'fill-color': {
            property: 'e',
            stops: [
              [0, '#ffffb2'],
              [4999, '#fecc5c'],
              [5000, '#fecc5c'],
              [9999, '#fd8d3c'],
              [10000, '#fd8d3c'],
              [14999, '#f03b20'],
              [15000, '#f03b20'],
              [19999, '#bd0026'],
              [20000, '#bd0026'],
            ],
          },
        },
      },
    },
  ],
};
