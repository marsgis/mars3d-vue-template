import { Polygon, Feature, Point } from "@turf/helpers";
import Edge from "./Edge";
/**
 * Ring of edges which form a polygon.
 *
 * The ring may be either an outer shell or a hole.
 *
 * This class is inspired in GEOS's geos::operation::polygonize::EdgeRing
 */
export default class EdgeRing {
    private edges;
    private polygon?;
    private envelope?;
    constructor();
    /**
     * Add an edge to the ring, inserting it in the last position.
     *
     * @memberof EdgeRing
     * @param {Edge} edge - Edge to be inserted
     */
    push(edge: Edge): void;
    /**
     * Get Edge.
     *
     * @memberof EdgeRing
     * @param {number} i - Index
     * @returns {Edge} - Edge in the i position
     */
    get(i: number): Edge;
    /**
     * Getter of length property.
     *
     * @memberof EdgeRing
     * @returns {number} - Length of the edge ring.
     */
    get length(): number;
    /**
     * Similar to Array.prototype.forEach for the list of Edges in the EdgeRing.
     *
     * @memberof EdgeRing
     * @param {Function} f - The same function to be passed to Array.prototype.forEach
     */
    forEach(f: (edge: Edge, index: number, array: Edge[]) => void): void;
    /**
     * Similar to Array.prototype.map for the list of Edges in the EdgeRing.
     *
     * @memberof EdgeRing
     * @param {Function} f - The same function to be passed to Array.prototype.map
     * @returns {Array} - The mapped values in the function
     */
    map<T>(f: (edge: Edge, index: number, array: Edge[]) => T): T[];
    /**
     * Similar to Array.prototype.some for the list of Edges in the EdgeRing.
     *
     * @memberof EdgeRing
     * @param {Function} f - The same function to be passed to Array.prototype.some
     * @returns {boolean} - True if an Edge check the condition
     */
    some(f: (edge: Edge, index: number, array: Edge[]) => boolean): boolean;
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
    isValid(): boolean;
    /**
     * Tests whether this ring is a hole.
     *
     * A ring is a hole if it is oriented counter-clockwise.
     * Similar implementation of geos::algorithm::CGAlgorithms::isCCW
     *
     * @memberof EdgeRing
     * @returns {boolean} - true: if it is a hole
     */
    isHole(): boolean;
    /**
     * Creates a MultiPoint representing the EdgeRing (discarts edges directions).
     *
     * @memberof EdgeRing
     * @returns {Feature<MultiPoint>} - Multipoint representation of the EdgeRing
     */
    toMultiPoint(): Feature<import("@turf/helpers").MultiPoint, import("@turf/helpers").Properties>;
    /**
     * Creates a Polygon representing the EdgeRing.
     *
     * @memberof EdgeRing
     * @returns {Feature<Polygon>} - Polygon representation of the Edge Ring
     */
    toPolygon(): Feature<Polygon, {
        [name: string]: any;
    }>;
    /**
     * Calculates the envelope of the EdgeRing.
     *
     * @memberof EdgeRing
     * @returns {Feature<Polygon>} - envelope
     */
    getEnvelope(): Feature<Polygon, {
        [name: string]: any;
    }>;
    /**
     * `geos::operation::polygonize::EdgeRing::findEdgeRingContaining`
     *
     * @param {EdgeRing} testEdgeRing - EdgeRing to look in the list
     * @param {EdgeRing[]} shellList - List of EdgeRing in which to search
     *
     * @returns {EdgeRing} - EdgeRing which contains the testEdgeRing
     */
    static findEdgeRingContaining(testEdgeRing: EdgeRing, shellList: EdgeRing[]): EdgeRing | undefined;
    /**
     * Checks if the point is inside the edgeRing
     *
     * @param {Feature<Point>} pt - Point to check if it is inside the edgeRing
     * @returns {boolean} - True if it is inside, False otherwise
     */
    inside(pt: Feature<Point>): boolean;
}
