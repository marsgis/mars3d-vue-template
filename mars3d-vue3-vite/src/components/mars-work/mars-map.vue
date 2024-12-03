<!--
  地图渲染组件 (建议使用mars3d地图的地方都用该组件)
  @copyright 火星科技 mars3d.cn
  @author 木遥 2024-12-03
-->
<template>
  <div :id="withKeyId" class="mars3d-container"></div>
</template>
<script setup lang="ts">
import * as mars3d from "mars3d";
import "./expand/index"; // 引入插件或注册扩展js

import { computed, onUnmounted, onMounted, toRaw } from "vue";
// import { $alert, $message } from "@mars/components/mars-ui/index"

const props = withDefaults(
  defineProps<{
    mapKey?: string; // 多个地图时,可传入key区分地图
    url?: string; // 传入的地图构造参数url，可为空，只传options
    options?: any; // 传入的地图构造参数options，可覆盖url内的参数
  }>(),
  {
    mapKey: "default",
    url: undefined,
    options: undefined,
  }
);

// 用于存放地球组件实例
let map: mars3d.Map; // 地图对象

// 使用用户传入的 mapKey 拼接生成 withKeyId 作为当前显示容器的id
const withKeyId = computed(() => `mars3d-container-${props.mapKey}`);

// onload事件将在地图渲染后触发
const emit = defineEmits(["onload"]);

const initMars3d = async () => {
  // 获取配置
  let mapOptions;
  if (props.url) {
    // 存在url时才读取
    mapOptions = await mars3d.Util.fetchJson({ url: props.url });
    if (mapOptions.map3d) {
      mapOptions = mapOptions.map3d;
    }
    if (props.options) {
      mapOptions = mars3d.Util.merge(mapOptions, toRaw(props.options)); // 合并配置
    }
  } else if (props.options) {
    mapOptions = toRaw(props.options);
  }
  console.log("Map地图构造参数", mapOptions);

  map = new mars3d.Map(withKeyId.value, mapOptions);

  // 针对不同终端的优化配置
  if (mars3d.Util.isPCBroswer()) {
    map.zoomFactor = 2.0; // 鼠标滚轮放大的步长参数

    // IE浏览器优化
    if (window.navigator.userAgent.toLowerCase().indexOf("msie") >= 0) {
      map.viewer.targetFrameRate = 20; // 限制帧率
      map.scene.requestRenderMode = false; // 取消实时渲染
    }
  } else {
    map.zoomFactor = 5.0; // 鼠标滚轮放大的步长参数

    // 移动设备上禁掉以下几个选项，可以相对更加流畅
    map.scene.requestRenderMode = false; // 取消实时渲染
    map.scene.fog.enabled = false;
    map.scene.skyAtmosphere.show = false;
    map.scene.globe.showGroundAtmosphere = false;
  }

  // 二三维切换不用动画
  if (map.viewer.sceneModePicker) {
    map.viewer.sceneModePicker.viewModel.duration = 0.0;
  }

  // 绑定当前项目的默认右键菜单
  // map.bindContextMenu(getContextMenu())

  // webgl渲染失败后，刷新页面
  // map.on(mars3d.EventType.renderError, async () => {
  //   await $alert("程序内存消耗过大，请重启浏览器")
  //   window.location.reload()
  // })

  onMapLoad(); // map构造完成后的一些处理

  emit("onload", map);
};

// map构造完成后的一些处理，可以按需注释和选用
function onMapLoad() {
  // Mars3D地图内部使用，如右键菜单弹窗
  // @ts-ignore
  // window.globalAlert = $alert;
  // // @ts-ignore
  // window.globalMsg = $message;
}

onMounted(() => {
  initMars3d();
});
// 组件卸载之前销毁mars3d实例
onUnmounted(() => {
  if (map) {
    map.destroy();
    map = null;
  }
  console.log("map销毁完成", map);
});
</script>

<style lang="less">
/**cesium 工具按钮栏*/
.cesium-viewer-toolbar {
  top: auto !important;
  bottom: 35px !important;
  left: 12px !important;
  right: auto !important;
}

