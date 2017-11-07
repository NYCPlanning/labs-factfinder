import summaryLevels from '../queries/summary-levels';

const Intersection = (summaryLevel, geometry) => {
  const sqlBase = summaryLevels[summaryLevel](false);
  return `${sqlBase} WHERE ST_Intersects(the_geom, ST_GeomFromGeoJSON('${JSON.stringify(geometry)}'))`;
};

export default Intersection;
