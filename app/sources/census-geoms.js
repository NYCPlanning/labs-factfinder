import summaryLevels from '../queries/summary-levels';

export default {
  id: 'census-geoms',
  type: 'cartovector',
  'source-layers': [
    {
      id: 'census-geoms-tracts',
      sql: summaryLevels.tracts(),
    },
    {
      id: 'census-geoms-blocks',
      sql: summaryLevels.blocks(),
    },
  ],
};
