// ACS profile query for single geoid, no agg fucntions

const singleGeometryProfile = function(geoid, comparator, profile = 'demographic') {
  return `
    WITH
      filtered_selection AS (
        SELECT *
        FROM ${profile}
        INNER JOIN support_fact_finder_meta_1
          ON support_fact_finder_meta_1.variablename = variable
        WHERE geoid = '${geoid}'
      ),
      comparison_selection AS (
        SELECT e as comparison_sum,
          (((m / 1.645) / NULLIF(e,0)) * 100) AS comparison_cv,
          variable as comparison_variable,
          dataset as comparison_dataset,
          ROUND(p::numeric, 4) / 100 as comparison_percent,
          ROUND(z::numeric, 4) / 100 as comparison_percent_m,
          m as comparison_m
        FROM ${profile}
        INNER JOIN support_fact_finder_meta_1
          ON support_fact_finder_meta_1.variablename = variable
        WHERE geoid = '${comparator}'
      )
    SELECT *,
      e as sum,
      (((m / 1.645) / NULLIF(e,0)) * 100) AS cv,
      ROUND(z::numeric, 4) / 100 as percent_m,
      CASE WHEN ABS(SQRT(POWER(m / 1.645, 2) %2B POWER(comparison_m / 1.645, 2)) * 1.645) > ABS(comparison_sum - e) THEN false ELSE true END AS significant,
      CASE WHEN ABS(SQRT(POWER((ROUND(z::numeric, 4) / 100) / 1.645, 2) %2B POWER(comparison_percent_m / 1.645, 2)) * 1.645) > ABS(comparison_percent - p) THEN false ELSE true END AS percent_significant,
      regexp_replace(lower(dataset), '[^A-Za-z0-9]', '_', 'g') AS dataset,
      regexp_replace(lower(profile), '[^A-Za-z0-9]', '_', 'g') AS profile,
      regexp_replace(lower(category), '[^A-Za-z0-9]', '_', 'g') AS category,
      regexp_replace(lower(variable), '[^A-Za-z0-9]', '_', 'g') AS variable,
      ENCODE(CONVERT_TO(VARIABLE || dataset, 'UTF-8'), 'base64') As id,
      ROUND(p::numeric, 4) / 100 as percent
    FROM
      filtered_selection
    LEFT OUTER JOIN comparison_selection
      ON filtered_selection.variable = comparison_selection.comparison_variable
      AND filtered_selection.dataset = comparison_selection.comparison_dataset
  `;
};

export default singleGeometryProfile;
