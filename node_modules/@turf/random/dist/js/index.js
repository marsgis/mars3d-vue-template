"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("@turf/helpers");
/**
 * Returns a random position within a {@link bounding box}.
 *
 * @name randomPosition
 * @param {Array<number>} [bbox=[-180, -90, 180, 90]] a bounding box inside of which positions are placed.
 * @returns {Array<number>} Position [longitude, latitude]
 * @example
 * var position = turf.randomPosition([-180, -90, 180, 90])
 * // => position
 */
function randomPosition(bbox) {
    if (Array.isArray(bbox)) {
        return coordInBBox(bbox);
    }
    if (bbox && bbox.bbox) {
        return coordInBBox(bbox.bbox);
    }
    return [lon(), lat()];
}
exports.randomPosition = randomPosition;
/**
 * Returns a random {@link point}.
 *
 * @name randomPoint
 * @param {number} [count=1] how many geometries will be generated
 * @param {Object} [options={}] Optional parameters
 * @param {Array<number>} [options.bbox=[-180, -90, 180, 90]] a bounding box inside of which geometries are placed.
 * @returns {FeatureCollection<Point>} GeoJSON FeatureCollection of points
 * @example
 * var points = turf.randomPoint(25, {bbox: [-180, -90, 180, 90]})
 * // => points
 */
function randomPoint(count, options) {
    if (options === void 0) { options = {}; }
    if (count === undefined || count === null) {
        count = 1;
    }
    var features = [];
    for (var i = 0; i < count; i++) {
        features.push(helpers_1.point(randomPosition(options.bbox)));
    }
    return helpers_1.featureCollection(features);
}
exports.randomPoint = randomPoint;
/**
 * Returns a random {@link polygon}.
 *
 * @name randomPolygon
 * @param {number} [count=1] how many geometries will be generated
 * @param {Object} [options={}] Optional parameters
 * @param {Array<number>} [options.bbox=[-180, -90, 180, 90]] a bounding box inside of which geometries are placed.
 * @param {number} [options.num_vertices=10] is how many coordinates each LineString will contain.
 * @param {number} [options.max_radial_length=10] is the maximum number of decimal degrees latitude or longitude that a
 * vertex can reach out of the center of the Polygon.
 * @returns {FeatureCollection<Polygon>} GeoJSON FeatureCollection of polygons
 * @example
 * var polygons = turf.randomPolygon(25, {bbox: [-180, -90, 180, 90]})
 * // => polygons
 */
function randomPolygon(count, options) {
    if (options === void 0) { options = {}; }
    // Default param
    if (count === undefined || count === null) {
        count = 1;
    }
    if (!helpers_1.isNumber(options.num_vertices) || options.num_vertices === undefined) {
        options.num_vertices = 10;
    }
    if (!helpers_1.isNumber(options.max_radial_length) ||
        options.max_radial_length === undefined) {
        options.max_radial_length = 10;
    }
    var features = [];
    var _loop_1 = function (i) {
        var vertices = [];
        var circleOffsets = __spreadArrays(Array(options.num_vertices + 1)).map(Math.random);
        // Sum Offsets
        circleOffsets.forEach(function (cur, index, arr) {
            arr[index] = index > 0 ? cur + arr[index - 1] : cur;
        });
        // scaleOffsets
        circleOffsets.forEach(function (cur) {
            cur = (cur * 2 * Math.PI) / circleOffsets[circleOffsets.length - 1];
            var radialScaler = Math.random();
            vertices.push([
                radialScaler * (options.max_radial_length || 10) * Math.sin(cur),
                radialScaler * (options.max_radial_length || 10) * Math.cos(cur),
            ]);
        });
        vertices[vertices.length - 1] = vertices[0]; // close the ring
        // center the polygon around something
        vertices = vertices.map(vertexToCoordinate(randomPosition(options.bbox)));
        features.push(helpers_1.polygon([vertices]));
    };
    for (var i = 0; i < count; i++) {
        _loop_1(i);
    }
    return helpers_1.featureCollection(features);
}
exports.randomPolygon = randomPolygon;
/**
 * Returns a random {@link linestring}.
 *
 * @name randomLineString
 * @param {number} [count=1] how many geometries will be generated
 * @param {Object} [options={}] Optional parameters
 * @param {Array<number>} [options.bbox=[-180, -90, 180, 90]] a bounding box inside of which geometries are placed.
 * @param {number} [options.num_vertices=10] is how many coordinates each LineString will contain.
 * @param {number} [options.max_length=0.0001] is the maximum number of decimal degrees that a
 * vertex can be from its predecessor
 * @param {number} [options.max_rotation=Math.PI / 8] is the maximum number of radians that a
 * line segment can turn from the previous segment.
 * @returns {FeatureCollection<LineString>} GeoJSON FeatureCollection of linestrings
 * @example
 * var lineStrings = turf.randomLineString(25, {bbox: [-180, -90, 180, 90]})
 * // => lineStrings
 */
function randomLineString(count, options) {
    if (options === void 0) { options = {}; }
    // Optional parameters
    options = options || {};
    if (!helpers_1.isObject(options)) {
        throw new Error("options is invalid");
    }
    var bbox = options.bbox;
    var num_vertices = options.num_vertices;
    var max_length = options.max_length;
    var max_rotation = options.max_rotation;
    if (count === undefined || count === null) {
        count = 1;
    }
    // Default parameters
    if (!helpers_1.isNumber(num_vertices) ||
        num_vertices === undefined ||
        num_vertices < 2) {
        num_vertices = 10;
    }
    if (!helpers_1.isNumber(max_length) || max_length === undefined) {
        max_length = 0.0001;
    }
    if (!helpers_1.isNumber(max_rotation) || max_rotation === undefined) {
        max_rotation = Math.PI / 8;
    }
    var features = [];
    for (var i = 0; i < count; i++) {
        var startingPoint = randomPosition(bbox);
        var vertices = [startingPoint];
        for (var j = 0; j < num_vertices - 1; j++) {
            var priorAngle = j === 0
                ? Math.random() * 2 * Math.PI
                : Math.tan((vertices[j][1] - vertices[j - 1][1]) /
                    (vertices[j][0] - vertices[j - 1][0]));
            var angle = priorAngle + (Math.random() - 0.5) * max_rotation * 2;
            var distance = Math.random() * max_length;
            vertices.push([
                vertices[j][0] + distance * Math.cos(angle),
                vertices[j][1] + distance * Math.sin(angle),
            ]);
        }
        features.push(helpers_1.lineString(vertices));
    }
    return helpers_1.featureCollection(features);
}
exports.randomLineString = randomLineString;
function vertexToCoordinate(hub) {
    return function (cur) {
        return [cur[0] + hub[0], cur[1] + hub[1]];
    };
}
function rnd() {
    return Math.random() - 0.5;
}
function lon() {
    return rnd() * 360;
}
function lat() {
    return rnd() * 180;
}
function coordInBBox(bbox) {
    return [
        Math.random() * (bbox[2] - bbox[0]) + bbox[0],
        Math.random() * (bbox[3] - bbox[1]) + bbox[1],
    ];
}
