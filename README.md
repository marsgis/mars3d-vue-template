# Mars3D最简项目模版 - Vue版
    Mars3D三维地球平台软件，在`Vue技术栈下`的最简的应用项目模版，基于vueCli 4.x 
   

 > 其他技术栈，请参考： [https://github.com/marsgis/mars3d](https://github.com/marsgis/mars3d)
 
  
## 运行命令
 
### 首次运行前安装依赖
 `npm install` 或 `cnpm install`
 
### http运行项目
 `npm run serve`  运行后访问：`http://localhost:3001/` 

### 打包编译项目
 运行`npm run build`来构建项目。 

## 运行效果 
 [在线Demo](http://mars3d.cn/project/vue-template/)  

 ![image](http://mars3d.cn/project/vue-template/screenshot.jpg)
 

  
## 如何集成到自己已有的项目中
1. ### 安装mars3d依赖包
```bash
npm install mars3d   //或  cnpm install mars3d   或  yarn add mars3d
```

2. ### 拷贝文件
 > 场景配置文件：`public\config\config.json`

 > 组件定义文件：`src\components\mars3d\Map.vue`


3. ### 配置vue.config.js 
当前仓库是基于 vueCli 4.x 
```js
// vue.config.js  添加下面配置  
const CopywebpackPlugin = require('copy-webpack-plugin') 
const cesiumSource = 'node_modules/mars3d-cesium/Build/Cesium/'

//拷贝cesium相关资源
plugins = [
    new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify('static')
    }),
    new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Workers'), to: 'static/Workers' }]),
    new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Assets'), to: 'static/Assets' }]),
    new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'ThirdParty'), to: 'static/ThirdParty' }]),
    new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Widgets'), to: 'static/Widgets' }])
]
```
如果是 vueCli 3.x 时，参考下面配置plugins 

```js
// vue.config.js 添加下面配置

const CopyWebpackPlugin = require('copy-webpack-plugin') 
const cesiumSource = 'node_modules/mars3d-cesium/Build/Cesium/'

module.exports = {
  //已忽略其他配置
  configureWebpack: config => {
    let plugins = []
    if (process.env.NODE_ENV === 'production') {
      plugins = [
        new webpack.DefinePlugin({
          CESIUM_BASE_URL: JSON.stringify('static')
        }),
        new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Workers'), to: 'static/Workers' }]),
        new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Assets'), to: 'static/Assets' }]),
        new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'ThirdParty'), to: 'static/ThirdParty' }]),
        new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Widgets'), to: 'static/Widgets' }])
      ]
    } else {
      plugins = [
        new webpack.DefinePlugin({
          CESIUM_BASE_URL: JSON.stringify('')
        }),
        new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Workers'), to: 'Workers' }]),
        new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Assets'), to: 'Assets' }]),
        new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'ThirdParty'), to: 'ThirdParty' }]),
        new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' }])
      ]
    }
    return {
      plugins: plugins
    }
  },
}
```


4. ### 创建地球 
 参考 `src\views\Index.vue`文件引入Map组件和构造创建地球，主要关注下下面代码处
```js
<Map :url="configUrl" @onload="onMapload" />

import Map from '../components/mars3d/Map.vue'
```
5. ### 常见问题
 运行报错时，请检查相关版本是否有冲突，比如webpack 4.43.0与copy-webpack-plugin 7.0.0 会出问题
  >1. 检查webpack和copy-webpack-plugin版本兼容问题
  >2. 检查webpack和copy-webpack-plugin与node、npm的版本兼容问题
 

6. ### 如果您购买了授权版本，可以参考下面仓库来集成非npm版本的mars3d库。
   最简项目(本地版)[https://gitee.com/marsgis/mars3d-vue-template-local](https://gitee.com/marsgis/mars3d-vue-template-local)    `mars3d库非npm引入`

## Mars3D 是什么 
>  `Mars3D三维地球平台软件` 是[火星科技](http://marsgis.cn/)研发的一款基于 WebGL 技术实现的三维客户端开发平台，基于[Cesium](https://cesium.com/cesiumjs/)优化提升与B/S架构设计，支持多行业扩展的轻量级高效能GIS开发平台，能够免安装、无插件地在浏览器中高效运行，并可快速接入与使用多种GIS数据和三维模型，呈现三维空间的可视化，完成平台在不同行业的灵活应用。

 > Mars3D平台可用于构建无插件、跨操作系统、 跨浏览器的三维 GIS 应用程序。平台使用 WebGL 来进行硬件加速图形化，跨平台、跨浏览器来实现真正的动态大数据三维可视化。通过 Mars3D产品可快速实现浏览器和移动端上美观、流畅的三维地图呈现与空间分析。

### 相关网站 
- Mars3D官网：[http://mars3d.cn](http://mars3d.cn)  

- GitHub导航列表：[https://github.com/marsgis/mars3d](https://github.com/marsgis/mars3d)


## 版权说明
1. 任何`个人或组织`可以在遵守Mars3D相关要求下`免费无限制`使用。
2. 如有`个性化需求`或`商业应用`，请联系[火星科技](http://mars3d.cn)购买。