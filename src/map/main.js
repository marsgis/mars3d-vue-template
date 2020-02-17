import * as Cesium from "cesium/Cesium";
import mars3d from "./mars3d/mars3d";

//汉化原生cesium
import {loadCesiumZH} from "./plugins/class/cesium-zh";

//导航球插件
import "./plugins/navigation/mars3d-navigation.css";
import  "./plugins/navigation/mars3d-navigation";


//地图创建  
export function createMap(id, config) {
  var viewer = mars3d.createMap({
    id: id,
    data: config.map3d,
    serverURL: config.serverURL,
  });

  //汉化
  loadCesiumZH();
  
  initWork(viewer);

  return viewer;
}

//当前页面业务相关
function initWork(viewer) {



}