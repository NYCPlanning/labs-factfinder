import summaryLevels from './summary-levels';

const Intersection = (summaryLevel, geometry) => {
  const sqlBase = summaryLevels[summaryLevel](false);
  return `SELECT * FROM (${sqlBase}) base WHERE ST_Intersects(the_geom, ST_GeomFromGeoJSON('${JSON.stringify(geometry)}'))`;
};

export default Intersection;
