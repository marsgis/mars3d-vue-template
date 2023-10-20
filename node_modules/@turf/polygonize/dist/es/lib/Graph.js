import Node from "./Node.js";
import Edge from "./Edge.js";
import EdgeRing from "./EdgeRing.js";
import { flattenEach, coordReduce } from "@turf/meta";
import { featureOf } from "@turf/invariant";
/**
 * Validates the geoJson.
 *
 * @param {GeoJSON} geoJson - input geoJson.
 * @throws {Error} if geoJson is invalid.
 */
function validateGeoJson(geoJson) {
    if (!geoJson)
        throw new Error("No geojson passed");
    if (geoJson.type !== "FeatureCollection" &&
        geoJson.type !== "GeometryCollection" &&
        geoJson.type !== "MultiLineString" &&
        geoJson.type !== "LineString" &&
        geoJson.type !== "Feature")
        throw new Error("Invalid input type '" + geoJson.type + "'. Geojson must be FeatureCollection, GeometryCollection, LineString, MultiLineString or Feature");
}
/**
 * Represents a planar graph of edges and nodes that can be used to compute a polygonization.
 *
 * Although, this class is inspired by GEOS's `geos::operation::polygonize::PolygonizeGraph`,
 * it isn't a rewrite. As regards algorithm, this class implements the same logic, but it
 * isn't a javascript transcription of the C++ source.
 *
 * This graph is directed (both directions are created)
 */
