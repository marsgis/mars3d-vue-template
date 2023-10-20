"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("@turf/helpers");
var Graph_1 = __importDefault(require("./lib/Graph"));
var EdgeRing_1 = __importDefault(require("./lib/EdgeRing"));
/**
 * Polygonizes {@link LineString|(Multi)LineString(s)} into {@link Polygons}.
 *
 * Implementation of GEOSPolygonize function (`geos::operation::polygonize::Polygonizer`).
 *
 * Polygonizes a set of lines that represents edges in a planar graph. Edges must be correctly
 * noded, i.e., they must only meet at their endpoints.
 *
 * The implementation correctly handles:
 *
 * - Dangles: edges which have one or both ends which are not incident on another edge endpoint.
 * - Cut Edges (bridges): edges that are connected at both ends but which do not form part of a polygon.
 *
 * @name polygonize
 * @param {FeatureCollection|Geometry|Feature<LineString|MultiLineString>} geoJson Lines in order to polygonize
 * @returns {FeatureCollection<Polygon>} Polygons created
 * @throws {Error} if geoJson is invalid.
 */
function polygonize(geoJson) {
    var graph = Graph_1.default.fromGeoJson(geoJson);
    // 1. Remove dangle node
    graph.deleteDangles();
    // 2. Remove cut-edges (bridge edges)
    graph.deleteCutEdges();
    // 3. Get all holes and shells
    var holes = [], shells = [];
    graph
        .getEdgeRings()
        .filter(function (edgeRing) { return edgeRing.isValid(); })
        .forEach(function (edgeRing) {
        if (edgeRing.isHole())
            holes.push(edgeRing);
        else
            shells.push(edgeRing);
    });
    // 4. Assign Holes to Shells
    holes.forEach(function (hole) {
        if (EdgeRing_1.default.findEdgeRingContaining(hole, shells))
            shells.push(hole);
    });
    // 5. EdgeRings to Polygons
    return helpers_1.featureCollection(shells.map(function (shell) { return shell.toPolygon(); }));
}
exports.default = polygonize;
