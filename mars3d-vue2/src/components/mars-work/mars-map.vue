<!--
  地图渲染组件 (建议使用mars3d地图的地方都用该组件)
  @copyright 火星科技 mars3d.cn
  @author 木遥 2024-12-03
-->
<template>
  <div :id="`mars3d-container${mapKey}`" class="mars3d-container"></div>
</template>

<script>
import Vue from 'vue'

//使用npm包
import 'mars3d/mars3d.css'
import * as mars3d from 'mars3d'
import './expand/index' // 引入插件或注册扩展js

//使用静态引入时
// let mars3d = window.mars3d

// 为了方便使用,绑定到原型链，在其他vue文件，直接 this.mars3d 来使用
Vue.prototype.mars3d = mars3d
Vue.prototype.Cesium = mars3d.Cesium

export default {
  name: 'mars3dViewer',

  props: {
    // 地图唯一性标识
    mapKey: {
      type: String,
      default: ''
    },
    // 初始化配置config.json的地址
    url: String,
    // 自定义参数
    options: Object
  },

  mounted() {
    this.initMars3d()
  },

  beforeDestroy() {
    const map = this[`map${this.mapKey}`]
    if (map) {
      map.destroy()
      delete this[`map${this.mapKey}`]
    }
    console.log('>>>>> 地图卸载完成 >>>>')
  },

  methods: {
    async initMars3d() {
      if (this[`map${this.mapKey}`]) {
        this[`map${this.mapKey}`].destroy()
      }

      // 获取配置
      let mapOptions
      if (this.url) {
        // 存在url时才读取
        mapOptions = await mars3d.Util.fetchJson({ url: this.url })
        if (mapOptions.map3d) {
          mapOptions = mapOptions.map3d
        }
        if (this.options) {
          mapOptions = mars3d.Util.merge(mapOptions, toRaw(this.options)) // 合并配置
        }
      } else if (props.options) {
        mapOptions = toRaw(props.options)
      }
      console.log('Map地图构造参数', mapOptions)

      // 创建三维地球场景
      var map = new mars3d.Map(`mars3d-container${this.mapKey}`, mapOptions)

      // 针对不同终端的优化配置
      if (mars3d.Util.isPCBroswer()) {
        map.zoomFactor = 2.0 // 鼠标滚轮放大的步长参数

        // IE浏览器优化
        if (window.navigator.userAgent.toLowerCase().indexOf('msie') >= 0) {
          map.viewer.targetFrameRate = 20 // 限制帧率
          map.scene.requestRenderMode = false // 取消实时渲染
        }
      } else {
        map.zoomFactor = 5.0 // 鼠标滚轮放大的步长参数

        // 移动设备上禁掉以下几个选项，可以相对更加流畅
        map.scene.requestRenderMode = false // 取消实时渲染
        map.scene.fog.enabled = false
        map.scene.skyAtmosphere.show = false
        map.scene.globe.showGroundAtmosphere = false
      }

      // 二三维切换不用动画
      if (map.viewer.sceneModePicker) {
        map.viewer.sceneModePicker.viewModel.duration = 0.0
      }

      this[`map${this.mapKey}`] = map

      // 抛出事件
      this.$emit('onload', map)
    }
  }
}
</script>

<style>
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
