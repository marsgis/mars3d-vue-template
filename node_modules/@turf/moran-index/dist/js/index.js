"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var distance_weight_1 = __importDefault(require("@turf/distance-weight"));
var meta_1 = require("@turf/meta");
/**
 * Moran's I measures patterns of attribute values associated with features.
 * The method reveal whether similar values tend to occur near each other,
 * or whether high or low values are interspersed.
 *
 * Moran's I > 0 means a clusterd pattern.
 * Moran's I < 0 means a dispersed pattern.
 * Moran's I = 0 means a random pattern.
 *
 * In order to test the significance of the result. The z score is calculated.
 * A positive enough z-score (ex. >1.96) indicates clustering,
 * while a negative enough z-score (ex. <-1.96) indicates a dispersed pattern.
 *
 * the z-score can be calculated based on a normal or random assumption.
 *
 * **Bibliography***
 *
 * 1. [Moran's I](https://en.wikipedia.org/wiki/Moran%27s_I)
 *
 * 2. [pysal](http://pysal.readthedocs.io/en/latest/index.html)
 *
 * 3. Andy Mitchell, The ESRI Guide to GIS Analysis Volume 2: Spatial Measurements & Statistics.
 *
 * @name moranIndex
 * @param {FeatureCollection<any>} fc
 * @param {Object} options
 * @param {string} options.inputField the property name, must contain numeric values
 * @param {number} [options.threshold=100000] the distance threshold
 * @param {number} [options.p=2] the Minkowski p-norm distance parameter
 * @param {boolean} [options.binary=false] whether transfrom the distance to binary
 * @param {number} [options.alpha=-1] the distance decay parameter
 * @param {boolean} [options.standardization=true] wheter row standardization the distance
 * @returns {MoranIndex}
 * @example
 *
 * const bbox = [-65, 40, -63, 42];
 * const dataset = turf.randomPoint(100, { bbox: bbox });
 *
 * const result = turf.moranIndex(dataset, {
 *   inputField: 'CRIME',
 * });
 */
function default_1(fc, options) {
    var inputField = options.inputField;
    var threshold = options.threshold || 100000;
    var p = options.p || 2;
    var binary = options.binary || false;
    var alpha = options.alpha || -1;
    var standardization = options.standardization || true;
    var weight = distance_weight_1.default(fc, {
        alpha: alpha,
        binary: binary,
        p: p,
        standardization: standardization,
        threshold: threshold,
    });
    var y = [];
    meta_1.featureEach(fc, function (feature) {
        var feaProperties = feature.properties || {};
        // validate inputField exists
        y.push(feaProperties[inputField]);
    });
    var yMean = mean(y);
    var yVar = variance(y);
    var weightSum = 0;
    var s0 = 0;
    var s1 = 0;
    var s2 = 0;
    var n = weight.length;
    // validate y.length is the same as weight.length
    for (var i = 0; i < n; i++) {
        var subS2 = 0;
        for (var j = 0; j < n; j++) {
            weightSum += weight[i][j] * (y[i] - yMean) * (y[j] - yMean);
            s0 += weight[i][j];
            s1 += Math.pow(weight[i][j] + weight[j][i], 2);
            subS2 += weight[i][j] + weight[j][i];
        }
        s2 += Math.pow(subS2, 2);
    }
    s1 = 0.5 * s1;
    var moranIndex = weightSum / s0 / yVar;
    var expectedMoranIndex = -1 / (n - 1);
    var vNum = n * n * s1 - n * s2 + 3 * (s0 * s0);
    var vDen = (n - 1) * (n + 1) * (s0 * s0);
    var vNorm = vNum / vDen - expectedMoranIndex * expectedMoranIndex;
    var stdNorm = Math.sqrt(vNorm);
    var zNorm = (moranIndex - expectedMoranIndex) / stdNorm;
    return {
        expectedMoranIndex: expectedMoranIndex,
        moranIndex: moranIndex,
        stdNorm: stdNorm,
        zNorm: zNorm,
    };
}
exports.default = default_1;
/**
 * get mean of a list
 * @param {number[]} y
 * @returns {number}
 *
 */
function mean(y) {
    var sum = 0;
    for (var _i = 0, y_1 = y; _i < y_1.length; _i++) {
        var item = y_1[_i];
        sum += item;
    }
    return sum / y.length;
}
/**
 * get variance of a list
 * @param {number[]} y
 * @returns {number}
 *
 */
function variance(y) {
    var yMean = mean(y);
    var sum = 0;
    for (var _i = 0, y_2 = y; _i < y_2.length; _i++) {
        var item = y_2[_i];
        sum += Math.pow(item - yMean, 2);
    }
    return sum / y.length;
}
/**
 * @typedef {Object} MoranIndex
 * @property {number} moranIndex the moran's Index of the observed feature set
 * @property {number} expectedMoranIndex the moran's Index of the random distribution
 * @property {number} stdNorm the standard devitaion of the random distribution
 * @property {number} zNorm the z-score of the observe samples with regard to the random distribution
 */
