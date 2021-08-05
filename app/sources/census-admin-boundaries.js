export default {
  id: 'census-admin-boundaries',
  type: 'cartovector',
  'source-layers': [
    {
      id: 'neighborhood-tabulation-areas',
      sql: `
        SELECT a.the_geom_webmercator, ntaname, nta2020, nta2020 AS geolabel, a.nta2020 AS geoid
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
      id: 'blocks',
      sql: 'SELECT the_geom_webmercator, bctcb2020 as geolabel, geoid AS geoid FROM nycb2020_fixed',
    },

    {
      id: 'districts',
      sql: 'SELECT the_geom_webmercator, borocd AS geolabel, borocd AS geoid FROM nycd2020',
    },

    {
      id: 'boroughs',
      sql: 'SELECT the_geom_webmercator, boroname AS geolabel, borocode AS geoid FROM nybb2020',
    },

    {
      id: 'cities',
      sql: 'SELECT the_geom_webmercator, city AS geolabel, city AS geoid FROM nycity2020',
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
