"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var geojson_equality_1 = __importDefault(require("geojson-equality"));
var clean_coords_1 = __importDefault(require("@turf/clean-coords"));
var invariant_1 = require("@turf/invariant");
/**
 * Determine whether two geometries of the same type have identical X,Y coordinate values.
 * See http://edndoc.esri.com/arcsde/9.0/general_topics/understand_spatial_relations.htm
 *
 * @name booleanEqual
 * @param {Geometry|Feature} feature1 GeoJSON input
 * @param {Geometry|Feature} feature2 GeoJSON input
 * @returns {boolean} true if the objects are equal, false otherwise
 * @example
 * var pt1 = turf.point([0, 0]);
 * var pt2 = turf.point([0, 0]);
 * var pt3 = turf.point([1, 1]);
 *
 * turf.booleanEqual(pt1, pt2);
 * //= true
 * turf.booleanEqual(pt2, pt3);
 * //= false
 */
function booleanEqual(feature1, feature2) {
    var type1 = invariant_1.getGeom(feature1).type;
    var type2 = invariant_1.getGeom(feature2).type;
    if (type1 !== type2)
        return false;
    var equality = new geojson_equality_1.default({ precision: 6 });
    return equality.compare(clean_coords_1.default(feature1), clean_coords_1.default(feature2));
}
exports.default = booleanEqual;
