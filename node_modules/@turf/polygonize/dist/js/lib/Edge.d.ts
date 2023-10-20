import Node from "./Node";
import EdgeRing from "./EdgeRing";
/**
 * This class is inspired by GEOS's geos::operation::polygonize::PolygonizeDirectedEdge
 */
export default class Edge {
    label?: number;
    symetric?: Edge;
    from: Node;
    to: Node;
    next?: Edge;
    ring?: EdgeRing;
    /**
     * Creates or get the symetric Edge.
     *
     * @returns {Edge} - Symetric Edge.
     */
    getSymetric(): Edge;
    /**
     * @param {Node} from - start node of the Edge
     * @param {Node} to - end node of the edge
     */
    constructor(from: Node, to: Node);
    /**
     * Removes edge from from and to nodes.
     */
    deleteEdge(): void;
    /**
     * Compares Edge equallity.
     *
     * An edge is equal to another, if the from and to nodes are the same.
     *
     * @param {Edge} edge - Another Edge
     * @returns {boolean} - True if Edges are equal, False otherwise
     */
    isEqual(edge: Edge): boolean;
    toString(): string;
    /**
     * Returns a LineString representation of the Edge
     *
     * @returns {Feature<LineString>} - LineString representation of the Edge
     */
    toLineString(): import("@turf/helpers").Feature<import("@turf/helpers").LineString, import("@turf/helpers").Properties>;
    /**
     * Comparator of two edges.
     *
     * Implementation of geos::planargraph::DirectedEdge::compareTo.
     *
     * @param {Edge} edge - Another edge to compare with this one
     * @returns {number} -1 if this Edge has a greater angle with the positive x-axis than b,
     *          0 if the Edges are colinear,
     *          1 otherwise
     */
    compareTo(edge: Edge): number;
}
