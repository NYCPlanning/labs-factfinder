const preserveType = function(array) {
  return `'${array.join("','")}'`;
};

const singleGeometry = function(geoid, comparator, profile = 'demographic') {
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
          variable as comparison_variable,
          dataset as comparison_dataset,
          p as comparison_percent,
          z as comparison_percent_m,
          m as comparison_m
        FROM ${profile}
        INNER JOIN support_fact_finder_meta_1
          ON support_fact_finder_meta_1.variablename = variable
        WHERE geoid = '${comparator}'
      )
    SELECT *,
      e as sum,
      c as cv,
      z as percent_m,
      regexp_replace(lower(dataset), '[^A-Za-z0-9]', '_', 'g') AS dataset,
      regexp_replace(lower(profile), '[^A-Za-z0-9]', '_', 'g') AS profile,
      regexp_replace(lower(category), '[^A-Za-z0-9]', '_', 'g') AS category,
      regexp_replace(lower(variable), '[^A-Za-z0-9]', '_', 'g') AS variable,
      ROUND(p::numeric, 4) / 100 as percent
    FROM
      filtered_selection
    LEFT OUTER JOIN comparison_selection
      ON filtered_selection.variable = comparison_selection.comparison_variable
      AND filtered_selection.dataset = comparison_selection.comparison_dataset
  `;
};

const generateProfileSQL = function(geoids, comparator, profile = 'demographic') {
  const ids = preserveType(geoids);
  const [firstGeoid] = geoids;
  const { length: count } = geoids;

  if (count === 1) {
    return singleGeometry(firstGeoid, comparator, profile);
  }

  return `
    WITH
      filtered_selection AS (
        SELECT *
        FROM ${profile}
        WHERE geoid IN (${ids})
      ),

      base_numbers AS (
        SELECT
          sum(e) AS base_sum,
          sqrt(sum(power(m, 2))) AS base_m,
          max(base) AS base_join,
          max(DATASET) AS base_year
        FROM (
          SELECT *
          FROM filtered_selection
          INNER JOIN support_fact_finder_meta_1
            ON support_fact_finder_meta_1.variablename = filtered_selection.variable
        ) window_sum
        WHERE base = VARIABLE
        GROUP BY VARIABLE, "dataset"
      ),

      comparison_selection AS (
        SELECT *
        FROM ${profile}
        WHERE geoid IN ('${comparator}')
      ),

      comparison_base_numbers AS (
        SELECT
          sum(e) AS comparison_base_sum,
          sqrt(sum(power(m, 2))) AS comparison_base_m,
          max(base) AS comparison_base_join,
          max(DATASET) AS comparison_base_year
        FROM (
          SELECT *
          FROM comparison_selection
          INNER JOIN support_fact_finder_meta_1
            ON support_fact_finder_meta_1.variablename = comparison_selection.variable
        ) window_sum
        WHERE base = VARIABLE
        GROUP BY VARIABLE, "dataset"
      )
    SELECT
      *,
      CASE WHEN ABS(SQRT(POWER(m / 1.645, 2) %2B POWER(comparison_m / 1.645, 2)) * 1.645) > ABS(comparison_sum - sum) THEN false ELSE true END AS significant,
      CASE WHEN ABS(SQRT(POWER(percent_m / 1.645, 2) %2B POWER(comparison_percent_m / 1.645, 2)) * 1.645) > ABS(comparison_percent - percent) THEN false ELSE true END AS percent_significant
    FROM (
      SELECT
         *,
        (((m / 1.645) / SUM) * 100) AS cv,
        (((comparison_m / 1.645) / comparison_sum) * 100) AS comparison_cv,
        regexp_replace(lower(DATASET), '[^A-Za-z0-9]', '_', 'g') AS DATASET,
        regexp_replace(lower(PROFILE), '[^A-Za-z0-9]', '_', 'g') AS PROFILE,
        regexp_replace(lower(category), '[^A-Za-z0-9]', '_', 'g') AS category,
        regexp_replace(lower(VARIABLE), '[^A-Za-z0-9]', '_', 'g') AS VARIABLE,
        ROUND((SUM / NULLIF(base_sum,0))::numeric, 4) as percent,
        (1 / NULLIF(base_sum,0)) * SQRT(POWER(m, 2) %2B ABS(POWER(sum / NULLIF(base_sum,0), 2) * POWER(base_m, 2))) as percent_m,
        ROUND((comparison_sum / NULLIF(comparison_base_sum,0))::numeric, 4) as comparison_percent,
        (1 / NULLIF(comparison_base_sum,0)) * SQRT(POWER(comparison_m, 2) %2B ABS(POWER(comparison_sum / NULLIF(comparison_base_sum,0), 2) * POWER(comparison_base_m, 2))) as comparison_percent_m
      FROM (
        SELECT
          sum(e) filter (WHERE geoid IN (${ids})) AS sum,
          sqrt(sum(power(m, 2)) filter (WHERE geoid IN (${ids}))) AS m,
          sum(e) filter (WHERE geoid IN ('${comparator}')) AS comparison_sum,
          sqrt(sum(power(m, 2)) filter (WHERE geoid IN ('${comparator}') )) AS comparison_m,
          DATASET,
          VARIABLE
         FROM ${profile}
         GROUP BY VARIABLE, DATASET
         ORDER BY VARIABLE DESC
      ) aggregated
      INNER JOIN support_fact_finder_meta_1
        ON support_fact_finder_meta_1.variablename = aggregated.variable
      LEFT OUTER JOIN base_numbers
        ON base = base_numbers.base_join
        AND DATASET = base_numbers.base_year
      LEFT OUTER JOIN comparison_base_numbers
        ON base = comparison_base_numbers.comparison_base_join
        AND DATASET = comparison_base_numbers.comparison_base_year
    ) x
  `;
};

export { preserveType };

export default generateProfileSQL;
