"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var boolean_point_in_polygon_1 = __importDefault(require("@turf/boolean-point-in-polygon"));
var helpers_1 = require("@turf/helpers");
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sign#Polyfill
function mathSign(x) {
    return ((x > 0) - (x < 0) || +x);
}
/**
 * Returns the direction of the point q relative to the vector p1 -> p2.
 *
 * Implementation of geos::algorithm::CGAlgorithm::orientationIndex()
 * (same as geos::algorithm::CGAlgorithm::computeOrientation())
 *
 * @param {number[]} p1 - the origin point of the vector
 * @param {number[]} p2 - the final point of the vector
 * @param {number[]} q - the point to compute the direction to
 *
 * @returns {number} - 1 if q is ccw (left) from p1->p2,
 *    -1 if q is cw (right) from p1->p2,
 *     0 if q is colinear with p1->p2
 */
function orientationIndex(p1, p2, q) {
    var dx1 = p2[0] - p1[0], dy1 = p2[1] - p1[1], dx2 = q[0] - p2[0], dy2 = q[1] - p2[1];
    return mathSign(dx1 * dy2 - dx2 * dy1);
}
exports.orientationIndex = orientationIndex;
/**
 * Checks if two envelopes are equal.
 *
 * The function assumes that the arguments are envelopes, i.e.: Rectangular polygon
 *
 * @param {Feature<Polygon>} env1 - Envelope
 * @param {Feature<Polygon>} env2 - Envelope
 * @returns {boolean} - True if the envelopes are equal
 */
function envelopeIsEqual(env1, env2) {
    var envX1 = env1.geometry.coordinates[0].map(function (c) { return c[0]; }), envY1 = env1.geometry.coordinates[0].map(function (c) { return c[1]; }), envX2 = env2.geometry.coordinates[0].map(function (c) { return c[0]; }), envY2 = env2.geometry.coordinates[0].map(function (c) { return c[1]; });
    return (Math.max.apply(null, envX1) === Math.max.apply(null, envX2) &&
        Math.max.apply(null, envY1) === Math.max.apply(null, envY2) &&
        Math.min.apply(null, envX1) === Math.min.apply(null, envX2) &&
        Math.min.apply(null, envY1) === Math.min.apply(null, envY2));
}
exports.envelopeIsEqual = envelopeIsEqual;
/**
 * Check if a envelope is contained in other one.
 *
 * The function assumes that the arguments are envelopes, i.e.: Convex polygon
 * XXX: Envelopes are rectangular, checking if a point is inside a rectangule is something easy,
 * this could be further improved.
 *
 * @param {Feature<Polygon>} self - Envelope
 * @param {Feature<Polygon>} env - Envelope
 * @returns {boolean} - True if env is contained in self
 */
function envelopeContains(self, env) {
    return env.geometry.coordinates[0].every(function (c) {
        return boolean_point_in_polygon_1.default(helpers_1.point(c), self);
    });
}
exports.envelopeContains = envelopeContains;
/**
 * Checks if two coordinates are equal.
 *
 * @param {number[]} coord1 - First coordinate
 * @param {number[]} coord2 - Second coordinate
 * @returns {boolean} - True if coordinates are equal
 */
function coordinatesEqual(coord1, coord2) {
    return coord1[0] === coord2[0] && coord1[1] === coord2[1];
}
exports.coordinatesEqual = coordinatesEqual;
