'use strict';

var centroid = require('@turf/centroid');
var rhumbBearing = require('@turf/rhumb-bearing');
var rhumbDistance = require('@turf/rhumb-distance');
var rhumbDestination = require('@turf/rhumb-destination');
var clone = require('@turf/clone');
var meta = require('@turf/meta');
var invariant = require('@turf/invariant');
var helpers = require('@turf/helpers');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var centroid__default = /*#__PURE__*/_interopDefaultLegacy(centroid);
var rhumbBearing__default = /*#__PURE__*/_interopDefaultLegacy(rhumbBearing);
var rhumbDistance__default = /*#__PURE__*/_interopDefaultLegacy(rhumbDistance);
var rhumbDestination__default = /*#__PURE__*/_interopDefaultLegacy(rhumbDestination);
var clone__default = /*#__PURE__*/_interopDefaultLegacy(clone);

/**
 * Rotates any geojson Feature or Geometry of a specified angle, around its `centroid` or a given `pivot` point.
 *
 * @name transformRotate
 * @param {GeoJSON} geojson object to be rotated
 * @param {number} angle of rotation in decimal degrees, positive clockwise
 * @param {Object} [options={}] Optional parameters
 * @param {Coord} [options.pivot='centroid'] point around which the rotation will be performed
 * @param {boolean} [options.mutate=false] allows GeoJSON input to be mutated (significant performance increase if true)
 * @returns {GeoJSON} the rotated GeoJSON feature
 * @example
 * var poly = turf.polygon([[[0,29],[3.5,29],[2.5,32],[0,29]]]);
 * var options = {pivot: [0, 25]};
 * var rotatedPoly = turf.transformRotate(poly, 10, options);
 *
 * //addToMap
 * var addToMap = [poly, rotatedPoly];
 * rotatedPoly.properties = {stroke: '#F00', 'stroke-width': 4};
 */
function transformRotate(geojson, angle, options) {
  // Optional parameters
  options = options || {};
  if (!helpers.isObject(options)) throw new Error("options is invalid");
  var pivot = options.pivot;
  var mutate = options.mutate;

  // Input validation
  if (!geojson) throw new Error("geojson is required");
  if (angle === undefined || angle === null || isNaN(angle))
    throw new Error("angle is required");

  // Shortcut no-rotation
  if (angle === 0) return geojson;

  // Use centroid of GeoJSON if pivot is not provided
  if (!pivot) pivot = centroid__default['default'](geojson);

  // Clone geojson to avoid side effects
  if (mutate === false || mutate === undefined) geojson = clone__default['default'](geojson);

  // Rotate each coordinate
  meta.coordEach(geojson, function (pointCoords) {
    var initialAngle = rhumbBearing__default['default'](pivot, pointCoords);
    var finalAngle = initialAngle + angle;
    var distance = rhumbDistance__default['default'](pivot, pointCoords);
    var newCoords = invariant.getCoords(rhumbDestination__default['default'](pivot, distance, finalAngle));
    pointCoords[0] = newCoords[0];
    pointCoords[1] = newCoords[1];
  });
  return geojson;
}

module.exports = transformRotate;
module.exports.default = transformRotate;
