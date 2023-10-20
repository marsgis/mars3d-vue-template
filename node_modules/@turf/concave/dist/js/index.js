"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var distance_1 = __importDefault(require("@turf/distance"));
var helpers_1 = require("@turf/helpers");
var meta_1 = require("@turf/meta");
var tin_1 = __importDefault(require("@turf/tin"));
var turf_dissolve_1 = __importDefault(require("./lib/turf-dissolve"));
/**
 * Takes a set of {@link Point|points} and returns a concave hull Polygon or MultiPolygon.
 * Internally, this uses [turf-tin](https://github.com/Turfjs/turf-tin) to generate geometries.
 *
 * @name concave
 * @param {FeatureCollection<Point>} points input points
 * @param {Object} [options={}] Optional parameters
 * @param {number} [options.maxEdge=Infinity] the length (in 'units') of an edge necessary for part of the
 * hull to become concave.
 * @param {string} [options.units='kilometers'] can be degrees, radians, miles, or kilometers
 * @returns {Feature<(Polygon|MultiPolygon)>|null} a concave hull (null value is returned if unable to compute hull)
 * @example
 * var points = turf.featureCollection([
 *   turf.point([-63.601226, 44.642643]),
 *   turf.point([-63.591442, 44.651436]),
 *   turf.point([-63.580799, 44.648749]),
 *   turf.point([-63.573589, 44.641788]),
 *   turf.point([-63.587665, 44.64533]),
 *   turf.point([-63.595218, 44.64765])
 * ]);
 * var options = {units: 'miles', maxEdge: 1};
 *
 * var hull = turf.concave(points, options);
 *
 * //addToMap
 * var addToMap = [points, hull]
 */
function concave(points, options) {
    if (options === void 0) { options = {}; }
    var maxEdge = options.maxEdge || Infinity;
    var cleaned = removeDuplicates(points);
    var tinPolys = tin_1.default(cleaned);
    // calculate length of all edges and area of all triangles
    // and remove triangles that fail the max length test
    tinPolys.features = tinPolys.features.filter(function (triangle) {
        var pt1 = triangle.geometry.coordinates[0][0];
        var pt2 = triangle.geometry.coordinates[0][1];
        var pt3 = triangle.geometry.coordinates[0][2];
        var dist1 = distance_1.default(pt1, pt2, options);
        var dist2 = distance_1.default(pt2, pt3, options);
        var dist3 = distance_1.default(pt1, pt3, options);
        return dist1 <= maxEdge && dist2 <= maxEdge && dist3 <= maxEdge;
    });
    if (tinPolys.features.length < 1) {
        return null;
    }
    // merge the adjacent triangles
    var dissolved = turf_dissolve_1.default(tinPolys);
    // geojson-dissolve always returns a MultiPolygon
    if (dissolved.coordinates.length === 1) {
        dissolved.coordinates = dissolved.coordinates[0];
        dissolved.type = "Polygon";
    }
    return helpers_1.feature(dissolved);
}
/**
 * Removes duplicated points in a collection returning a new collection
 *
 * @private
 * @param {FeatureCollection<Point>} points to be cleaned
 * @returns {FeatureCollection<Point>} cleaned set of points
 */
function removeDuplicates(points) {
    var cleaned = [];
    var existing = {};
    meta_1.featureEach(points, function (pt) {
        if (!pt.geometry) {
            return;
        }
        var key = pt.geometry.coordinates.join("-");
        if (!Object.prototype.hasOwnProperty.call(existing, key)) {
            cleaned.push(pt);
            existing[key] = true;
        }
    });
    return helpers_1.featureCollection(cleaned);
}
exports.default = concave;
