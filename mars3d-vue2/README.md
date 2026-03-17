<p align="center">
<img src="//mars3d.cn/logo.png" width="300px" />
</p>
 
<p align="center">基于Vue2.x + VueCli4.x技术栈的 Mars3D🌎最简项目模板</p>

<p align="center">
<a target="_black" href="https://github.com/marsgis/mars3d">
<img alt="GitHub stars" src="https://img.shields.io/github/stars/marsgis/mars3d?style=flat&logo=github">
</a>
<a target="_black" href="https://www.npmjs.com/package/mars3d">
<img alt="Npm downloads" src="https://img.shields.io/npm/dt/mars3d?style=flat&logo=npm">
</a>
<a target="_black" href="https://www.npmjs.com/package/mars3d">
<img alt="Npm version" src="https://img.shields.io/npm/v/mars3d.svg?style=flat&logo=npm&label=version"/>
</a>
</p>

 [**English**](./README_EN.md) |[**中文**](./README.md) 
 
 

## 运行命令
 
### 首次运行前安装依赖
 `npm install` 或 `cnpm install`
 
### http运行项目
 `npm run serve`  运行后访问：`http://localhost:3001/` 

### 打包编译项目
 运行`npm run build`来构建项目。 

### 运行效果 
 [在线体验](http://marsgis.gitee.io/mars3d-es5-template/)  

  
## 如何集成到自己已有的项目中
1. ### 安装mars3d依赖包
```bash
npm install mars3d   //或  cnpm install mars3d   或  yarn add mars3d
```

2. ### 拷贝文件
 > 场景配置文件：`public\config\config.json`

 > 组件定义文件：`src\components\mars-work\mars-map.vue`


3. ### 配置vue.config.js 

```bash
npm install copy-webpack-plugin -save --dev
```

```js
// vue.config.js 添加下面配置 
const CopyWebpackPlugin = require('copy-webpack-plugin')  

module.exports = {
  configureWebpack: config => { 
    let cesiumSourcePath = 'node_modules/mars3d-cesium/Build/Cesium/' //cesium库目录
    let cesiumRunPath = config.output.publicPath || './cesium/' //cesium运行时主目录
    let plugins = [
      //标识cesium资源所在的主目录，cesium内部资源加载、多线程等处理时需要用到
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify(cesiumRunPath)
      }),
      //cesium相关资源目录需要拷贝到系统目录下面
      new CopyWebpackPlugin([{ from: path.join(cesiumSourcePath, 'Workers'), to: path.join(cesiumRunPath, 'Workers') }]),
      new CopyWebpackPlugin([{ from: path.join(cesiumSourcePath, 'Assets'), to: path.join(cesiumRunPath, 'Assets') }]),
      new CopyWebpackPlugin([{ from: path.join(cesiumSourcePath, 'ThirdParty'), to: path.join(cesiumRunPath, 'ThirdParty') }]),
      new CopyWebpackPlugin([{ from: path.join(cesiumSourcePath, 'Widgets'), to: path.join(cesiumRunPath, 'Widgets') }])
    ]
    return {
      plugins: plugins
    }
  },
  //已忽略其他配置
}
```

或参考webpack.config.js写法进行修改
```js 
// webpack.config.js  
const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const cesiumSourcePath = 'node_modules/mars3d-cesium/Build/Cesium/' //cesium库目录
let cesiumRunPath = './cesium/'//cesium运行时主目录

module.exports = {
  plugins: [
      //标识cesium资源所在的主目录，cesium内部资源加载、多线程等处理时需要用到
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify(cesiumRunPath)
      }),
      //cesium相关资源目录需要拷贝到系统目录下面
      new CopyWebpackPlugin([{ from: path.join(cesiumSourcePath, 'Workers'), to: path.join(cesiumRunPath, 'Workers') }]),
      new CopyWebpackPlugin([{ from: path.join(cesiumSourcePath, 'Assets'), to: path.join(cesiumRunPath, 'Assets') }]),
      new CopyWebpackPlugin([{ from: path.join(cesiumSourcePath, 'ThirdParty'), to: path.join(cesiumRunPath, 'ThirdParty') }]),
      new CopyWebpackPlugin([{ from: path.join(cesiumSourcePath, 'Widgets'), to: path.join(cesiumRunPath, 'Widgets') }])
  ],
}
```

#### 不配置vue.config.js时，直接引入CDN的Cesium库
如果您在上面第3步骤集成中遇到各种奇怪问题无法解决，大部分是vue.config的配置问题时。 
修改`public\index.html`中的下面注释
```html
<link href="https://unpkg.com/mars3d-cesium/Build/Cesium/Widgets/widgets.css" rel="stylesheet"   type="text/css" />
<script src="https://unpkg.com/mars3d-cesium/Build/Cesium/Cesium.js"  type="text/javascript"></script>
<script src="https://unpkg.com/@turf/turf/turf.min.js" type="text/javascript" ></script>
```

项目中提供了快捷配置的环境变量，VUE_APP_MARS3D_SOURCE=cdn

 #### 不配置vue.config.js时，直接引入外部Cesium库
如果您在上面第3步骤集成中遇到各种奇怪问题无法解决，大部分是vue.config的配置问题时。
可以直接在html中使用script引入的Cesium库 ，该方式不需要修改 `vue.config`  
从官网下载的SDK中拷贝Cesium放在`public\lib\Cesium\`下,并取消`public\index.html`中的下面注释
```html
<script type="text/javascript" >
  window.CESIUM_BASE_URL ="<%= BASE_URL %>lib/Cesium/"
</script>
<link rel="stylesheet" href="<%= BASE_URL %>lib/Cesium/Widgets/widgets.css">
<script type="text/javascript" src="<%= BASE_URL %>lib/Cesium/Cesium.js"></script>
```
项目中提供了快捷配置的环境变量，VUE_APP_MARS3D_SOURCE=local




4. ### 创建地球 
 参考 `src\views\Index.vue`文件引入Map组件和构造创建地球，主要关注下下面代码处
```js
<Map :url="configUrl" @onload="onMapload" />

import Map from '../components/mars-work/mars-map.vue'
```
5. ### 常见问题
 运行报错时，请检查相关版本是否有冲突，比如webpack 4.43.0与copy-webpack-plugin 7.0.0 会出问题
  >1. 检查webpack和copy-webpack-plugin版本兼容问题
  >2. 检查webpack和copy-webpack-plugin与node、npm的版本兼容问题


 

## Mars3D 是什么 
>  `Mars3D平台` 是一款基于 WebGL 技术实现的三维客户端开发平台，基于[Cesium](https://cesium.com/cesiumjs/)优化提升与B/S架构设计，支持多行业扩展的轻量级高效能GIS开发平台，能够免安装、无插件地在浏览器中高效运行，并可快速接入与使用多种GIS数据和三维模型，呈现三维空间的可视化，完成平台在不同行业的灵活应用。

 > Mars3D平台可用于构建无插件、跨操作系统、 跨浏览器的三维 GIS 应用程序。平台使用 WebGL 来进行硬件加速图形化，跨平台、跨浏览器来实现真正的动态大数据三维可视化。通过 Mars3D产品可快速实现浏览器和移动端上美观、流畅的三维地图呈现与空间分析。

### 相关网站 
- Mars3D官网：[http://mars3d.cn](http://mars3d.cn)  

- Mars3D开源项目列表：[https://github.com/marsgis/mars3d](https://github.com/marsgis/mars3d)


## 版权说明
1. Mars3D平台由[Mars3D团队](http://mars3d.cn/)自主研发，拥有所有权利。
2. 任何个人或组织可以在遵守相关要求下可以免费无限制使用。
