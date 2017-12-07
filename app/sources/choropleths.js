export default {
  id: 'choropleths',
  type: 'cartovector',
  'source-layers': [
    {
      id: 'neighborhood-tabulation-areas',
      sql: `
        SELECT a.the_geom_webmercator, ntaname, ntacode, ntacode AS geolabel, a.ntacode AS geoid,
        popperacre,
        popu181,
        pop65pl1,
        ea_bchdh,
        ea_bchdh_p,
        fb1_p,
        lgoenlep,
        pbwpv,
        pbwpv_p,
        mdgr
        FROM support_admin_ntaboundaries a

          LEFT JOIN (
            SELECT geoid, value as popperacre FROM decennial_population_density
            WHERE year = '2010' AND variable = 'PopPerAcre'
          ) population_density on a.ntacode = population_density.geoid

          LEFT JOIN (
            SELECT geoid, e as popu181 FROM demographic
            WHERE dataset = 'Y2011-2015' AND variable = 'PopU181' AND geotype = 'NTA2010'
          ) popu181 on a.ntacode = popu181.geoid

          LEFT JOIN (
            SELECT geoid, e as pop65pl1 FROM demographic
            WHERE dataset = 'Y2011-2015' AND variable = 'Pop65pl1' AND geotype = 'NTA2010'
          ) pop65pl1 on a.ntacode = pop65pl1.geoid

          LEFT JOIN (
            SELECT geoid, e as ea_bchdh FROM social
            WHERE dataset = 'Y2011-2015' AND variable = 'EA_BchDH' AND geotype = 'NTA2010'
          ) ea_bchdh on a.ntacode = ea_bchdh.geoid

          LEFT JOIN (
            SELECT geoid, p as ea_bchdh_p FROM social
            WHERE dataset = 'Y2011-2015' AND variable = 'EA_BchDH' AND geotype = 'NTA2010'
          ) ea_bchdh_p on a.ntacode = ea_bchdh_p.geoid

          LEFT JOIN (
            SELECT geoid, p as fb1_p FROM social
            WHERE dataset = 'Y2011-2015' AND variable = 'Fb1' AND geotype = 'NTA2010'
          ) fb1_p on a.ntacode = fb1_p.geoid

          LEFT JOIN (
            SELECT geoid, e as lgoenlep FROM social
            WHERE dataset = 'Y2011-2015' AND variable = 'LgOEnLEP1' AND geotype = 'NTA2010'
          ) lgoenlep on a.ntacode = lgoenlep.geoid

          LEFT JOIN (
            SELECT geoid, e as pbwpv FROM economic
            WHERE dataset = 'Y2011-2015' AND variable = 'PBwPv' AND geotype = 'NTA2010'
          ) pbwpv on a.ntacode = pbwpv.geoid

          LEFT JOIN (
            SELECT geoid, p as pbwpv_p FROM economic
            WHERE dataset = 'Y2011-2015' AND variable = 'PBwPv' AND geotype = 'NTA2010'
          ) pbwpv_p on a.ntacode = pbwpv_p.geoid

          LEFT JOIN (
            SELECT geoid, e as mdgr FROM housing
            WHERE dataset = 'Y2011-2015' AND variable = 'MdGR' AND geotype = 'NTA2010'
          ) mdgr on a.ntacode = mdgr.geoid

        WHERE ntaname NOT ILIKE 'park-cemetery-etc%'
          AND ntaname != 'Airport'
      `,
    },
  ],
};
