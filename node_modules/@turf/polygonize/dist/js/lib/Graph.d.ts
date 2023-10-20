import Node from "./Node";
import Edge from "./Edge";
import EdgeRing from "./EdgeRing";
import { FeatureCollection, LineString, MultiLineString, Feature } from "@turf/helpers";
/**
 * Represents a planar graph of edges and nodes that can be used to compute a polygonization.
 *
 * Although, this class is inspired by GEOS's `geos::operation::polygonize::PolygonizeGraph`,
 * it isn't a rewrite. As regards algorithm, this class implements the same logic, but it
 * isn't a javascript transcription of the C++ source.
 *
 * This graph is directed (both directions are created)
 */
export default class Graph {
    private nodes;
    private edges;
    /**
     * Creates a graph from a GeoJSON.
     *
     * @param {FeatureCollection<LineString>} geoJson - it must comply with the restrictions detailed in the index
     * @returns {Graph} - The newly created graph
     * @throws {Error} if geoJson is invalid.
     */
    static fromGeoJson(geoJson: FeatureCollection<LineString | MultiLineString> | LineString | MultiLineString | Feature<LineString | MultiLineString>): Graph;
    /**
     * Creates or get a Node.
     *
     * @param {number[]} coordinates - Coordinates of the node
     * @returns {Node} - The created or stored node
     */
    getNode(coordinates: number[]): Node;
    /**
     * Adds an Edge and its symetricall.
     *
     * Edges are added symetrically, i.e.: we also add its symetric
     *
     * @param {Node} from - Node which starts the Edge
     * @param {Node} to - Node which ends the Edge
     */
    addEdge(from: Node, to: Node): void;
    constructor();
    /**
     * Removes Dangle Nodes (nodes with grade 1).
     */
    deleteDangles(): void;
    /**
     * Check if node is dangle, if so, remove it.
     *
     * It calls itself recursively, removing a dangling node might cause another dangling node
     *
     * @param {Node} node - Node to check if it's a dangle
     */
    _removeIfDangle(node: Node): void;
    /**
     * Delete cut-edges (bridge edges).
     *
     * The graph will be traversed, all the edges will be labeled according the ring
     * in which they are. (The label is a number incremented by 1). Edges with the same
     * label are cut-edges.
     */
    deleteCutEdges(): void;
    /**
     * Set the `next` property of each Edge.
     *
     * The graph will be transversed in a CW form, so, we set the next of the symetrical edge as the previous one.
     * OuterEdges are sorted CCW.
     *
     * @param {Node} [node] - If no node is passed, the function calls itself for every node in the Graph
     */
    _computeNextCWEdges(node?: Node): void;
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
    _computeNextCCWEdges(node: Node, label: number): void;
    /**
     * Finds rings and labels edges according to which rings are.
     *
     * The label is a number which is increased for each ring.
     *
     * @returns {Edge[]} edges that start rings
     */
    _findLabeledEdgeRings(): Edge[];
    /**
     * Computes the EdgeRings formed by the edges in this graph.
     *
     * @returns {EdgeRing[]} - A list of all the EdgeRings in the graph.
     */
    getEdgeRings(): EdgeRing[];
    /**
     * Find all nodes in a Maxima EdgeRing which are self-intersection nodes.
     *
     * @param {Node} startEdge - Start Edge of the Ring
     * @returns {Node[]} - intersection nodes
     */
    _findIntersectionNodes(startEdge: Edge): Node[];
    /**
     * Get the edge-ring which starts from the provided Edge.
     *
     * @param {Edge} startEdge - starting edge of the edge ring
     * @returns {EdgeRing} - EdgeRing which start Edge is the provided one.
     */
    _findEdgeRing(startEdge: Edge): EdgeRing;
    /**
     * Removes a node from the Graph.
     *
     * It also removes edges asociated to that node
     * @param {Node} node - Node to be removed
     */
    removeNode(node: Node): void;
    /**
     * Remove edge from the graph and deletes the edge.
     *
     * @param {Edge} edge - Edge to be removed
     */
    removeEdge(edge: Edge): void;
}
