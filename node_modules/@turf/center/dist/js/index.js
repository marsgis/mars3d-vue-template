"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bbox_1 = __importDefault(require("@turf/bbox"));
var helpers_1 = require("@turf/helpers");
/**
 * Takes a {@link Feature} or {@link FeatureCollection} and returns the absolute center point of all features.
 *
 * @name center
 * @param {GeoJSON} geojson GeoJSON to be centered
 * @param {Object} [options={}] Optional parameters
 * @param {Object} [options.properties={}] Translate GeoJSON Properties to Point
 * @param {Object} [options.bbox={}] Translate GeoJSON BBox to Point
 * @param {Object} [options.id={}] Translate GeoJSON Id to Point
 * @returns {Feature<Point>} a Point feature at the absolute center point of all input features
 * @example
 * var features = turf.points([
 *   [-97.522259, 35.4691],
 *   [-97.502754, 35.463455],
 *   [-97.508269, 35.463245]
 * ]);
 *
 * var center = turf.center(features);
 *
 * //addToMap
 * var addToMap = [features, center]
 * center.properties['marker-size'] = 'large';
 * center.properties['marker-color'] = '#000';
 */
function center(geojson, options) {
    if (options === void 0) { options = {}; }
    var ext = bbox_1.default(geojson);
    var x = (ext[0] + ext[2]) / 2;
    var y = (ext[1] + ext[3]) / 2;
    return helpers_1.point([x, y], options.properties, options);
}
exports.default = center;
