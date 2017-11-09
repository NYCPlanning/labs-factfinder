const preserveType = function(array) {
  return `'${array.join("','")}'`;
};

const generateReportSQL = function(geoids, comparator) {
  const ids = preserveType(geoids);

  return `
    WITH
      filtered_selection AS (
        SELECT *
        FROM support_fact_finder
        WHERE geoid IN (${ids})
      ),

      base_numbers AS (
        SELECT
          sum(e) AS base_sum,
          sqrt(sum(power(m, 2))) AS base_m,
          max(base) AS base_join,
          max(YEAR) AS base_year
        FROM (
          SELECT *
          FROM filtered_selection
          INNER JOIN support_fact_finder_meta_update
            ON support_fact_finder_meta_update.variablename = filtered_selection.variable
        ) window_sum
        WHERE base = VARIABLE
        GROUP BY VARIABLE, "year"
      ),

      comparison_selection AS (
        SELECT *
        FROM support_fact_finder
        WHERE geoid IN ('${comparator}')
      ),

      comparison_base_numbers AS (
        SELECT
          sum(e) AS comparison_base_sum,
          sqrt(sum(power(m, 2))) AS comparison_base_m,
          max(base) AS comparison_base_join,
          max(YEAR) AS comparison_base_year
        FROM (
          SELECT *
          FROM comparison_selection
          INNER JOIN support_fact_finder_meta_update
            ON support_fact_finder_meta_update.variablename = comparison_selection.variable
        ) window_sum
        WHERE base = VARIABLE
        GROUP BY VARIABLE, "year"
      )

    SELECT
       *,
      (((m / 1.645) / SUM) * 100) AS cv,
      (((comparison_m / 1.645) / comparison_sum) * 100) AS comparison_cv,
      regexp_replace(lower(YEAR), '[^A-Za-z0-9]', '_', 'g') AS YEAR,
      regexp_replace(lower(PROFILE), '[^A-Za-z0-9]', '_', 'g') AS PROFILE,
      regexp_replace(lower(category), '[^A-Za-z0-9]', '_', 'g') AS category,
      regexp_replace(lower(VARIABLE), '[^A-Za-z0-9]', '_', 'g') AS VARIABLE,
      ROUND((SUM / base_sum)::numeric, 4) as percent,
      (1 / base_sum) * SQRT(POWER(m, 2) %2B ABS(POWER(sum / base_sum, 2) * POWER(base_m, 2))) as percent_m,
      ROUND((comparison_sum / comparison_base_sum)::numeric, 4) as comparison_percent,
      (1 / comparison_base_sum) * SQRT(POWER(comparison_m, 2) %2B ABS(POWER(comparison_sum / comparison_base_sum, 2) * POWER(comparison_base_m, 2))) as comparison_percent_m,
      CASE
        WHEN ABS(
          SQRT(
            POWER(m / 1.645, 2) %2B POWER(comparison_m / 1.645, 2)
          ) * 1.645
        ) > ABS(comparison_sum - sum)
        THEN false
        ELSE true
      END AS significant
    FROM (
      SELECT
        sum(e) filter (WHERE geoid IN (${ids})) AS sum,
        sqrt(sum(power(m, 2)) filter (WHERE geoid IN (${ids}))) AS m,
        sum(e) filter (WHERE geoid IN ('${comparator}')) AS comparison_sum,
        sqrt(sum(power(m, 2)) filter (WHERE geoid IN ('${comparator}') )) AS comparison_m,
        YEAR,
        VARIABLE
       FROM support_fact_finder
       GROUP BY VARIABLE, YEAR
       ORDER BY VARIABLE DESC
    ) aggregated
    INNER JOIN support_fact_finder_meta_update
      ON support_fact_finder_meta_update.variablename = aggregated.variable
    LEFT OUTER JOIN base_numbers
      ON base = base_numbers.base_join
      AND YEAR = base_numbers.base_year
    LEFT OUTER JOIN comparison_base_numbers
      ON base = comparison_base_numbers.comparison_base_join
      AND YEAR = comparison_base_numbers.comparison_base_year
  `;
};

export { preserveType };

export default generateReportSQL;
