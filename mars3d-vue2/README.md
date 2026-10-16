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

## 📄 开源协议 / License

### 1. 本项目的授权

**mars3d-vue2** 的项目源代码（包括但不限于 `src/` 目录下的页面、
组件、路由、状态管理、配置及项目模板代码）基于 **Apache License 2.0**
**完全开源**。在遵守协议的前提下，您可以自由地使用、复制、修改、合并、
发布、分发和再授权，**包括用于商业目的**。

### 2. 请注意：项目与 SDK 是两层相互独立的授权

本项目是 Mars3D SDK 的**示例工程 / 项目模板**，运行时依赖 **Mars3D SDK
核心类库**（`mars3d` 命名空间下的类库文件，通过 `npm install mars3d` 安装，或通过 CDN 引入）。Mars3D SDK 是
独立授权的产品，其授权条款与本项目**相互独立**：

| 对比项 | 本项目（mars3d-vue2） | Mars3D SDK |
| --- | --- | --- |
| 授权方式 | **Apache License 2.0** | 免费版：Apache-2.0 ＋ 附加条款；商业版：商业授权 |
| 是否开源 | 完全开源 | 以编译后的类库形式分发 |
| 页面 Logo |  | 免费版**必须保留**，不得移除 / 遮挡 / 规避；商业授权版可去除 |
| F12 控制台版权信息 |  | 免费版不得修改；商业授权版替换为被授权方单位名称 |
| 商业用途 | 自由使用 | 免费版可商用（须保留署名）；去除 Logo 需购买商业授权 |
| 协议依据 | 本仓库根目录 `LICENSE` | SDK 随附授权文件，或见 <https://mars3d.cn> |

**特别说明：**

- 本项目源代码的 Apache-2.0 授权**仅覆盖项目自身代码，不覆盖、不改变
  Mars3D SDK 的授权条款**，也不构成对 SDK 附加条款（Logo、F12 控制台
  信息保留义务）的豁免。
- 您基于本项目进行二次开发、打包、部署或对外交付时，只要运行时使用了
  Mars3D SDK，即应同时遵守 SDK 的授权条款。
- 通过 npm 安装的 SDK 类库文件（`node_modules/mars3d/` 目录）**不属于
  本项目的开源代码**，其著作权归mars3d团队所有，适用 SDK
  自身的授权协议。

### 3. 购买 SDK 商业授权

如您需要：去除页面周边的 Mars3D Logo；将 F12 控制台版权信息替换为
贵单位 / 项目名称；或在对外商业交付、政企招投标中取得盖章授权文件，
请购买 Mars3D SDK 商业授权👉 <http://mars3d.cn/buy.html>

购买后只需用授权版 SDK 覆盖项目中的类库文件，**项目代码无需任何修改**。
