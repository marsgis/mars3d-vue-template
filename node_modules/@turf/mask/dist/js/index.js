'use strict';

var helpers = require('@turf/helpers');
var polygonClipping = require('polygon-clipping');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var polygonClipping__default = /*#__PURE__*/_interopDefaultLegacy(polygonClipping);

/**
 * Takes any type of {@link Polygon|polygon} and an optional mask and returns a {@link Polygon|polygon} exterior ring with holes.
 *
 * @name mask
 * @param {FeatureCollection|Feature<Polygon|MultiPolygon>} polygon GeoJSON Polygon used as interior rings or holes.
 * @param {Feature<Polygon>} [mask] GeoJSON Polygon used as the exterior ring (if undefined, the world extent is used)
 * @returns {Feature<Polygon>} Masked Polygon (exterior ring with holes).
 * @example
 * var polygon = turf.polygon([[[112, -21], [116, -36], [146, -39], [153, -24], [133, -10], [112, -21]]]);
 * var mask = turf.polygon([[[90, -55], [170, -55], [170, 10], [90, 10], [90, -55]]]);
 *
 * var masked = turf.mask(polygon, mask);
 *
 * //addToMap
 * var addToMap = [masked]
 */
function mask(polygon, mask) {
  // Define mask
  var maskPolygon = createMask(mask);

  var polygonOuters = null;
  if (polygon.type === "FeatureCollection") polygonOuters = unionFc(polygon);
  else
    polygonOuters = createGeomFromPolygonClippingOutput(
      polygonClipping__default['default'].union(polygon.geometry.coordinates)
    );

  polygonOuters.geometry.coordinates.forEach(function (contour) {
    maskPolygon.geometry.coordinates.push(contour[0]);
  });

  return maskPolygon;
}

function unionFc(fc) {
  var unioned =
    fc.features.length === 2
      ? polygonClipping__default['default'].union(
          fc.features[0].geometry.coordinates,
          fc.features[1].geometry.coordinates
        )
      : polygonClipping__default['default'].union.apply(
          polygonClipping__default['default'],
          fc.features.map(function (f) {
            return f.geometry.coordinates;
          })
        );
  return createGeomFromPolygonClippingOutput(unioned);
}

function createGeomFromPolygonClippingOutput(unioned) {
  return helpers.multiPolygon(unioned);
}

/**
 * Create Mask Coordinates
 *
 * @private
 * @param {Feature<Polygon>} [mask] default to world if undefined
 * @returns {Feature<Polygon>} mask coordinate
 */
function createMask(mask) {
  var world = [
    [
      [180, 90],
      [-180, 90],
      [-180, -90],
      [180, -90],
      [180, 90],
    ],
  ];
  var coordinates = (mask && mask.geometry.coordinates) || world;
  return helpers.polygon(coordinates);
}

module.exports = mask;
module.exports.default = mask;
