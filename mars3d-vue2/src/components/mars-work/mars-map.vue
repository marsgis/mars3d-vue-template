<template>
  <div :id="`mars3d-container${mapKey}`" class="mars3d-container"></div>
</template>

<script>
import Vue from 'vue'

// 使用免费开源版本
// import 'mars3d-cesium/Build/Cesium/Widgets/widgets.css'
import 'mars3d/dist/mars3d.css'
import * as mars3d from 'mars3d'

// let mars3d = window.mars3d

// 导入插件(其他插件类似，插件清单访问：http://mars3d.cn/dev/guide/start/architecture.html)
// echarts插件
// import 'mars3d-echarts'

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
    mars3d.Resource.fetchJson({ url: this.url }).then((data) => {
      // 构建地图
      this.initMars3d({
        ...data.map3d,
        ...this.options
      })
    })
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
    initMars3d(mapOptions) {
      if (this[`map${this.mapKey}`]) {
        this[`map${this.mapKey}`].destroy()
      }

      // 创建三维地球场景
      var map = new mars3d.Map(`mars3d-container${this.mapKey}`, mapOptions)

      this[`map${this.mapKey}`] = map

      console.log('>>>>> 地图创建成功 >>>>', map)

      // 挂载到全局对象下，所有组件通过 this.map 访问
      // Vue.prototype[`map${this.mapKey}`] = map

      // 绑定对alert的处理，右键弹出信息更美观。
      // window.haoutil = window.haoutil || {}
      // window.haoutil.msg = (msg) => {
      //   this.$message.success(msg)
      // }
      // window.haoutil.alert = (msg) => {
      //   this.$message.success(msg)
      // }

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
