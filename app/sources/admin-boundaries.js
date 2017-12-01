export default {
  id: 'admin-boundaries',
  type: 'cartovector',
  'source-layers': [
    {
      id: 'neighborhood-tabulation-areas',
      sql: `
        SELECT a.the_geom_webmercator, e, p, ntaname, ntacode, ntacode AS geolabel, ntacode AS geoid, geotype
        FROM support_admin_ntaboundaries a
          LEFT JOIN economic on a.ntacode = economic.geoid
        WHERE ntaname NOT ILIKE 'park-cemetery-etc%'
          AND  dataset = 'Y2011-2015' AND variable = 'PBwPv' AND geotype = 'NTA2010'
      `,
    },

    {
      id: 'neighborhood-tabulation-areas-centroids',
      sql: 'SELECT ST_Centroid(the_geom_webmercator) as the_geom_webmercator, ntaname FROM support_admin_ntaboundaries WHERE ntaname NOT ILIKE \'park-cemetery-etc%\'',
    },

    {
      id: 'boroughs',
      sql: 'SELECT the_geom_webmercator, boroname FROM support_admin_boroboundaries',
    },

    {
      id: 'nyc-pumas',
      sql: 'SELECT the_geom_webmercator, puma AS geolabel, puma AS geoid FROM nyc_puma',
    },

    {
      id: 'nyc-pumas-centroids',
      sql: 'SELECT ST_Centroid(the_geom_webmercator) as the_geom_webmercator, puma FROM nyc_puma',
    },

  ],
};
