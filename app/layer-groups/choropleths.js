import choroplethConfigs from '../choropleth-config';

export default {
  id: 'choropleths',
  title: 'Thematic Maps (NTAs)',
  titleTooltip: 'Neighborhood Tabulation Area maps for selected variables',
  visible: false,
  layers: [
    {
      layer: {
        id: 'choropleth-nta-fill',
        type: 'fill',
        source: 'choropleths',
        paint: {
          'fill-opacity': 0.6,
          'fill-color': choroplethConfigs.find(d => d.id === 'popacre').paintFill['fill-color'],
        },
      },
    },
    {
      layer: {
        id: 'choropleth-nta-line',
        type: 'line',
        source: 'choropleths',
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
          'line-color': choroplethConfigs.find(d => d.id === 'popacre').paintLine['line-color'],
          'line-translate-anchor': 'map',
        },
      },
    },
  ],
};
