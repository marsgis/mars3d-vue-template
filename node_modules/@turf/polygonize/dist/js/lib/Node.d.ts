import Edge from "./Edge";
/**
 * Node
 */
export default class Node {
    static buildId(coordinates: number[]): string;
    id: string;
    coordinates: number[];
    innerEdges: Edge[];
    private outerEdges;
    private outerEdgesSorted;
    constructor(coordinates: number[]);
    removeInnerEdge(edge: Edge): void;
    removeOuterEdge(edge: Edge): void;
    /**
     * Outer edges are stored CCW order.
     *
     * @memberof Node
     * @param {Edge} edge - Edge to add as an outerEdge.
     */
    addOuterEdge(edge: Edge): void;
    /**
     * Sorts outer edges in CCW way.
     *
     * @memberof Node
     * @private
     */
    sortOuterEdges(): void;
    /**
     * Retrieves outer edges.
     *
     * They are sorted if they aren't in the CCW order.
     *
     * @memberof Node
     * @returns {Edge[]} - List of outer edges sorted in a CCW order.
     */
    getOuterEdges(): Edge[];
    getOuterEdge(i: number): Edge;
    addInnerEdge(edge: Edge): void;
}
