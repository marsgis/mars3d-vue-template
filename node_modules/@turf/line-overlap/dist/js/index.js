"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var geojson_rbush_1 = __importDefault(require("geojson-rbush"));
var line_segment_1 = __importDefault(require("@turf/line-segment"));
var nearest_point_on_line_1 = __importDefault(require("@turf/nearest-point-on-line"));
var boolean_point_on_line_1 = __importDefault(require("@turf/boolean-point-on-line"));
var invariant_1 = require("@turf/invariant");
var meta_1 = require("@turf/meta");
var helpers_1 = require("@turf/helpers");
var deep_equal_1 = __importDefault(require("deep-equal"));
/**
 * Takes any LineString or Polygon and returns the overlapping lines between both features.
 *
 * @name lineOverlap
 * @param {Geometry|Feature<LineString|MultiLineString|Polygon|MultiPolygon>} line1 any LineString or Polygon
 * @param {Geometry|Feature<LineString|MultiLineString|Polygon|MultiPolygon>} line2 any LineString or Polygon
 * @param {Object} [options={}] Optional parameters
 * @param {number} [options.tolerance=0] Tolerance distance to match overlapping line segments (in kilometers)
 * @returns {FeatureCollection<LineString>} lines(s) that are overlapping between both features
 * @example
 * var line1 = turf.lineString([[115, -35], [125, -30], [135, -30], [145, -35]]);
 * var line2 = turf.lineString([[115, -25], [125, -30], [135, -30], [145, -25]]);
 *
 * var overlapping = turf.lineOverlap(line1, line2);
 *
 * //addToMap
 * var addToMap = [line1, line2, overlapping]
 */
function lineOverlap(line1, line2, options) {
    if (options === void 0) { options = {}; }
    // Optional parameters
    options = options || {};
    if (!helpers_1.isObject(options))
        throw new Error("options is invalid");
    var tolerance = options.tolerance || 0;
    // Containers
    var features = [];
    // Create Spatial Index
    var tree = geojson_rbush_1.default();
    // To-Do -- HACK way to support typescript
    var line = line_segment_1.default(line1);
    tree.load(line);
    var overlapSegment;
    // Line Intersection
    // Iterate over line segments
    meta_1.segmentEach(line2, function (segment) {
        var doesOverlaps = false;
        if (!segment) {
            return;
        }
        // Iterate over each segments which falls within the same bounds
        meta_1.featureEach(tree.search(segment), function (match) {
            if (doesOverlaps === false) {
                var coordsSegment = invariant_1.getCoords(segment).sort();
                var coordsMatch = invariant_1.getCoords(match).sort();
                // Segment overlaps feature
                if (deep_equal_1.default(coordsSegment, coordsMatch)) {
                    doesOverlaps = true;
                    // Overlaps already exists - only append last coordinate of segment
                    if (overlapSegment)
                        overlapSegment = concatSegment(overlapSegment, segment);
                    else
                        overlapSegment = segment;
                    // Match segments which don't share nodes (Issue #901)
                }
                else if (tolerance === 0
                    ? boolean_point_on_line_1.default(coordsSegment[0], match) &&
                        boolean_point_on_line_1.default(coordsSegment[1], match)
                    : nearest_point_on_line_1.default(match, coordsSegment[0]).properties.dist <=
                        tolerance &&
                        nearest_point_on_line_1.default(match, coordsSegment[1]).properties.dist <=
                            tolerance) {
                    doesOverlaps = true;
                    if (overlapSegment)
                        overlapSegment = concatSegment(overlapSegment, segment);
                    else
                        overlapSegment = segment;
                }
                else if (tolerance === 0
                    ? boolean_point_on_line_1.default(coordsMatch[0], segment) &&
                        boolean_point_on_line_1.default(coordsMatch[1], segment)
                    : nearest_point_on_line_1.default(segment, coordsMatch[0]).properties.dist <=
                        tolerance &&
                        nearest_point_on_line_1.default(segment, coordsMatch[1]).properties.dist <=
                            tolerance) {
                    // Do not define (doesOverlap = true) since more matches can occur within the same segment
                    // doesOverlaps = true;
                    if (overlapSegment)
                        overlapSegment = concatSegment(overlapSegment, match);
                    else
                        overlapSegment = match;
                }
            }
        });
        // Segment doesn't overlap - add overlaps to results & reset
        if (doesOverlaps === false && overlapSegment) {
            features.push(overlapSegment);
            overlapSegment = undefined;
        }
    });
    // Add last segment if exists
    if (overlapSegment)
        features.push(overlapSegment);
    return helpers_1.featureCollection(features);
}
/**
 * Concat Segment
 *
 * @private
 * @param {Feature<LineString>} line LineString
 * @param {Feature<LineString>} segment 2-vertex LineString
 * @returns {Feature<LineString>} concat linestring
 */
function concatSegment(line, segment) {
    var coords = invariant_1.getCoords(segment);
    var lineCoords = invariant_1.getCoords(line);
    var start = lineCoords[0];
    var end = lineCoords[lineCoords.length - 1];
    var geom = line.geometry.coordinates;
    if (deep_equal_1.default(coords[0], start))
        geom.unshift(coords[1]);
    else if (deep_equal_1.default(coords[0], end))
        geom.push(coords[1]);
    else if (deep_equal_1.default(coords[1], start))
        geom.unshift(coords[0]);
    else if (deep_equal_1.default(coords[1], end))
        geom.push(coords[0]);
    return line;
}
exports.default = lineOverlap;
