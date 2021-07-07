export const OPTIONS_QUERY = `
  (
    SELECT geoid, geotype, geogname AS label, 'City %26 Boroughs' AS typelabel
    FROM support_geoids
    WHERE geotype IN ('Boro2010', 'City2010')
    ORDER BY CASE
      WHEN geogname = 'New York City' THEN '1'
      WHEN geogname = 'Bronx' THEN '2'
      WHEN geogname = 'Brooklyn' THEN '3'
      WHEN geogname = 'Manhattan' THEN '4'
      WHEN geogname = 'Queens' THEN '5'
      WHEN geogname = 'Staten Island' THEN '6'
      ELSE geogname END ASC
  )

  UNION ALL

  (
    SELECT
      geoid, geotype, geogname || ' (' || geoid || ')' AS label,
      'Neighborhood Tabulation Areas (NTAs)' AS typelabel
    FROM support_geoids
    WHERE geotype IN ('NTA2010')
    AND geogname NOT ILIKE 'park-cemetery-etc%25'
    ORDER BY geogname ASC
  )

  UNION ALL

  (
    SELECT geoid, geotype, neighborhoods || ' - ' || geoid || ' (approx. ' || puma_roughcd_equiv || ')' as label, 'PUMAS (approximations of Community Districts)' AS typelabel
    FROM (
      SELECT a.*, b.neighborhoods, b.puma_roughcd_equiv FROM support_geoids a
      LEFT OUTER JOIN nyc_puma b ON (a.geoid = b.puma::text)
      WHERE geotype IN ('PUMA2010')
    ) x
    ORDER BY geoid ASC
  )
`;

export default OPTIONS_QUERY;