export default {
  id: 'admin-boundaries',
  type: 'cartovector',
  'source-layers': [
    {
      id: 'neighborhood-tabulation-areas',
      sql: `
        SELECT a.the_geom_webmercator, ntaname, ntacode, ntacode AS geolabel, a.ntacode AS geoid
        FROM support_admin_ntaboundaries a
        WHERE ntaname NOT ILIKE 'park-cemetery-etc%'
          AND ntaname != 'Airport'
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
      id: 'nyc-council-districts',
      sql: 'SELECT the_geom_webmercator, coundist FROM support_admin_nyccouncildistricts',
    },

    {
      id: 'nyc-pumas',
      sql: 'SELECT the_geom_webmercator, puma AS geolabel, puma AS geoid FROM nyc_puma',
    },

    {
      id: 'nyc-pumas-centroids',
      sql: 'SELECT ST_Centroid(the_geom_webmercator) as the_geom_webmercator, puma FROM nyc_puma',
    },

    {
      id: 'community-districts',
      sql: `
        SELECT the_geom_webmercator, borocd,
          CASE
            WHEN LEFT(borocd::text, 1) = '1' THEN 'Manhattan ' || borocd % 100
            WHEN LEFT(borocd::text, 1) = '2' THEN 'Bronx ' || borocd % 100
            WHEN LEFT(borocd::text, 1) = '3' THEN 'Brooklyn ' || borocd % 100
            WHEN LEFT(borocd::text, 1) = '4' THEN 'Queens ' || borocd % 100
            WHEN LEFT(borocd::text, 1) = '5' THEN 'Staten Island ' || borocd % 100
          END as boro_district
        FROM support_admin_cdboundaries
        WHERE borocd % 100 < 20
      `,
    },

  ],
};
