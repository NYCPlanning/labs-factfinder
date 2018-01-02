import choroplethConfigs from '../choropleth-config';

export default {
  id: 'choropleths',
  title: 'Thematic Maps',
  visible: false,
  layers: [
    {
      layer: {
        id: 'choropleth-nta-fill',
        type: 'fill',
        source: 'choropleths',
        'source-layer': 'neighborhood-tabulation-areas',
        paint: {
          'fill-opacity': 0.6,
          'fill-color': choroplethConfigs.find(d => d.id === 'popperacre').paintFill['fill-color'],
        },
      },
    },
    {
      layer: {
        id: 'choropleth-nta-line',
        type: 'line',
        source: 'choropleths',
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
          'line-color': choroplethConfigs.find(d => d.id === 'popperacre').paintLine['line-color'],
          'line-translate-anchor': 'map',
        },
      },
    },
  ],
};
