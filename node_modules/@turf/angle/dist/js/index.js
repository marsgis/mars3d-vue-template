"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bearing_1 = __importDefault(require("@turf/bearing"));
var helpers_1 = require("@turf/helpers");
var rhumb_bearing_1 = __importDefault(require("@turf/rhumb-bearing"));
/**
 * Finds the angle formed by two adjacent segments defined by 3 points. The result will be the (positive clockwise)
 * angle with origin on the `startPoint-midPoint` segment, or its explementary angle if required.
 *
 * @name angle
 * @param {Coord} startPoint Start Point Coordinates
 * @param {Coord} midPoint Mid Point Coordinates
 * @param {Coord} endPoint End Point Coordinates
 * @param {Object} [options={}] Optional parameters
 * @param {boolean} [options.explementary=false] Returns the explementary angle instead (360 - angle)
 * @param {boolean} [options.mercator=false] if calculations should be performed over Mercator or WGS84 projection
 * @returns {number} Angle between the provided points, or its explementary.
 * @example
 * turf.angle([5, 5], [5, 6], [3, 4]);
 * //=45
 */
function angle(startPoint, midPoint, endPoint, options) {
    if (options === void 0) { options = {}; }
    // Optional Parameters
    if (!helpers_1.isObject(options)) {
        throw new Error("options is invalid");
    }
    // Validation
    if (!startPoint) {
        throw new Error("startPoint is required");
    }
    if (!midPoint) {
        throw new Error("midPoint is required");
    }
    if (!endPoint) {
        throw new Error("endPoint is required");
    }
    // Rename to shorter variables
    var A = startPoint;
    var O = midPoint;
    var B = endPoint;
    // Main
    var azimuthAO = helpers_1.bearingToAzimuth(options.mercator !== true ? bearing_1.default(A, O) : rhumb_bearing_1.default(A, O));
    var azimuthBO = helpers_1.bearingToAzimuth(options.mercator !== true ? bearing_1.default(B, O) : rhumb_bearing_1.default(B, O));
    var angleAO = Math.abs(azimuthAO - azimuthBO);
    // Explementary angle
    if (options.explementary === true) {
        return 360 - angleAO;
    }
    return angleAO;
}
exports.default = angle;
