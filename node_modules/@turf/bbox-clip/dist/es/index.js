import { lineString, multiLineString, multiPolygon, polygon, } from "@turf/helpers";
import { getGeom } from "@turf/invariant";
import { lineclip, polygonclip } from "./lib/lineclip.js";
/**
 * Takes a {@link Feature} and a bbox and clips the feature to the bbox using
 * [lineclip](https://github.com/mapbox/lineclip).
 * May result in degenerate edges when clipping Polygons.
 *
 * @name bboxClip
 * @param {Feature<LineString|MultiLineString|Polygon|MultiPolygon>} feature feature to clip to the bbox
 * @param {BBox} bbox extent in [minX, minY, maxX, maxY] order
 * @returns {Feature<LineString|MultiLineString|Polygon|MultiPolygon>} clipped Feature
 * @example
 * var bbox = [0, 0, 10, 10];
 * var poly = turf.polygon([[[2, 2], [8, 4], [12, 8], [3, 7], [2, 2]]]);
 *
 * var clipped = turf.bboxClip(poly, bbox);
 *
 * //addToMap
 * var addToMap = [bbox, poly, clipped]
 */
export default function bboxClip(feature, bbox) {
    var geom = getGeom(feature);
    var type = geom.type;
    var properties = feature.type === "Feature" ? feature.properties : {};
    var coords = geom.coordinates;
    switch (type) {
        case "LineString":
        case "MultiLineString": {
            var lines_1 = [];
            if (type === "LineString") {
                coords = [coords];
            }
            coords.forEach(function (line) {
                lineclip(line, bbox, lines_1);
            });
            if (lines_1.length === 1) {
                return lineString(lines_1[0], properties);
            }
            return multiLineString(lines_1, properties);
        }
        case "Polygon":
            return polygon(clipPolygon(coords, bbox), properties);
        case "MultiPolygon":
            return multiPolygon(coords.map(function (poly) {
                return clipPolygon(poly, bbox);
            }), properties);
        default:
            throw new Error("geometry " + type + " not supported");
    }
}
function clipPolygon(rings, bbox) {
    var outRings = [];
    for (var _i = 0, rings_1 = rings; _i < rings_1.length; _i++) {
        var ring = rings_1[_i];
        var clipped = polygonclip(ring, bbox);
        if (clipped.length > 0) {
            if (clipped[0][0] !== clipped[clipped.length - 1][0] ||
                clipped[0][1] !== clipped[clipped.length - 1][1]) {
                clipped.push(clipped[0]);
            }
            if (clipped.length >= 4) {
                outRings.push(clipped);
            }
        }
    }
    return outRings;
}
