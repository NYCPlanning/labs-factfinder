import adminBoundaryStyles from '../utils/admin-boundary-styles';

const { paint, layout, labelLayout } = adminBoundaryStyles;

export default {
  id: 'nyccouncildistricts',
  title: 'NYC Council Districts',
  legendIcon: 'admin-line',
  legendColor: '#76F578',
  visible: false,
  meta: {
    description: 'Administrative and Political Districts v17D, Bytes of the Big Apple',
    url: ['https://www1.nyc.gov/site/planning/data-maps/open-data.page'],
    updated_at: '21 November 2017',
  },
  layers: [
    {
      layer: {
        id: 'nyccouncildistricts-line-glow',
        type: 'line',
        source: 'admin-boundaries',
        'source-layer': 'nyc-council-districts',
        paint: {
          'line-color': '#76F578',
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
        id: 'nyccouncildistricts-line',
        type: 'line',
        source: 'admin-boundaries',
        'source-layer': 'nyc-council-districts',
        paint: paint.lines,
        layout: layout.lines,
      },
    },
    {
      layer: {
        id: 'nyccouncildistricts-label',
        type: 'symbol',
        source: 'admin-boundaries',
        'source-layer': 'nyc-council-districts',
        paint: paint.labels,
        layout: labelLayout('coundist'),
      },
    },
  ],
};
