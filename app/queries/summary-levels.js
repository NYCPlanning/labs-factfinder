export default {
  blocks: (webmercator = true) => `
    SELECT
      ${webmercator ? 'the_geom_webmercator' : 'the_geom'},
      ct2020,
      borocode || ct2020 AS boroct2020,
      cb2020,
      borocode::text,
      bctcb2020,
      bctcb2020 AS geoid,
      bctcb2020 as geolabel
    FROM pff_2020_census_blocks_21c
  `,

  tracts: (webmercator = true) => `
    SELECT
      ${webmercator ? 'the_geom_webmercator' : 'the_geom'},
      ct2020,
      ctlabel as geolabel,
      boroct2020,
      nta2020,
      cdta2020,
      borocode::text,
      boroct2020 AS geoid
    FROM pff_2020_census_tracts_21c
  `,

  ccds: (webmercator = true) => `
    SELECT
      ${webmercator ? 'the_geom_webmercator' : 'the_geom'},
      coundist as geolabel,
      CONCAT('CCD', coundist) AS geoid
    FROM dcp_city_council_districts
  `,

  cdtas: (webmercator = true) => `
    SELECT
      ${webmercator ? 'the_geom_webmercator' : 'the_geom'},
      cdtaname as geolabel,
      cdta2020,
      cdtatype,
      boroname,
      borocode::text,
      cdta2020 AS geoid
    FROM pff_2020_cdtas_21c
  `,

  districts: (webmercator = true) => `
    SELECT
      ${webmercator ? 'the_geom_webmercator' : 'the_geom'},
      borocd as geolabel,
      borocd AS geoid
    FROM pff_2020_community_districts_21c
  `,

  boroughs: (webmercator = true) => `
    SELECT
      ${webmercator ? 'the_geom_webmercator' : 'the_geom'},
      boroname as geolabel,
      borocode AS geoid,
      borocode::text
    FROM pff_2020_boroughs_21c
  `,

  cities: (webmercator = true) => `
    SELECT
      ${webmercator ? 'the_geom_webmercator' : 'the_geom'},
      city as geolabel,
      city AS geoid
    FROM pff_2020_city_21c
  `,

  ntas: (webmercator = true) => `
    SELECT
      ${webmercator ? 'the_geom_webmercator' : 'the_geom'},
      ntaname,
      nta2020,
      nta2020 as geolabel,
      nta2020 AS geoid,
      borocode::text
    FROM pff_2020_ntas_21c
    WHERE ntaname NOT ILIKE 'park-cemetery-etc%25'
      AND ntaname != 'Airport'
  `,

  pumas: (webmercator = true) => `
    SELECT
      ${webmercator ? 'the_geom_webmercator' : 'the_geom'},
      puma AS geolabel,
      puma AS geoid
    FROM nyc_puma
  `,
};
