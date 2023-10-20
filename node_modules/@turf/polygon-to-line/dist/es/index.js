import { featureCollection, lineString, multiLineString } from "@turf/helpers";
import { getGeom } from "@turf/invariant";
/**
 * Converts a {@link Polygon} to {@link LineString|(Multi)LineString} or {@link MultiPolygon} to a
 * {@link FeatureCollection} of {@link LineString|(Multi)LineString}.
 *
 * @name polygonToLine
 * @param {Feature<Polygon|MultiPolygon>} poly Feature to convert
 * @param {Object} [options={}] Optional parameters
 * @param {Object} [options.properties={}] translates GeoJSON properties to Feature
 * @returns {FeatureCollection|Feature<LineString|MultiLinestring>} converted (Multi)Polygon to (Multi)LineString
 * @example
 * var poly = turf.polygon([[[125, -30], [145, -30], [145, -20], [125, -20], [125, -30]]]);
 *
 * var line = turf.polygonToLine(poly);
 *
 * //addToMap
 * var addToMap = [line];
 */
export default function (poly, options) {
    if (options === void 0) { options = {}; }
    var geom = getGeom(poly);
    if (!options.properties && poly.type === "Feature") {
        options.properties = poly.properties;
    }
    switch (geom.type) {
        case "Polygon":
            return polygonToLine(geom, options);
        case "MultiPolygon":
            return multiPolygonToLine(geom, options);
        default:
            throw new Error("invalid poly");
    }
}
/**
 * @private
 */
export function polygonToLine(poly, options) {
    if (options === void 0) { options = {}; }
    var geom = getGeom(poly);
    var coords = geom.coordinates;
    var properties = options.properties
        ? options.properties
        : poly.type === "Feature"
            ? poly.properties
            : {};
    return coordsToLine(coords, properties);
}
/**
 * @private
 */
export function multiPolygonToLine(multiPoly, options) {
    if (options === void 0) { options = {}; }
    var geom = getGeom(multiPoly);
    var coords = geom.coordinates;
    var properties = options.properties
        ? options.properties
        : multiPoly.type === "Feature"
            ? multiPoly.properties
            : {};
    var lines = [];
    coords.forEach(function (coord) {
        lines.push(coordsToLine(coord, properties));
    });
    return featureCollection(lines);
}
/**
 * @private
 */
export function coordsToLine(coords, properties) {
    if (coords.length > 1) {
        return multiLineString(coords, properties);
    }
    return lineString(coords[0], properties);
}
