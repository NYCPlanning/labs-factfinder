export default {
  blocks: (webmercator = true) => `
    SELECT
      ${webmercator ? 'the_geom_webmercator' : 'the_geom'},
      ct2020,
      borocode || ct2020 AS boroct2020,
      cb2020,
      borocode,
      bctcb2020,
      geoid AS geoid,
      bctcb2020 as geolabel
    FROM nycb2020_fixed
  `,

  tracts: (webmercator = true) => `
    SELECT
      ${webmercator ? 'the_geom_webmercator' : 'the_geom'},
      ct2020,
      ctlabel as geolabel,
      boroct2020,
      nta2020,
      boroct2020 AS geoid
    FROM nyct2020
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
    FROM nycdta2020
  `,

  districts: (webmercator = true) => `
    SELECT
      ${webmercator ? 'the_geom_webmercator' : 'the_geom'},
      borocd as geolabel,
      borocd AS geoid
    FROM nycd2020
  `,

  boroughs: (webmercator = true) => `
    SELECT
      ${webmercator ? 'the_geom_webmercator' : 'the_geom'},
      boroname as geolabel,
      borocode AS geoid
    FROM nybb2020
  `,

  cities: (webmercator = true) => `
    SELECT
      ${webmercator ? 'the_geom_webmercator' : 'the_geom'},
      city as geolabel,
      city AS geoid
    FROM nycity2020
  `,

  ntas: (webmercator = true) => `
    SELECT
      ${webmercator ? 'the_geom_webmercator' : 'the_geom'},
      ntaname,
      nta2020,
      nta2020 as geolabel,
      nta2020 AS geoid
    FROM nynta2020
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
