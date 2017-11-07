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
    FROM nyc_census_blocks_2010
  `,

  tracts: (webmercator = true) => `
    SELECT
      ${webmercator ? 'the_geom_webmercator' : 'the_geom'},
      ct2010,
      ctlabel as geolabel,
      boroct2010,
      ntacode,
      boroct2010 AS geoid
    FROM nyc_census_tracts_2010
  `,

  ntas: (webmercator = true) => `
    SELECT
      ${webmercator ? 'the_geom_webmercator' : 'the_geom'},
      ntaname,
      ntacode,
      ntacode as geolabel,
      ntacode AS geoid
    FROM support_admin_ntaboundaries
  `,
};
