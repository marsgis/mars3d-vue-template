import "mars3d-cesium/Build/Cesium/Widgets/widgets.css";
import "mars3d/mars3d.css";
import "./style.css";

import * as mars3d from "mars3d";
// import * as Cesium from "mars3d-cesium"; 
// window.Cesium = Cesium; //only for test

// 获取配置
mars3d.Util.fetchJson({ url: "/config/config.json" }).then((data) => {
  initMars3d(data.map3d);
});

function initMars3d(options) {
  // 创建三维地球场景
  const map = new mars3d.Map("mars3dContainer", options);

  // 打印测试信息
  console.log("mars3d的Map主对象构造完成", map);
  console.log("其中Cesium原生的Cesium.Viewer为", map.viewer);
}
