import choroplethConfigs from '../choropleth-config';

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
          'fill-color': choroplethConfigs.poverty['fill-color'],
        },
      },
    },
  ],
};
