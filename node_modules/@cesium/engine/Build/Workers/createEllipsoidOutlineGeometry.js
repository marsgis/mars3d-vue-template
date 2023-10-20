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
  EllipsoidOutlineGeometry_default
} from "./chunk-4AJR66C5.js";
import "./chunk-UMLTOPAE.js";
import "./chunk-CROU4RHL.js";
import "./chunk-YLMDWSXO.js";
import "./chunk-HV67ARO7.js";
import "./chunk-V5S5N2IS.js";
import "./chunk-ULLMQNFQ.js";
import "./chunk-MYDS6HBL.js";
import "./chunk-CTJCECTX.js";
import "./chunk-HIDSEUWS.js";
import "./chunk-4HN3N5SE.js";
import "./chunk-TXYJOVQK.js";
import "./chunk-2ZI7FZ3Q.js";
import "./chunk-GPO47TW4.js";
import "./chunk-6EHT6GS3.js";
import {
  defined_default
} from "./chunk-TXOGSFHZ.js";

// packages/engine/Source/Workers/createEllipsoidOutlineGeometry.js
function createEllipsoidOutlineGeometry(ellipsoidGeometry, offset) {
  if (defined_default(ellipsoidGeometry.buffer, offset)) {
    ellipsoidGeometry = EllipsoidOutlineGeometry_default.unpack(
      ellipsoidGeometry,
      offset
    );
  }
  return EllipsoidOutlineGeometry_default.createGeometry(ellipsoidGeometry);
}
var createEllipsoidOutlineGeometry_default = createEllipsoidOutlineGeometry;
export {
  createEllipsoidOutlineGeometry_default as default
};
