"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var boolean_disjoint_1 = __importDefault(require("@turf/boolean-disjoint"));
var meta_1 = require("@turf/meta");
/**
 * Boolean-intersects returns (TRUE) two geometries intersect.
 *
 * @name booleanIntersects
 * @param {Geometry|Feature<any>} feature1 GeoJSON Feature or Geometry
 * @param {Geometry|Feature<any>} feature2 GeoJSON Feature or Geometry
 * @returns {boolean} true/false
 * @example
 * var point = turf.point([2, 2]);
 * var line = turf.lineString([[1, 1], [1, 2], [1, 3], [1, 4]]);
 *
 * turf.booleanIntersects(line, point);
 * //=true
 */
function booleanIntersects(feature1, feature2) {
    var bool = false;
    meta_1.flattenEach(feature1, function (flatten1) {
        meta_1.flattenEach(feature2, function (flatten2) {
            if (bool === true) {
                return true;
            }
            bool = !boolean_disjoint_1.default(flatten1.geometry, flatten2.geometry);
        });
    });
    return bool;
}
exports.default = booleanIntersects;