.cesium-toolbar-button img {
  width: 22px;
  height: 100%;
}
.cesium-toolbar-button:hover img {
  width: 28px;
}
.cesium-svgPath-svg {
  scale: 0.8;
}
.cesium-svgPath-svg:hover {
  scale: 1;
}
.cesium-button .cesium-baseLayerPicker-selected {
  width: 100%;
}

.cesium-button:hover .cesium-baseLayerPicker-selected {
  width: 100%;
}

.cesium-viewer-toolbar > .cesium-toolbar-button,
.cesium-navigationHelpButton-wrapper,
.cesium-viewer-geocoderContainer {
  margin-bottom: 5px;
  float: left;
  clear: both;
  text-align: center;
}

.cesium-viewer-geocoderContainer form .cesium-geocoder-input {
  border-width: 1px;
  border-image: url("//data.mars3d.cn/img/control/border.svg") 1 round stretch;
}

.cesium-button {
  background-color: rgba(39, 44, 54, 0.8);

  border-radius: 2px;
  border-width: 1px;
  border-image: url("//data.mars3d.cn/img/control/border.svg") 1 round stretch;

  color: #ffffff;
  fill: #e6e6e6;
  line-height: 38px;
}

.cesium-button:hover {
  background-color: rgba(51, 133, 255, 1);
  box-shadow: none;
  border: none;
}

/**cesium 底图切换面板*/
.cesium-baseLayerPicker-dropDown {
  bottom: 0;
  left: 40px;
  max-height: 700px;
  margin-bottom: 5px;
  background-color: rgba(23, 49, 71, 0.7);
}

/**cesium 帮助面板*/
.cesium-navigation-help {
  top: auto;
  bottom: 0;
  left: 40px;
  transform-origin: left bottom;
  background: none;
  background-color: rgba(23, 49, 71, 0.8);

  .cesium-navigation-help-instructions,
  .cesium-navigation-button {
    background: none;
  }

  .cesium-navigation-button-selected,
  .cesium-navigation-button-unselected:hover {
    background-color: rgba(1, 35, 22, 1);
  }
}

/**cesium 二维三维切换*/
.cesium-sceneModePicker-wrapper {
  width: auto;
}

.cesium-sceneModePicker-wrapper .cesium-sceneModePicker-dropDown-icon {
  float: right;
  margin: 0 3px;
}

/**cesium POI查询输入框*/
.cesium-viewer-geocoderContainer .search-results {
  left: 0;
  right: 40px;
  width: auto;
  z-index: 9999;
}

.cesium-geocoder-searchButton {
  width: 38px;
  height: 38px;
  background-color: rgba(39, 44, 54, 0.8);
  border-radius: 2px;
  border-width: 1px;
  border-image: url("//data.mars3d.cn/img/control/border.svg") 1 round stretch;
  fill: #e6e6e6;
}

.cesium-viewer-geocoderContainer .cesium-geocoder-input {
  height: 40px;
  width: 40px;
  background-color: rgba(63, 72, 84, 0.7);
}

.cesium-viewer-geocoderContainer .cesium-geocoder-input:focus {
  background-color: var(--mars-base-bg, rgba(63, 72, 84, 0.9));
}

.cesium-viewer-geocoderContainer .search-results {
  background-color: rgba(23, 49, 71, 0.8);
}

/**cesium info信息框*/
.cesium-infoBox {
  top: 50px;
  background: var(--mars-base-bg, rgba(63, 72, 84, 0.9));
}

.cesium-infoBox-title {
  background-color: rgba(23, 49, 71, 0.8);
}

/**cesium 任务栏的FPS信息*/
.cesium-performanceDisplay-defaultContainer {
  top: auto;
  bottom: 35px;
  right: 50px;
}

.cesium-performanceDisplay-ms,
.cesium-performanceDisplay-fps {
  color: #fff;
}

/**cesium tileset调试信息面板*/
.cesium-viewer-cesiumInspectorContainer {
  top: 10px;
  left: 10px;
  right: auto;
}

.cesium-cesiumInspector {
  background-color: var(--mars-base-bg, rgba(63, 72, 84, 0.9));
}

/**覆盖mars3d内部控件的颜色等样式*/
.mars3d-compass .mars3d-compass-outer {
  fill: rgba(39, 44, 54, 0.8);
}
.mars3d-compass .mars3d-compass-inner {
  background: rgba(39, 44, 54, 0.8);
  fill: #fff;
}

