export default {
  id: 'census-admin-boundaries',
  type: 'cartovector',
  'source-layers': [
    {
      id: 'neighborhood-tabulation-areas',
      sql: `
        SELECT a.the_geom_webmercator, ntaname, ntacode, ntacode AS geolabel, a.ntacode AS geoid
        FROM nynta2020 a
        WHERE ntaname NOT ILIKE 'park-cemetery-etc%'
          AND ntaname != 'Airport'
      `,
    },

    {
      id: 'neighborhood-tabulation-areas-centroids',
      sql: 'SELECT ST_Centroid(the_geom_webmercator) as the_geom_webmercator, ntaname FROM nynta2020 WHERE ntaname NOT ILIKE \'park-cemetery-etc%\'',
    },

    {
      id: 'cdtas',
      sql: 'SELECT the_geom_webmercator, cdtaname AS geolabel, cdta2020 AS geoid FROM nycdta2020',
    },

    {
      id: 'tracts',
      sql: 'SELECT the_geom_webmercator, ctlabel as geolabel, boroct2020 AS geoid FROM nyct2020',
    },

    {
      id: 'districts',
      sql: 'SELECT the_geom_webmercator, cd_short_title AS geolabel, borocd AS geoid FROM cd_boundaries_v0_dh',
    },

    {
      id: 'boroughs',
      sql: 'SELECT the_geom_webmercator, boroname AS geolabel, borocode AS geoid FROM dcp_borough_boundary',
    },

    {
      id: 'cities',
      sql: 'SELECT the_geom_webmercator, "New York City" AS geolabel, id AS geoid FROM nyc2020_sw_unofficial',
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
