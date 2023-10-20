"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var meta_1 = require("@turf/meta");
var helpers_1 = require("@turf/helpers");
/**
 * Takes a {@link Feature} or {@link FeatureCollection} and returns the mean center. Can be weighted.
 *
 * @name centerMean
 * @param {GeoJSON} geojson GeoJSON to be centered
 * @param {Object} [options={}] Optional parameters
 * @param {Object} [options.properties={}] Translate GeoJSON Properties to Point
 * @param {Object} [options.bbox={}] Translate GeoJSON BBox to Point
 * @param {Object} [options.id={}] Translate GeoJSON Id to Point
 * @param {string} [options.weight] the property name used to weight the center
 * @returns {Feature<Point>} a Point feature at the mean center point of all input features
 * @example
 * var features = turf.featureCollection([
 *   turf.point([-97.522259, 35.4691], {value: 10}),
 *   turf.point([-97.502754, 35.463455], {value: 3}),
 *   turf.point([-97.508269, 35.463245], {value: 5})
 * ]);
 *
 * var options = {weight: "value"}
 * var mean = turf.centerMean(features, options);
 *
 * //addToMap
 * var addToMap = [features, mean]
 * mean.properties['marker-size'] = 'large';
 * mean.properties['marker-color'] = '#000';
 */
function centerMean(geojson, // To-Do include Typescript AllGeoJSON
options) {
    if (options === void 0) { options = {}; }
    var sumXs = 0;
    var sumYs = 0;
    var sumNs = 0;
    meta_1.geomEach(geojson, function (geom, featureIndex, properties) {
        var weight = options.weight ? properties === null || properties === void 0 ? void 0 : properties[options.weight] : undefined;
        weight = weight === undefined || weight === null ? 1 : weight;
        if (!helpers_1.isNumber(weight))
            throw new Error("weight value must be a number for feature index " + featureIndex);
        weight = Number(weight);
        if (weight > 0) {
            meta_1.coordEach(geom, function (coord) {
                sumXs += coord[0] * weight;
                sumYs += coord[1] * weight;
                sumNs += weight;
            });
        }
    });
    return helpers_1.point([sumXs / sumNs, sumYs / sumNs], options.properties, options);
}
exports.default = centerMean;
