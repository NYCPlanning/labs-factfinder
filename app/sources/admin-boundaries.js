export default {
  id: 'admin-boundaries',
  type: 'cartovector',
  'source-layers': [
    {
      id: 'neighborhood-tabulation-areas',
      sql: 'SELECT the_geom_webmercator, ntaname, ntacode, ntacode AS geoid FROM support_admin_ntaboundaries WHERE ntaname NOT ILIKE \'park-cemetery-etc%\'',
    },

    {
      id: 'neighborhood-tabulation-areas-centroids',
      sql: 'SELECT ST_Centroid(the_geom_webmercator) as the_geom_webmercator, ntaname FROM support_admin_ntaboundaries WHERE ntaname NOT ILIKE \'park-cemetery-etc%\'',
    },

    {
      id: 'boroughs',
      sql: 'SELECT the_geom_webmercator, boroname FROM support_admin_boroboundaries',
    },
  ],
};
