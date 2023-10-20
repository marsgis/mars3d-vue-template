import { feature, featureCollection, } from "@turf/helpers";
import { featureEach } from "@turf/meta";
/**
 * Combines a {@link FeatureCollection} of {@link Point}, {@link LineString}, or {@link Polygon} features
 * into {@link MultiPoint}, {@link MultiLineString}, or {@link MultiPolygon} features.
 *
 * @name combine
 * @param {FeatureCollection<Point|LineString|Polygon>} fc a FeatureCollection of any type
 * @returns {FeatureCollection<MultiPoint|MultiLineString|MultiPolygon>} a FeatureCollection of corresponding type to input
 * @example
 * var fc = turf.featureCollection([
 *   turf.point([19.026432, 47.49134]),
 *   turf.point([19.074497, 47.509548])
 * ]);
 *
 * var combined = turf.combine(fc);
 *
 * //addToMap
 * var addToMap = [combined]
 */
function combine(fc) {
    var groups = {
        MultiPoint: {
            coordinates: [],
            properties: [],
        },
        MultiLineString: {
            coordinates: [],
            properties: [],
        },
        MultiPolygon: {
            coordinates: [],
            properties: [],
        },
    };
    featureEach(fc, function (feature) {
        var _a, _b, _c;
        var _d;
        switch ((_d = feature.geometry) === null || _d === void 0 ? void 0 : _d.type) {
            case "Point":
                groups.MultiPoint.coordinates.push(feature.geometry.coordinates);
                groups.MultiPoint.properties.push(feature.properties);
                break;
            case "MultiPoint":
                (_a = groups.MultiPoint.coordinates).push.apply(_a, feature.geometry.coordinates);
                groups.MultiPoint.properties.push(feature.properties);
                break;
            case "LineString":
                groups.MultiLineString.coordinates.push(feature.geometry.coordinates);
                groups.MultiLineString.properties.push(feature.properties);
                break;
            case "MultiLineString":
                (_b = groups.MultiLineString.coordinates).push.apply(_b, feature.geometry.coordinates);
                groups.MultiLineString.properties.push(feature.properties);
                break;
            case "Polygon":
                groups.MultiPolygon.coordinates.push(feature.geometry.coordinates);
                groups.MultiPolygon.properties.push(feature.properties);
                break;
            case "MultiPolygon":
                (_c = groups.MultiPolygon.coordinates).push.apply(_c, feature.geometry.coordinates);
                groups.MultiPolygon.properties.push(feature.properties);
                break;
            default:
                break;
        }
    });
    return featureCollection(Object.keys(groups)
        .filter(function (key) {
        return groups[key].coordinates.length;
    })
        .sort()
        .map(function (key) {
        var geometry = { type: key, coordinates: groups[key].coordinates };
        var properties = { collectedProperties: groups[key].properties };
        return feature(geometry, properties);
    }));
}
export default combine;
