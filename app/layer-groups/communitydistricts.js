import adminBoundaryStyles from '../utils/admin-boundary-styles';

const { paint, layout, labelLayout } = adminBoundaryStyles;

export default {
  id: 'community-districts',
  title: 'Community Districts',
  legendIcon: 'admin-line',
  legendColor: '#76CAF5',
  visible: false,
  meta: {
    description: 'Administrative and Political Districts v17D, Bytes of the Big Apple',
    url: ['https://www1.nyc.gov/site/planning/data-maps/open-data.page'],
    updated_at: '21 November 2017',
  },
  layers: [
    {
      layer: {
        id: 'community-districts-line-glow',
        type: 'line',
        source: 'admin-boundaries',
        'source-layer': 'community-districts',
        paint: {
          'line-color': '#76CAF5',
          'line-opacity': 0.2,
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
        id: 'community-districts-line',
        type: 'line',
        source: 'admin-boundaries',
        'source-layer': 'community-districts',
        paint: paint.lines,
        layout: layout.lines,
      },
    },
    {
      layer: {
        id: 'community-districts-label',
        type: 'symbol',
        source: 'admin-boundaries',
        'source-layer': 'community-districts',
        minzoom: 11,
        paint: paint.labels,
        layout: labelLayout('boro_district'),
      },
    },
  ],
};
