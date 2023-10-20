/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.110
 *
 * Copyright 2011-2022 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/CesiumGS/cesium/blob/main/LICENSE.md for full licensing details.
 */

import {
  EllipseGeometry_default
} from "./chunk-H5Q2JKIA.js";
import "./chunk-OCIX2CQ7.js";
import "./chunk-EHJQEARC.js";
import "./chunk-P32XMW4I.js";
import "./chunk-QUCJGBCK.js";
import "./chunk-4QGPYV3W.js";
import "./chunk-UMLTOPAE.js";
import "./chunk-MRCFDEKH.js";
import "./chunk-UFIT5XDI.js";
import "./chunk-6I22NWKQ.js";
import "./chunk-CROU4RHL.js";
import "./chunk-YLMDWSXO.js";
import "./chunk-HV67ARO7.js";
import "./chunk-V5S5N2IS.js";
import "./chunk-ULLMQNFQ.js";
import "./chunk-MYDS6HBL.js";
import "./chunk-CTJCECTX.js";
import {
  Cartesian3_default,
  Ellipsoid_default
} from "./chunk-HIDSEUWS.js";
import "./chunk-4HN3N5SE.js";
import "./chunk-TXYJOVQK.js";
import "./chunk-2ZI7FZ3Q.js";
import "./chunk-GPO47TW4.js";
import "./chunk-6EHT6GS3.js";
import {
  defined_default
} from "./chunk-TXOGSFHZ.js";

// packages/engine/Source/Workers/createEllipseGeometry.js
function createEllipseGeometry(ellipseGeometry, offset) {
  if (defined_default(offset)) {
    ellipseGeometry = EllipseGeometry_default.unpack(ellipseGeometry, offset);
  }
  ellipseGeometry._center = Cartesian3_default.clone(ellipseGeometry._center);
  ellipseGeometry._ellipsoid = Ellipsoid_default.clone(ellipseGeometry._ellipsoid);
  return EllipseGeometry_default.createGeometry(ellipseGeometry);
}
var createEllipseGeometry_default = createEllipseGeometry;
export {
  createEllipseGeometry_default as default
};