.mars3d-contextmenu-ul,
.mars3d-sub-menu {
  background-color: var(--mars-base-bg, rgba(63, 72, 84, 0.9));
}
.mars3d-contextmenu-ul {
  border-radius: 2px;
  border-width: 1px;
  border-image: url("//data.mars3d.cn/img/control/border.svg") 1 round stretch;
}

.mars3d-contextmenu-ul > li > a:hover,
.mars3d-sub-menu > li > a:hover,
.mars3d-contextmenu-ul > li > a:focus,
.mars3d-sub-menu > li > a:focus,
.mars3d-contextmenu-ul > li > .active,
.mars3d-sub-menu > li > .active {
  background-color: var(--mars-hover-color, #3ea6ff);
}

.mars3d-contextmenu-ul > .active > a,
.mars3d-sub-menu > .active > a,
.mars3d-contextmenu-ul > .active > a:hover,
.mars3d-sub-menu > .active > a:hover,
.mars3d-contextmenu-ul > .active > a:focus,
.mars3d-sub-menu > .active > a:focus {
  background-color: var(--mars-hover-color, #3ea6ff);
}

/* Popup样式*/
.mars3d-popup-color {
  color: var(--mars-text-color, #ffffff);
}

.mars3d-popup-background {
  // background: none会导致剖面的popup没有颜色
  background: var(--mars-base-bg, rgba(63, 72, 84, 0.9));
}

// .mars3d-popup-content-wrapper {
//   box-shadow: none !important;
//   padding: 0 !important;
//   background: var(--mars-base-border) !important;
//   border-radius: 4px;
// }

.mars3d-popup-content {
  margin: 15px;
}
.mars3d-popup-btn-custom {
  padding: 3px 10px;
  border: 1px solid #209ffd;
  background: #209ffd1c;
  color: var(--mars-text-color);
}

.mars3d-tooltip {
  color: var(--mars-text-color, #ffffff);
  background: var(--mars-base-bg, rgba(63, 72, 84, 0.9));
  border: 1px solid var(--mars-base-bg, rgba(63, 72, 84, 0.9));
}

.mars3d-tooltip-top:before {
  border-top-color: var(--mars-bg-base, rgba(23, 49, 71, 0.8));
}

.mars3d-tooltip-bottom:before {
  border-bottom-color: var(--mars-bg-base, rgba(23, 49, 71, 0.8));
}

.mars3d-tooltip-left:before {
  border-left-color: var(--mars-bg-base, rgba(23, 49, 71, 0.8));
}

.mars3d-tooltip-right:before {
  border-right-color: var(--mars-bg-base, rgba(23, 49, 71, 0.8));
}
.mars3d-template-content label {
  padding-right: 6px;
}

/* all 中的html样式 */
.mars3d-template-titile {
  height: 33px;
  line-height: 33px;
  padding-left: 10px;
  border-radius: 4px 4px 0px 0px;
  box-shadow: 0px 6px 12px -2px rgba(50, 50, 93, 0.15),
    0px 3px 7px -3px rgba(0, 0, 0, 0.2);
  color: var(--mars-control-text) !important;
  background: var(--mars-msg-title-bg);
  font-family: var(--mars-font-family);

  a {
    font-size: 16px;
    color: var(--mars-msg-title-color, #479be0);
    text-decoration: none;
  }
}

.mars3d-template-content {
  margin-top: 0 !important;
  background-color: var(--mars-dropdown-bg);
  padding: 10px;
  color: #eaf2ff;

  label {
    padding-right: 6px;
  }

  input {
    color: var(--mars-text-color);
    background-color: transparent !important;
    padding: 4px 5px;
  }

  input::placeholder {
    color: #cdcdcd !important;
  }

  textarea {
    color: var(--mars-base-color);
    background-color: transparent !important;
    padding: 4px 5px;
  }

  textarea::placeholder {
    color: #cdcdcd !important;
  }
}

.mars3d-popup-btn-custom {
  padding: 3px 10px;
  border: 1px solid #209ffd;
  background: #209ffd1c;
  color: var(--mars-text-color, #ffffff);
}

.mars3d-popup-content {
  margin: 15px;
}

.mars3d-divGraphic:hover {
  z-index: 999 !important;
}
</style>
