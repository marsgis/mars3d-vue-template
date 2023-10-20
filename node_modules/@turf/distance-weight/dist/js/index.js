"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var centroid_1 = __importDefault(require("@turf/centroid"));
var invariant_1 = require("@turf/invariant");
var meta_1 = require("@turf/meta");
/**
 * calcualte the Minkowski p-norm distance between two features.
 * @param feature1 point feature
 * @param feature2 point feature
 * @param p p-norm 1=<p<=infinity 1: Manhattan distance 2: Euclidean distance
 */
function pNormDistance(feature1, feature2, p) {
    if (p === void 0) { p = 2; }
    var coordinate1 = invariant_1.getCoord(feature1);
    var coordinate2 = invariant_1.getCoord(feature2);
    var xDiff = coordinate1[0] - coordinate2[0];
    var yDiff = coordinate1[1] - coordinate2[1];
    if (p === 1) {
        return Math.abs(xDiff) + Math.abs(yDiff);
    }
    return Math.pow(Math.pow(xDiff, p) + Math.pow(yDiff, p), 1 / p);
}
exports.pNormDistance = pNormDistance;
/**
 *
 *
 * @name distanceWeight
 * @param {FeatureCollection<any>} fc FeatureCollection.
 * @param {Object} [options] option object.
 * @param {number} [options.threshold=10000] If the distance between neighbor and
 * target features is greater than threshold, the weight of that neighbor is 0.
 * @param {number} [options.p=2] Minkowski p-norm distance parameter.
 * 1: Manhattan distance. 2: Euclidean distance. 1=<p<=infinity.
 * @param {boolean} [options.binary=false] If true, weight=1 if d <= threshold otherwise weight=0.
 *  If false, weight=Math.pow(d, alpha).
 * @param {number} [options.alpha=-1] distance decay parameter.
 * A big value means the weight decay quickly as distance increases.
 * @param {boolean} [options.standardization=false] row standardization.
 * @returns {Array<Array<number>>} distance weight matrix.
 * @example
 *
 * var bbox = [-65, 40, -63, 42];
 * var dataset = turf.randomPoint(100, { bbox: bbox });
 * var result = turf.distanceWeight(dataset);
 */
function distanceWeight(fc, options) {
    options = options || {};
    var threshold = options.threshold || 10000;
    var p = options.p || 2;
    var binary = options.binary || false;
    var alpha = options.alpha || -1;
    var rowTransform = options.standardization || false;
    var features = [];
    meta_1.featureEach(fc, function (feature) {
        features.push(centroid_1.default(feature));
    });
    // computing the distance between the features
    var weights = [];
    for (var i = 0; i < features.length; i++) {
        weights[i] = [];
    }
    for (var i = 0; i < features.length; i++) {
        for (var j = i; j < features.length; j++) {
            if (i === j) {
                weights[i][j] = 0;
            }
            var dis = pNormDistance(features[i], features[j], p);
            weights[i][j] = dis;
            weights[j][i] = dis;
        }
    }
    // binary or distance decay
    for (var i = 0; i < features.length; i++) {
        for (var j = 0; j < features.length; j++) {
            var dis = weights[i][j];
            if (dis === 0) {
                continue;
            }
            if (binary) {
                if (dis <= threshold) {
                    weights[i][j] = 1.0;
                }
                else {
                    weights[i][j] = 0.0;
                }
            }
            else {
                if (dis <= threshold) {
                    weights[i][j] = Math.pow(dis, alpha);
                }
                else {
                    weights[i][j] = 0.0;
                }
            }
        }
    }
    if (rowTransform) {
        for (var i = 0; i < features.length; i++) {
            var rowSum = weights[i].reduce(function (sum, currentVal) {
                return sum + currentVal;
            }, 0);
            for (var j = 0; j < features.length; j++) {
                weights[i][j] = weights[i][j] / rowSum;
            }
        }
    }
    return weights;
}
exports.default = distanceWeight;
