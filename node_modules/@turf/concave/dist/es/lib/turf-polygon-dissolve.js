import clone from "@turf/clone";
import { geometryCollection } from "@turf/helpers";
import { getType } from "@turf/invariant";
import { flattenEach } from "@turf/meta";
import { merge } from "topojson-client";
import { topology } from "topojson-server";
/**
 * Dissolves all overlapping (Multi)Polygon
 *
 * @param {FeatureCollection<Polygon|MultiPolygon>} geojson Polygons to dissolve
 * @param {Object} [options={}] Optional parameters
 * @param {boolean} [options.mutate=false] Prevent input mutation
 * @returns {Feature<Polygon|MultiPolygon>} Dissolved Polygons
 */
export default function polygonDissolve(geojson, options) {
    if (options === void 0) { options = {}; }
    // Validation
    if (getType(geojson) !== "FeatureCollection") {
        throw new Error("geojson must be a FeatureCollection");
    }
    if (!geojson.features.length) {
        throw new Error("geojson is empty");
    }
    // Clone geojson to avoid side effects
    // Topojson modifies in place, so we need to deep clone first
    if (options.mutate === false || options.mutate === undefined) {
        geojson = clone(geojson);
    }
    var geoms = [];
    flattenEach(geojson, function (feature) {
        geoms.push(feature.geometry);
    });
    var topo = topology({ geoms: geometryCollection(geoms).geometry });
    var merged = merge(topo, topo.objects.geoms.geometries);
    return merged;
}
