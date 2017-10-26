export default {
  id: 'census-geoms',
  type: 'cartovector',
  'source-layers': [
    {
      id: 'census-geoms-tracts',
      sql: 'SELECT the_geom_webmercator, boroct2010 FROM nyc_census_tracts_2010',
    },
    {
      id: 'census-geoms-blocks',
      sql: 'SELECT the_geom_webmercator, bctcb2010 FROM nyc_census_blocks_2010',
    },
  ],
};
