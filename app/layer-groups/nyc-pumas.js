import adminBoundaryStyles from '../utils/admin-boundary-styles';

const { paint, layout, labelLayout } = adminBoundaryStyles;

export default {
  id: 'nyc-pumas',
  title: 'PUMAs',
  legendIcon: 'admin-line',
  legendColor: '#F5B176',
  visible: false,
  meta: {
    description: 'NYC PUMAS v17D, Bytes of the Big Apple',
    url: ['https://www1.nyc.gov/site/planning/data-maps/open-data.page'],
    updated_at: '21 November 2017',
  },
  layers: [
    {
      layer: {
        id: 'nyc-pumas-line-glow',
        type: 'line',
        source: 'admin-boundaries',
        'source-layer': 'nyc-pumas',
        paint: {
          'line-color': '#F5B176',
          'line-opacity': 1,
          'line-width': {
            stops: [
              [11, 6],
              [16, 12],
            ],
          },
        },
      },
    },
    {
      layer: {
        id: 'nyc-pumas-line',
        type: 'line',
        source: 'admin-boundaries',
        'source-layer': 'nyc-pumas',
        paint: paint.lines,
        layout: layout.lines,
      },
    },
    {
      layer: {
        id: 'nyc-pumas-label',
        type: 'symbol',
        source: 'admin-boundaries',
        'source-layer': 'nyc-pumas',
        minzoom: 10,
        paint: paint.labels,
        layout: labelLayout('stsendist'),
      },
    },
  ],
};
