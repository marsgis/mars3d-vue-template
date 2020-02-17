# mars3d-plugin-navigation

Cesium plugin that adds to the Cesium map a compass, navigator (zoom in/out), and distance scale.

基于Cesium的导航球、比例尺、及放大缩小 插件


## 使用说明 
- 支持es6 import 引入mars3d-navigation.js，或 umd方式下的html的头部引入mars3d-navigation.js

```javascript

var viewer = new Cesium.Viewer('cesiumContainer', {
    imageryProvider: false,
    baseLayerPicker: false,
    timeline: false,
    infoBox: false,
    navigationHelpButton: false,
    fullscreenButton: false,
    animation: false,
    geocoder: false,
    homeButton: false,
    sceneModePicker: false
});


var options = {};

// 用于在使用重置导航重置地图视图时设置默认视图控制。接受的值是Cesium.Cartographic 和 Cesium.Rectangle.
options.defaultResetView = Cesium.Rectangle.fromDegrees(80, 22, 130, 50);
// 用于启用或禁用罗盘。true是启用罗盘，false是禁用罗盘。默认值为true。如果将选项设置为false，则罗盘将不会添加到地图中。
options.enableCompass = true;
// 用于启用或禁用缩放控件。true是启用，false是禁用。默认值为true。如果将选项设置为false，则缩放控件将不会添加到地图中。
options.enableZoomControls = true;
// 用于启用或禁用距离图例。true是启用，false是禁用。默认值为true。如果将选项设置为false，距离图例将不会添加到地图中。
options.enableDistanceLegend = true;
// 用于启用或禁用指南针外环。true是启用，false是禁用。默认值为true。如果将选项设置为false，则该环将可见但无效。
options.enableCompassOuterRing = true;



CesiumNavigation(viewer, options);

```

### 参考了的github
[https://github.com/alberto-acevedo/cesium-navigation ](https://github.com/alberto-acevedo/cesium-navigation )  
[https://github.com/richard1015/cesium-navigation-es6](https://github.com/richard1015/cesium-navigation-es6)  

  (本插件 火星科技有修改优化样式)