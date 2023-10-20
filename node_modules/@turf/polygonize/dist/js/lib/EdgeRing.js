"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
var helpers_1 = require("@turf/helpers");
var envelope_1 = __importDefault(require("@turf/envelope"));
var boolean_point_in_polygon_1 = __importDefault(require("@turf/boolean-point-in-polygon"));
/**
 * Ring of edges which form a polygon.
 *
 * The ring may be either an outer shell or a hole.
 *
 * This class is inspired in GEOS's geos::operation::polygonize::EdgeRing
 */
var EdgeRing = /** @class */ (function () {
    function EdgeRing() {
        this.edges = [];
        this.polygon = undefined; //< Caches Polygon representation
        this.envelope = undefined; //< Caches Envelope representation
    }
    /**
     * Add an edge to the ring, inserting it in the last position.
     *
     * @memberof EdgeRing
     * @param {Edge} edge - Edge to be inserted
     */
    EdgeRing.prototype.push = function (edge) {
        this.edges.push(edge);
        this.polygon = this.envelope = undefined;
    };
    /**
     * Get Edge.
     *
     * @memberof EdgeRing
     * @param {number} i - Index
     * @returns {Edge} - Edge in the i position
     */
    EdgeRing.prototype.get = function (i) {
        return this.edges[i];
    };
    Object.defineProperty(EdgeRing.prototype, "length", {
        /**
         * Getter of length property.
         *
         * @memberof EdgeRing
         * @returns {number} - Length of the edge ring.
         */
        get: function () {
            return this.edges.length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Similar to Array.prototype.forEach for the list of Edges in the EdgeRing.
     *
     * @memberof EdgeRing
     * @param {Function} f - The same function to be passed to Array.prototype.forEach
     */
    EdgeRing.prototype.forEach = function (f) {
        this.edges.forEach(f);
    };
    /**
     * Similar to Array.prototype.map for the list of Edges in the EdgeRing.
     *
     * @memberof EdgeRing
     * @param {Function} f - The same function to be passed to Array.prototype.map
     * @returns {Array} - The mapped values in the function
     */
    EdgeRing.prototype.map = function (f) {
        return this.edges.map(f);
    };
    /**
     * Similar to Array.prototype.some for the list of Edges in the EdgeRing.
     *
     * @memberof EdgeRing
     * @param {Function} f - The same function to be passed to Array.prototype.some
     * @returns {boolean} - True if an Edge check the condition
     */
    EdgeRing.prototype.some = function (f) {
        return this.edges.some(f);
    };
    /**
     * Check if the ring is valid in geomtry terms.
     *
     * A ring must have either 0 or 4 or more points. The first and the last must be
     * equal (in 2D)
     * geos::geom::LinearRing::validateConstruction
     *
     * @memberof EdgeRing
     * @returns {boolean} - Validity of the EdgeRing
     */
    EdgeRing.prototype.isValid = function () {
        // TODO: stub
        return true;
    };
    /**
     * Tests whether this ring is a hole.
     *
     * A ring is a hole if it is oriented counter-clockwise.
     * Similar implementation of geos::algorithm::CGAlgorithms::isCCW
     *
     * @memberof EdgeRing
     * @returns {boolean} - true: if it is a hole
     */
    EdgeRing.prototype.isHole = function () {
        var _this = this;
        // XXX: Assuming Ring is valid
        // Find highest point
        var hiIndex = this.edges.reduce(function (high, edge, i) {
            if (edge.from.coordinates[1] > _this.edges[high].from.coordinates[1])
                high = i;
            return high;
        }, 0), iPrev = (hiIndex === 0 ? this.length : hiIndex) - 1, iNext = (hiIndex + 1) % this.length, disc = util_1.orientationIndex(this.edges[iPrev].from.coordinates, this.edges[hiIndex].from.coordinates, this.edges[iNext].from.coordinates);
        if (disc === 0)
            return (this.edges[iPrev].from.coordinates[0] >
                this.edges[iNext].from.coordinates[0]);
        return disc > 0;
    };
    /**
     * Creates a MultiPoint representing the EdgeRing (discarts edges directions).
     *
     * @memberof EdgeRing
     * @returns {Feature<MultiPoint>} - Multipoint representation of the EdgeRing
     */
    EdgeRing.prototype.toMultiPoint = function () {
        return helpers_1.multiPoint(this.edges.map(function (edge) { return edge.from.coordinates; }));
    };
    /**
     * Creates a Polygon representing the EdgeRing.
     *
     * @memberof EdgeRing
     * @returns {Feature<Polygon>} - Polygon representation of the Edge Ring
     */
    EdgeRing.prototype.toPolygon = function () {
        if (this.polygon)
            return this.polygon;
        var coordinates = this.edges.map(function (edge) { return edge.from.coordinates; });
        coordinates.push(this.edges[0].from.coordinates);
        return (this.polygon = helpers_1.polygon([coordinates]));
    };
    /**
     * Calculates the envelope of the EdgeRing.
     *
     * @memberof EdgeRing
     * @returns {Feature<Polygon>} - envelope
     */
    EdgeRing.prototype.getEnvelope = function () {
        if (this.envelope)
            return this.envelope;
        return (this.envelope = envelope_1.default(this.toPolygon()));
    };
    /**
     * `geos::operation::polygonize::EdgeRing::findEdgeRingContaining`
     *
     * @param {EdgeRing} testEdgeRing - EdgeRing to look in the list
     * @param {EdgeRing[]} shellList - List of EdgeRing in which to search
     *
     * @returns {EdgeRing} - EdgeRing which contains the testEdgeRing
     */
    EdgeRing.findEdgeRingContaining = function (testEdgeRing, shellList) {
        var testEnvelope = testEdgeRing.getEnvelope();
        var minEnvelope, minShell;
        shellList.forEach(function (shell) {
            var tryEnvelope = shell.getEnvelope();
            if (minShell)
                minEnvelope = minShell.getEnvelope();
            // the hole envelope cannot equal the shell envelope
            if (util_1.envelopeIsEqual(tryEnvelope, testEnvelope))
                return;
            if (util_1.envelopeContains(tryEnvelope, testEnvelope)) {
                var testEdgeRingCoordinates = testEdgeRing.map(function (edge) { return edge.from.coordinates; });
                var testPoint = void 0;
                var _loop_1 = function (pt) {
                    if (!shell.some(function (edge) { return util_1.coordinatesEqual(pt, edge.from.coordinates); })) {
                        testPoint = pt;
                    }
                };
                for (var _i = 0, testEdgeRingCoordinates_1 = testEdgeRingCoordinates; _i < testEdgeRingCoordinates_1.length; _i++) {
                    var pt = testEdgeRingCoordinates_1[_i];
                    _loop_1(pt);
                }
                if (testPoint && shell.inside(helpers_1.point(testPoint))) {
                    if (!minShell || util_1.envelopeContains(minEnvelope, tryEnvelope))
                        minShell = shell;
                }
            }
        });
        return minShell;
    };
    /**
     * Checks if the point is inside the edgeRing
     *
     * @param {Feature<Point>} pt - Point to check if it is inside the edgeRing
     * @returns {boolean} - True if it is inside, False otherwise
     */
    EdgeRing.prototype.inside = function (pt) {
        return boolean_point_in_polygon_1.default(pt, this.toPolygon());
    };
    return EdgeRing;
}());
exports.default = EdgeRing;
