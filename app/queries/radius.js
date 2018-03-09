import summaryLevels from '../queries/summary-levels';

const Radius = (summaryLevel, geometry, radius) => {
  const sqlBase = summaryLevels[summaryLevel](false);
  const [lng, lat] = geometry.coordinates;
  return `
    SELECT *
    FROM (${sqlBase}) base
    WHERE ST_Dwithin(
      base.the_geom::geography,
      ST_SetSRID(ST_GeomFromText('POINT(${lng} ${lat})'), 4326)::geography,
      ${radius}
    )
  `;
};

export default Radius;
