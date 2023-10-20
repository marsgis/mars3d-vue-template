"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bbox_1 = __importDefault(require("@turf/bbox"));
var invariant_1 = require("@turf/invariant");
var helpers_1 = require("@turf/helpers");
var clone_1 = __importDefault(require("@turf/clone"));
/**
 * Converts (Multi)LineString(s) to Polygon(s).
 *
 * @name lineToPolygon
 * @param {FeatureCollection|Feature<LineString|MultiLineString>} lines Features to convert
 * @param {Object} [options={}] Optional parameters
 * @param {Object} [options.properties={}] translates GeoJSON properties to Feature
 * @param {boolean} [options.autoComplete=true] auto complete linestrings (matches first & last coordinates)
 * @param {boolean} [options.orderCoords=true] sorts linestrings to place outer ring at the first position of the coordinates
 * @param {boolean} [options.mutate=false] mutate the original linestring using autoComplete (matches first & last coordinates)
 * @returns {Feature<Polygon|MultiPolygon>} converted to Polygons
 * @example
 * var line = turf.lineString([[125, -30], [145, -30], [145, -20], [125, -20], [125, -30]]);
 *
 * var polygon = turf.lineToPolygon(line);
 *
 * //addToMap
 * var addToMap = [polygon];
 */
function lineToPolygon(lines, options) {
    if (options === void 0) { options = {}; }
    var _a, _b, _c;
    // Optional parameters
    var properties = options.properties;
    var autoComplete = (_a = options.autoComplete) !== null && _a !== void 0 ? _a : true;
    var orderCoords = (_b = options.orderCoords) !== null && _b !== void 0 ? _b : true;
    var mutate = (_c = options.mutate) !== null && _c !== void 0 ? _c : false;
    if (!mutate) {
        lines = clone_1.default(lines);
    }
    switch (lines.type) {
        case "FeatureCollection":
            var coords = [];
            lines.features.forEach(function (line) {
                coords.push(invariant_1.getCoords(lineStringToPolygon(line, {}, autoComplete, orderCoords)));
            });
            return helpers_1.multiPolygon(coords, properties);
        default:
            return lineStringToPolygon(lines, properties, autoComplete, orderCoords);
    }
}
/**
 * LineString to Polygon
 *
 * @private
 * @param {Feature<LineString|MultiLineString>} line line
 * @param {Object} [properties] translates GeoJSON properties to Feature
 * @param {boolean} [autoComplete=true] auto complete linestrings
 * @param {boolean} [orderCoords=true] sorts linestrings to place outer ring at the first position of the coordinates
 * @returns {Feature<Polygon>} line converted to Polygon
 */
function lineStringToPolygon(line, properties, autoComplete, orderCoords) {
    properties = properties
        ? properties
        : line.type === "Feature"
            ? line.properties
            : {};
    var geom = invariant_1.getGeom(line);
    var coords = geom.coordinates;
    var type = geom.type;
    if (!coords.length)
        throw new Error("line must contain coordinates");
    switch (type) {
        case "LineString":
            if (autoComplete)
                coords = autoCompleteCoords(coords);
            return helpers_1.polygon([coords], properties);
        case "MultiLineString":
            var multiCoords = [];
            var largestArea = 0;
            coords.forEach(function (coord) {
                if (autoComplete)
                    coord = autoCompleteCoords(coord);
                // Largest LineString to be placed in the first position of the coordinates array
                if (orderCoords) {
                    var area = calculateArea(bbox_1.default(helpers_1.lineString(coord)));
                    if (area > largestArea) {
                        multiCoords.unshift(coord);
                        largestArea = area;
                    }
                    else
                        multiCoords.push(coord);
                }
                else {
                    multiCoords.push(coord);
                }
            });
            return helpers_1.polygon(multiCoords, properties);
        default:
            throw new Error("geometry type " + type + " is not supported");
    }
}
/**
 * Auto Complete Coords - matches first & last coordinates
 *
 * @private
 * @param {Array<Array<number>>} coords Coordinates
 * @returns {Array<Array<number>>} auto completed coordinates
 */
function autoCompleteCoords(coords) {
    var first = coords[0];
    var x1 = first[0];
    var y1 = first[1];
    var last = coords[coords.length - 1];
    var x2 = last[0];
    var y2 = last[1];
    if (x1 !== x2 || y1 !== y2) {
        coords.push(first);
    }
    return coords;
}
/**
 * area - quick approximate area calculation (used to sort)
 *
 * @private
 * @param {Array<number>} bbox BBox [west, south, east, north]
 * @returns {number} very quick area calculation
 */
function calculateArea(bbox) {
    var west = bbox[0];
    var south = bbox[1];
    var east = bbox[2];
    var north = bbox[3];
    return Math.abs(west - east) * Math.abs(south - north);
}
exports.default = lineToPolygon;
