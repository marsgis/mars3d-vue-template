<template>
  <div :id="withKeyId" class="mars3d-container"></div>
</template>
<script setup>
import { computed, onBeforeUnmount, onMounted } from "vue"
import { isPc } from "@/utils/index"

import "mars3d/dist/mars3d.css"
import * as mars3d from "mars3d"

// props选项
const props = defineProps({
  url: {
    type: String,
    default: ""
  },
  mapKey: {
    type: String,
    default: "default"
  },
  options: {
    type: Object,
    default: () => ({})
  }
})

// 用于存放地球组件实例
let map = null

// 使用用户传入的 mapKey 拼接生成 withKeyId 作为当前显示容器的id
const withKeyId = computed(() => `mars3d-container-${props.mapKey}`)

onMounted(() => {
  // 获取配置
  mars3d.Resource.fetchJson({ url: props.url }).then((data) => {
    initMars3d({
      // 合并配置项
      ...data.map3d,
      ...props.options
    })
  })
})

// onload事件将在地图渲染后触发
const emit = defineEmits(["onload"])
const initMars3d = (option) => {
  map = new mars3d.Map(withKeyId.value, option)

  // //针对不同终端的优化配置
  if (isPc()) {
    // Cesium 1.61以后会默认关闭反走样，对于桌面端而言还是开启得好，
    map.scene.postProcessStages.fxaa.enabled = true

    map.zoomFactor = 2.0 // 鼠标滚轮放大的步长参数

    // IE浏览器优化
    if (window.navigator.userAgent.toLowerCase().indexOf("msie") >= 0) {
      map.viewer.targetFrameRate = 20 // 限制帧率
      map.scene.requestRenderMode = true // 取消实时渲染
    }
  } else {
    map.zoomFactor = 5.0 // 鼠标滚轮放大的步长参数
    map.scene.screenSpaceCameraController.enableTilt = false

    // 移动设备上禁掉以下几个选项，可以相对更加流畅
    map.scene.requestRenderMode = true // 取消实时渲染
    map.scene.fog.enabled = false
    map.scene.skyAtmosphere.show = false
    map.scene.globe.showGroundAtmosphere = false
  }

  // //二三维切换不用动画
  if (map.viewer.sceneModePicker) {
    map.viewer.sceneModePicker.viewModel.duration = 0.0
  }

  // webgl渲染失败后，刷新页面
  // map.on(mars3d.EventType.renderError, async () => {
  //   await $alert('程序内存消耗过大，请重启浏览器')
  //   window.location.reload()
  // })

  emit("onload", map)
}

// 组件卸载之前销毁mars3d实例
onBeforeUnmount(() => {
  if (map) {
    map.destroy()
  }
})
</script>

<style lang="less">
.mars3d-container {
  height: 100%;
  overflow: hidden;
}

/**cesium 工具按钮栏*/
.cesium-viewer-toolbar {
  top: auto !important;
  bottom: 35px !important;
  left: 12px !important;
  right: auto !important;
}
.cesium-toolbar-button img {
  height: 100%;
}
.cesium-viewer-toolbar > .cesium-toolbar-button,
.cesium-navigationHelpButton-wrapper,
.cesium-viewer-geocoderContainer {
  margin-bottom: 5px;
  float: left;
  clear: both;
  text-align: center;
}
.cesium-button {
  background-color: #3f4854;
  color: #e6e6e6;
  fill: #e6e6e6;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  line-height: 32px;
}

/**cesium 底图切换面板*/
.cesium-baseLayerPicker-dropDown {
  bottom: 0;
  left: 40px;
  max-height: 700px;
  margin-bottom: 5px;
}

/**cesium 帮助面板*/
.cesium-navigation-help {
  top: auto;
  bottom: 0;
  left: 40px;
  transform-origin: left bottom;
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
  background-color: #3f4854;
}
.cesium-viewer-geocoderContainer .cesium-geocoder-input {
  background-color: rgba(63, 72, 84, 0.7);
}
.cesium-viewer-geocoderContainer .cesium-geocoder-input:focus {
  background-color: rgba(63, 72, 84, 0.9);
}
.cesium-viewer-geocoderContainer .search-results {
  background-color: #3f4854;
}

/**cesium info信息框*/
.cesium-infoBox {
  top: 50px;
  background: rgba(63, 72, 84, 0.9);
}
.cesium-infoBox-title {
  background-color: #3f4854;
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
  background-color: #3f4854;
}
</style>
