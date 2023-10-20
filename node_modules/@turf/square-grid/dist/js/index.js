"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var rectangle_grid_1 = __importDefault(require("@turf/rectangle-grid"));
/**
 * Creates a square grid from a bounding box.
 *
 * @name squareGrid
 * @param {Array<number>} bbox extent in [minX, minY, maxX, maxY] order
 * @param {number} cellSide of each cell, in units
 * @param {Object} [options={}] Optional parameters
 * @param {string} [options.units='kilometers'] used in calculating cellSide, can be degrees,
 * radians, miles, or kilometers
 * @param {Feature<Polygon|MultiPolygon>} [options.mask] if passed a Polygon or MultiPolygon,
 * the grid Points will be created only inside it
 * @param {Object} [options.properties={}] passed to each point of the grid
 * @returns {FeatureCollection<Polygon>} grid a grid of polygons
 * @example
 * var bbox = [-95, 30 ,-85, 40];
 * var cellSide = 50;
 * var options = {units: 'miles'};
 *
 * var squareGrid = turf.squareGrid(bbox, cellSide, options);
 *
 * //addToMap
 * var addToMap = [squareGrid]
 */
function squareGrid(bbox, cellSide, options) {
    if (options === void 0) { options = {}; }
    return rectangle_grid_1.default(bbox, cellSide, cellSide, options);
}
exports.default = squareGrid;
