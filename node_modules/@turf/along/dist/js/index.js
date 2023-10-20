"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bearing_1 = __importDefault(require("@turf/bearing"));
var destination_1 = __importDefault(require("@turf/destination"));
var distance_1 = __importDefault(require("@turf/distance"));
var helpers_1 = require("@turf/helpers");
var invariant_1 = require("@turf/invariant");
/**
 * Takes a {@link LineString} and returns a {@link Point} at a specified distance along the line.
 *
 * @name along
 * @param {Feature<LineString>} line input line
 * @param {number} distance distance along the line
 * @param {Object} [options] Optional parameters
 * @param {string} [options.units="kilometers"] can be degrees, radians, miles, or kilometers
 * @returns {Feature<Point>} Point `distance` `units` along the line
 * @example
 * var line = turf.lineString([[-83, 30], [-84, 36], [-78, 41]]);
 * var options = {units: 'miles'};
 *
 * var along = turf.along(line, 200, options);
 *
 * //addToMap
 * var addToMap = [along, line]
 */
function along(line, distance, options) {
    if (options === void 0) { options = {}; }
    // Get Coords
    var geom = invariant_1.getGeom(line);
    var coords = geom.coordinates;
    var travelled = 0;
    for (var i = 0; i < coords.length; i++) {
        if (distance >= travelled && i === coords.length - 1) {
            break;
        }
        else if (travelled >= distance) {
            var overshot = distance - travelled;
            if (!overshot) {
                return helpers_1.point(coords[i]);
            }
            else {
                var direction = bearing_1.default(coords[i], coords[i - 1]) - 180;
                var interpolated = destination_1.default(coords[i], overshot, direction, options);
                return interpolated;
            }
        }
        else {
            travelled += distance_1.default(coords[i], coords[i + 1], options);
        }
    }
    return helpers_1.point(coords[coords.length - 1]);
}
exports.default = along;
