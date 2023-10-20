"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
/**
 * Node
 */
var Node = /** @class */ (function () {
    function Node(coordinates) {
        this.id = Node.buildId(coordinates);
        this.coordinates = coordinates; //< {Number[]}
        this.innerEdges = []; //< {Edge[]}
        // We wil store to (out) edges in an CCW order as geos::planargraph::DirectedEdgeStar does
        this.outerEdges = []; //< {Edge[]}
        this.outerEdgesSorted = false; //< {Boolean} flag that stores if the outer Edges had been sorted
    }
    Node.buildId = function (coordinates) {
        return coordinates.join(",");
    };
    Node.prototype.removeInnerEdge = function (edge) {
        this.innerEdges = this.innerEdges.filter(function (e) { return e.from.id !== edge.from.id; });
    };
    Node.prototype.removeOuterEdge = function (edge) {
        this.outerEdges = this.outerEdges.filter(function (e) { return e.to.id !== edge.to.id; });
    };
    /**
     * Outer edges are stored CCW order.
     *
     * @memberof Node
     * @param {Edge} edge - Edge to add as an outerEdge.
     */
    Node.prototype.addOuterEdge = function (edge) {
        this.outerEdges.push(edge);
        this.outerEdgesSorted = false;
    };
    /**
     * Sorts outer edges in CCW way.
     *
     * @memberof Node
     * @private
     */
    Node.prototype.sortOuterEdges = function () {
        var _this = this;
        if (!this.outerEdgesSorted) {
            //this.outerEdges.sort((a, b) => a.compareTo(b));
            // Using this comparator in order to be deterministic
            this.outerEdges.sort(function (a, b) {
                var aNode = a.to, bNode = b.to;
                if (aNode.coordinates[0] - _this.coordinates[0] >= 0 &&
                    bNode.coordinates[0] - _this.coordinates[0] < 0)
                    return 1;
                if (aNode.coordinates[0] - _this.coordinates[0] < 0 &&
                    bNode.coordinates[0] - _this.coordinates[0] >= 0)
                    return -1;
                if (aNode.coordinates[0] - _this.coordinates[0] === 0 &&
                    bNode.coordinates[0] - _this.coordinates[0] === 0) {
                    if (aNode.coordinates[1] - _this.coordinates[1] >= 0 ||
                        bNode.coordinates[1] - _this.coordinates[1] >= 0)
                        return aNode.coordinates[1] - bNode.coordinates[1];
                    return bNode.coordinates[1] - aNode.coordinates[1];
                }
                var det = util_1.orientationIndex(_this.coordinates, aNode.coordinates, bNode.coordinates);
                if (det < 0)
                    return 1;
                if (det > 0)
                    return -1;
                var d1 = Math.pow(aNode.coordinates[0] - _this.coordinates[0], 2) +
                    Math.pow(aNode.coordinates[1] - _this.coordinates[1], 2), d2 = Math.pow(bNode.coordinates[0] - _this.coordinates[0], 2) +
                    Math.pow(bNode.coordinates[1] - _this.coordinates[1], 2);
                return d1 - d2;
            });
            this.outerEdgesSorted = true;
        }
    };
    /**
     * Retrieves outer edges.
     *
     * They are sorted if they aren't in the CCW order.
     *
     * @memberof Node
     * @returns {Edge[]} - List of outer edges sorted in a CCW order.
     */
    Node.prototype.getOuterEdges = function () {
        this.sortOuterEdges();
        return this.outerEdges;
    };
    Node.prototype.getOuterEdge = function (i) {
        this.sortOuterEdges();
        return this.outerEdges[i];
    };
    Node.prototype.addInnerEdge = function (edge) {
        this.innerEdges.push(edge);
    };
    return Node;
}());
exports.default = Node;
