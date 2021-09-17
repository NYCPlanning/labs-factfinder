export default {
  id: 'census-admin-boundaries',
  type: 'cartovector',
  'source-layers': [
    {
      id: 'neighborhood-tabulation-areas',
      sql: `
        SELECT a.the_geom_webmercator, ntaname, nta2020, nta2020 AS geolabel, a.nta2020 AS geoid
        FROM pff_2020_ntas_21c a
        WHERE ntaname NOT ILIKE 'park-cemetery-etc%'
          AND ntaname != 'Airport'
      `,
    },

    {
      id: 'neighborhood-tabulation-areas-centroids',
      sql: 'SELECT ST_Centroid(the_geom_webmercator) as the_geom_webmercator, ntaname FROM pff_2020_ntas_21c WHERE ntaname NOT ILIKE \'park-cemetery-etc%\'',
    },

    {
      id: 'cdtas',
      sql: 'SELECT the_geom_webmercator, cdtaname AS geolabel, cdta2020 AS geoid FROM pff_2020_cdtas_21c',
    },

    {
      id: 'tracts',
      sql: 'SELECT the_geom_webmercator, ctlabel as geolabel, boroct2020 AS geoid FROM pff_2020_census_tracts_21c',
    },

    {
      id: 'blocks',
      sql: 'SELECT the_geom_webmercator, bctcb2020 as geolabel, geoid AS geoid FROM pff_2020_census_blocks_21c',
    },

    {
      id: 'districts',
      sql: 'SELECT the_geom_webmercator, borocd AS geolabel, borocd AS geoid FROM pff_2020_community_districts_21c',
    },

    {
      id: 'boroughs',
      sql: 'SELECT the_geom_webmercator, boroname AS geolabel, borocode AS geoid FROM pff_2020_boroughs_21c',
    },

    {
      id: 'cities',
      sql: 'SELECT the_geom_webmercator, city AS geolabel, city AS geoid FROM pff_2020_city_21c',
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
