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
          'fill-color': choroplethConfigs.find(d => d.id === 'poverty').paint['fill-color'],
        },
      },
    },
    {
      layer: {
        id: 'choropleth-nta-line',
        type: 'line',
        source: 'admin-boundaries',
        'source-layer': 'neighborhood-tabulation-areas',
        paint: {
          'line-width': {
            stops: [
              [
                10,
                2,
              ],
              [
                14,
                5,
              ],
            ],
          },
          'line-opacity': 0.6,
          'line-color': 'rgba(116, 116, 116, 1)',
          'line-translate-anchor': 'map',
        },
      },
    },
  ],
};
