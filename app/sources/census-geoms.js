export default {
  id: 'census-geoms',
  type: 'cartovector',
  'source-layers': [
    {
      id: 'census-geoms-tracts',
      sql: 'SELECT the_geom_webmercator, ct2010, boroct2010, boroct2010 AS geoid FROM nyc_census_tracts_2010',
    },
    {
      id: 'census-geoms-blocks',
      sql: 'SELECT the_geom_webmercator, ct2010, bctcb2010, bctcb2010 AS geoid FROM nyc_census_blocks_2010',
    },
  ],
};
