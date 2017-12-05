export default {
  id: 'admin-boundaries',
  type: 'cartovector',
  'source-layers': [
    {
      id: 'neighborhood-tabulation-areas',
      sql: `
        SELECT a.the_geom_webmercator, pbwpv, popperacre, popu181, ntaname, ntacode, ntacode AS geolabel, a.ntacode AS geoid
        FROM support_admin_ntaboundaries a

          LEFT JOIN (
            SELECT geoid, e as pbwpv FROM economic
            WHERE dataset = 'Y2011-2015' AND variable = 'PBwPv' AND geotype = 'NTA2010'
          ) poverty on a.ntacode = poverty.geoid

          LEFT JOIN (
            SELECT geoid, value as popperacre FROM decennial_population_density
            WHERE year = '2010' AND variable = 'PopPerAcre'
          ) population_density on a.ntacode = population_density.geoid

          LEFT JOIN (
            SELECT geoid, e as popu181 FROM demographic
            WHERE dataset = 'Y2011-2015' AND variable = 'PopU181' AND geotype = 'NTA2010'
          ) popu181 on a.ntacode = popu181.geoid

        WHERE ntaname NOT ILIKE 'park-cemetery-etc%'
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
