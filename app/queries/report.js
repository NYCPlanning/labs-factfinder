const preserveType = function(array) {
  return `'${array.join("','")}'`;
};

const generateReportSQL = function(geoids, comparator) {
  const ids = preserveType(geoids);

  return `
    WITH filtered_selection AS
      (SELECT *
       FROM support_fact_finder
       WHERE geoid IN (${ids}) ),
         base_numbers AS
      (SELECT *
       FROM
         (SELECT sum(e) AS base_sum,
                 max(base) AS base_join,
                 max(YEAR) AS base_year
          FROM
            (SELECT *
             FROM filtered_selection
             INNER JOIN support_fact_finder_meta_update ON support_fact_finder_meta_update.variablename = filtered_selection.variable) window_sum
          WHERE base = VARIABLE
          GROUP BY VARIABLE,
                   "year") percentage)
    SELECT *,
           (((m / 1.645) / SUM) * 100) AS cv,
           (((comparison_m / 1.645) / comparison_sum) * 100) AS comparison_cv,
           regexp_replace(lower(YEAR), '[^A-Za-z0-9]', '_', 'g') AS YEAR,
           regexp_replace(lower(PROFILE), '[^A-Za-z0-9]', '_', 'g') AS PROFILE,
           regexp_replace(lower(category), '[^A-Za-z0-9]', '_', 'g') AS category,
           regexp_replace(lower(VARIABLE), '[^A-Za-z0-9]', '_', 'g') AS VARIABLE
    FROM
      (SELECT sum(e) filter (
                             WHERE geoid IN (${ids})) AS SUM,
              sqrt(sum(power(m, 2)) filter (
                                            WHERE geoid IN (${ids}))) AS m,
              sum(e) filter (
                             WHERE geoid IN ('${comparator}')) AS comparison_sum,
              sqrt(sum(power(m, 2)) filter (
                                            WHERE geoid IN ('0') )) AS comparison_m,
              YEAR,
              VARIABLE
       FROM support_fact_finder
       GROUP BY VARIABLE,
                YEAR
       ORDER BY VARIABLE DESC) aggregated
    INNER JOIN support_fact_finder_meta_update ON support_fact_finder_meta_update.variablename = aggregated.variable
    LEFT OUTER JOIN base_numbers ON base = base_numbers.base_join
    AND YEAR = base_numbers.base_year
  `;
};

export { preserveType };

export default generateReportSQL;