var Graph = /** @class */ (function () {
    function Graph() {
        this.edges = []; //< {Edge[]} dirEdges
        // The key is the `id` of the Node (ie: coordinates.join(','))
        this.nodes = {};
    }
    /**
     * Creates a graph from a GeoJSON.
     *
     * @param {FeatureCollection<LineString>} geoJson - it must comply with the restrictions detailed in the index
     * @returns {Graph} - The newly created graph
     * @throws {Error} if geoJson is invalid.
     */
    Graph.fromGeoJson = function (geoJson) {
        validateGeoJson(geoJson);
        var graph = new Graph();
        flattenEach(geoJson, function (feature) {
            featureOf(feature, "LineString", "Graph::fromGeoJson");
            // When a LineString if formed by many segments, split them
            coordReduce(feature, function (prev, cur) {
                if (prev) {
                    var start = graph.getNode(prev), end = graph.getNode(cur);
                    graph.addEdge(start, end);
                }
                return cur;
            });
        });
        return graph;
    };
    /**
     * Creates or get a Node.
     *
     * @param {number[]} coordinates - Coordinates of the node
     * @returns {Node} - The created or stored node
     */
    Graph.prototype.getNode = function (coordinates) {
        var id = Node.buildId(coordinates);
        var node = this.nodes[id];
        if (!node)
            node = this.nodes[id] = new Node(coordinates);
        return node;
    };
    /**
     * Adds an Edge and its symetricall.
     *
     * Edges are added symetrically, i.e.: we also add its symetric
     *
     * @param {Node} from - Node which starts the Edge
     * @param {Node} to - Node which ends the Edge
     */
    Graph.prototype.addEdge = function (from, to) {
        var edge = new Edge(from, to), symetricEdge = edge.getSymetric();
        this.edges.push(edge);
        this.edges.push(symetricEdge);
    };
    /**
     * Removes Dangle Nodes (nodes with grade 1).
     */
    Graph.prototype.deleteDangles = function () {
        var _this = this;
        Object.keys(this.nodes)
            .map(function (id) { return _this.nodes[id]; })
            .forEach(function (node) { return _this._removeIfDangle(node); });
    };
    /**
     * Check if node is dangle, if so, remove it.
     *
     * It calls itself recursively, removing a dangling node might cause another dangling node
     *
     * @param {Node} node - Node to check if it's a dangle
     */
    Graph.prototype._removeIfDangle = function (node) {
        var _this = this;
        // As edges are directed and symetrical, we count only innerEdges
        if (node.innerEdges.length <= 1) {
            var outerNodes = node.getOuterEdges().map(function (e) { return e.to; });
            this.removeNode(node);
            outerNodes.forEach(function (n) { return _this._removeIfDangle(n); });
        }
    };
    /**
     * Delete cut-edges (bridge edges).
     *
     * The graph will be traversed, all the edges will be labeled according the ring
     * in which they are. (The label is a number incremented by 1). Edges with the same
     * label are cut-edges.
     */
    Graph.prototype.deleteCutEdges = function () {
        var _this = this;
        this._computeNextCWEdges();
        this._findLabeledEdgeRings();
        // Cut-edges (bridges) are edges where both edges have the same label
        this.edges.forEach(function (edge) {
            if (edge.label === edge.symetric.label) {
                _this.removeEdge(edge.symetric);
                _this.removeEdge(edge);
            }
        });
    };
    /**
     * Set the `next` property of each Edge.
     *
     * The graph will be transversed in a CW form, so, we set the next of the symetrical edge as the previous one.
     * OuterEdges are sorted CCW.
     *
     * @param {Node} [node] - If no node is passed, the function calls itself for every node in the Graph
     */
    Graph.prototype._computeNextCWEdges = function (node) {
        var _this = this;
        if (typeof node === "undefined") {
            Object.keys(this.nodes).forEach(function (id) {
                return _this._computeNextCWEdges(_this.nodes[id]);
            });
        }
        else {
            node.getOuterEdges().forEach(function (edge, i) {
                node.getOuterEdge((i === 0 ? node.getOuterEdges().length : i) - 1).symetric.next = edge;
            });
        }
    };
    /**
     * Computes the next edge pointers going CCW around the given node, for the given edgering label.
     *
     * This algorithm has the effect of converting maximal edgerings into minimal edgerings
     *
     * XXX: method literally transcribed from `geos::operation::polygonize::PolygonizeGraph::computeNextCCWEdges`,
     * could be written in a more javascript way.
     *
     * @param {Node} node - Node
     * @param {number} label - Ring's label
     */
    Graph.prototype._computeNextCCWEdges = function (node, label) {
        var edges = node.getOuterEdges();
        var firstOutDE, prevInDE;
        for (var i = edges.length - 1; i >= 0; --i) {
            var de = edges[i], sym = de.symetric, outDE = void 0, inDE = void 0;
            if (de.label === label)
                outDE = de;
            if (sym.label === label)
                inDE = sym;
            if (!outDE || !inDE)
                // This edge is not in edgering
                continue;
            if (inDE)
                prevInDE = inDE;
            if (outDE) {
                if (prevInDE) {
                    prevInDE.next = outDE;
                    prevInDE = undefined;
                }
                if (!firstOutDE)
                    firstOutDE = outDE;
            }
        }
        if (prevInDE)
            prevInDE.next = firstOutDE;
    };
    /**
     * Finds rings and labels edges according to which rings are.
     *
     * The label is a number which is increased for each ring.
     *
     * @returns {Edge[]} edges that start rings
     */
    Graph.prototype._findLabeledEdgeRings = function () {
        var edgeRingStarts = [];
        var label = 0;
        this.edges.forEach(function (edge) {
            if (edge.label >= 0)
                return;
            edgeRingStarts.push(edge);
            var e = edge;
            do {
                e.label = label;
                e = e.next;
            } while (!edge.isEqual(e));
            label++;
        });
        return edgeRingStarts;
    };
    /**
     * Computes the EdgeRings formed by the edges in this graph.
     *
     * @returns {EdgeRing[]} - A list of all the EdgeRings in the graph.
     */
    Graph.prototype.getEdgeRings = function () {
        var _this = this;
        this._computeNextCWEdges();
        // Clear labels
        this.edges.forEach(function (edge) {
            edge.label = undefined;
        });
        this._findLabeledEdgeRings().forEach(function (edge) {
            // convertMaximalToMinimalEdgeRings
            _this._findIntersectionNodes(edge).forEach(function (node) {
                _this._computeNextCCWEdges(node, edge.label);
            });
        });
        var edgeRingList = [];
        // find all edgerings
        this.edges.forEach(function (edge) {
            if (edge.ring)
                return;
            edgeRingList.push(_this._findEdgeRing(edge));
        });
        return edgeRingList;
    };
    /**
     * Find all nodes in a Maxima EdgeRing which are self-intersection nodes.
     *
     * @param {Node} startEdge - Start Edge of the Ring
     * @returns {Node[]} - intersection nodes
     */
    Graph.prototype._findIntersectionNodes = function (startEdge) {
        var intersectionNodes = [];
        var edge = startEdge;
        var _loop_1 = function () {
            // getDegree
            var degree = 0;
            edge.from.getOuterEdges().forEach(function (e) {
                if (e.label === startEdge.label)
                    ++degree;
            });
            if (degree > 1)
                intersectionNodes.push(edge.from);
            edge = edge.next;
        };
        do {
            _loop_1();
        } while (!startEdge.isEqual(edge));
        return intersectionNodes;
    };
    /**
     * Get the edge-ring which starts from the provided Edge.
     *
     * @param {Edge} startEdge - starting edge of the edge ring
     * @returns {EdgeRing} - EdgeRing which start Edge is the provided one.
     */
    Graph.prototype._findEdgeRing = function (startEdge) {
        var edge = startEdge;
        var edgeRing = new EdgeRing();
        do {
            edgeRing.push(edge);
            edge.ring = edgeRing;
            edge = edge.next;
        } while (!startEdge.isEqual(edge));
        return edgeRing;
    };
    /**
     * Removes a node from the Graph.
     *
     * It also removes edges asociated to that node
     * @param {Node} node - Node to be removed
     */
    Graph.prototype.removeNode = function (node) {
        var _this = this;
        node.getOuterEdges().forEach(function (edge) { return _this.removeEdge(edge); });
        node.innerEdges.forEach(function (edge) { return _this.removeEdge(edge); });
        delete this.nodes[node.id];
    };
    /**
     * Remove edge from the graph and deletes the edge.
     *
     * @param {Edge} edge - Edge to be removed
     */
    Graph.prototype.removeEdge = function (edge) {
        this.edges = this.edges.filter(function (e) { return !e.isEqual(edge); });
        edge.deleteEdge();
    };
    return Graph;
}());
export default Graph;
