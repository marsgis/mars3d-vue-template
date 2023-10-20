"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var polygon_clipping_1 = __importDefault(require("polygon-clipping"));
var invariant_1 = require("@turf/invariant");
var helpers_1 = require("@turf/helpers");
/**
 * Takes two {@link (Multi)Polygon(s)} and returns a combined polygon. If the input polygons are not contiguous, this function returns a {@link MultiPolygon} feature.
 *
 * @name union
 * @param {Feature<Polygon|MultiPolygon>} polygon1 input Polygon feature
 * @param {Feature<Polygon|MultiPolygon>} polygon2 Polygon feature to difference from polygon1
 * @param {Object} [options={}] Optional Parameters
 * @param {Object} [options.properties={}] Translate Properties to output Feature
 * @returns {Feature<(Polygon|MultiPolygon)>} a combined {@link Polygon} or {@link MultiPolygon} feature, or null if the inputs are empty
 * @example
 * var poly1 = turf.polygon([[
 *     [-82.574787, 35.594087],
 *     [-82.574787, 35.615581],
 *     [-82.545261, 35.615581],
 *     [-82.545261, 35.594087],
 *     [-82.574787, 35.594087]
 * ]], {"fill": "#0f0"});
 * var poly2 = turf.polygon([[
 *     [-82.560024, 35.585153],
 *     [-82.560024, 35.602602],
 *     [-82.52964, 35.602602],
 *     [-82.52964, 35.585153],
 *     [-82.560024, 35.585153]
 * ]], {"fill": "#00f"});
 *
 * var union = turf.union(poly1, poly2);
 *
 * //addToMap
 * var addToMap = [poly1, poly2, union];
 */
function union(poly1, poly2, options) {
    if (options === void 0) { options = {}; }
    var geom1 = invariant_1.getGeom(poly1);
    var geom2 = invariant_1.getGeom(poly2);
    var unioned = polygon_clipping_1.default.union(geom1.coordinates, geom2.coordinates);
    if (unioned.length === 0)
        return null;
    if (unioned.length === 1)
        return helpers_1.polygon(unioned[0], options.properties);
    else
        return helpers_1.multiPolygon(unioned, options.properties);
}
exports.default = union;
