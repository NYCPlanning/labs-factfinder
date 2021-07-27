export default {
  blocks: (webmercator = true) => `
    SELECT
      ${webmercator ? 'the_geom_webmercator' : 'the_geom'},
      ct2010,
      borocode || ct2010 AS boroct2010,
      cb2010,
      borocode,
      bctcb2010,
      bctcb2010 AS geoid,
      (ct2010::float / 100)::text || ' - ' || cb2010 as geolabel
    FROM nyc_census_blocks
  `,

  tracts: (webmercator = true) => `
    SELECT
      ${webmercator ? 'the_geom_webmercator' : 'the_geom'},
      ct2010,
      ctlabel as geolabel,
      boroct2010,
      ntacode,
      boroct2010 AS geoid
    FROM nyc_census_tracts
  `,

  cdtas: (webmercator = true) => `
    SELECT
      ${webmercator ? 'the_geom_webmercator' : 'the_geom'},
      the_geom,
      cdtaname as geolabel,
      cdta2020,
      cdtatype,
      boroname,
      cdta2020 AS geoid
    FROM nycdta2020
  `,

  districts: (webmercator = true) => `
    SELECT
      ${webmercator ? 'the_geom_webmercator' : 'the_geom'},
      the_geom,
      cd_short_title as geolabel,
      boroname,
      borocd AS geoid
    FROM cd_boundaries_v0_dh
  `,

  boroughs: (webmercator = true) => `
    SELECT
      ${webmercator ? 'the_geom_webmercator' : 'the_geom'},
      the_geom,
      boroname as geolabel,
      boroname,
      borocode AS geoid
    FROM dcp_borough_boundary
  `,

  ntas: (webmercator = true) => `
    SELECT
      ${webmercator ? 'the_geom_webmercator' : 'the_geom'},
      ntaname,
      ntacode,
      ntacode as geolabel,
      ntacode AS geoid
    FROM nta_boundaries
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
