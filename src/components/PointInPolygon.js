const turf = require("turf");

const turfBool = require("@turf/turf");

export const PointInPolygon = (point, polygon) => {
  let pt = turf.point(point);
  let Polygon = turf.polygon(polygon);

  let result = turfBool.booleanPointInPolygon(pt, Polygon);

  return result;
};
