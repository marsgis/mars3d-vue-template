'use strict';

var pointInPolygon = require('@turf/boolean-point-in-polygon');
var helpers = require('@turf/helpers');
var meta = require('@turf/meta');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var pointInPolygon__default = /*#__PURE__*/_interopDefaultLegacy(pointInPolygon);

/**
 * Finds {@link Points} or {@link MultiPoint} coordinate positions that fall within {@link (Multi)Polygon(s)}.
 *
 * @name pointsWithinPolygon
 * @param {Feature|FeatureCollection<Point|MultiPoint>} points Point(s) or MultiPoint(s) as input search
 * @param {FeatureCollection|Geometry|Feature<Polygon|MultiPolygon>} polygons (Multi)Polygon(s) to check if points are within
 * @returns {FeatureCollection<Point|MultiPoint>} Point(s) or MultiPoint(s) with positions that land within at least one polygon.  The geometry type will match what was passsed in
 * @example
 * var points = turf.points([
 *     [-46.6318, -23.5523],
 *     [-46.6246, -23.5325],
 *     [-46.6062, -23.5513],
 *     [-46.663, -23.554],
 *     [-46.643, -23.557]
 * ]);
 *
 * var searchWithin = turf.polygon([[
 *     [-46.653,-23.543],
 *     [-46.634,-23.5346],
 *     [-46.613,-23.543],
 *     [-46.614,-23.559],
 *     [-46.631,-23.567],
 *     [-46.653,-23.560],
 *     [-46.653,-23.543]
 * ]]);
 *
 * var ptsWithin = turf.pointsWithinPolygon(points, searchWithin);
 *
 * //addToMap
 * var addToMap = [points, searchWithin, ptsWithin]
 * turf.featureEach(ptsWithin, function (currentFeature) {
 *   currentFeature.properties['marker-size'] = 'large';
 *   currentFeature.properties['marker-color'] = '#000';
 * });
 */
function pointsWithinPolygon(points, polygons) {
  var results = [];
  meta.featureEach(points, function (point) {
    var contained = false;
    if (point.geometry.type === "Point") {
      meta.geomEach(polygons, function (polygon) {
        if (pointInPolygon__default['default'](point, polygon)) contained = true;
      });
      if (contained) {
        results.push(point);
      }
    } else if (point.geometry.type === "MultiPoint") {
      var pointsWithin = [];
      meta.geomEach(polygons, function (polygon) {
        meta.coordEach(point, function (pointCoord) {
          if (pointInPolygon__default['default'](pointCoord, polygon)) {
            contained = true;
            pointsWithin.push(pointCoord);
          }
        });
      });
      if (contained) {
        results.push(helpers.multiPoint(pointsWithin));
      }
    } else {
      throw new Error("Input geometry must be a Point or MultiPoint");
    }
  });
  return helpers.featureCollection(results);
}

module.exports = pointsWithinPolygon;
module.exports.default = pointsWithinPolygon;
