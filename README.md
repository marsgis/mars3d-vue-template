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

const CopywebpackPlugin = require('copy-webpack-plugin')
const cesiumSource = 'node_modules/mars3d-cesium/Build/Cesium/'

module.exports = {
  //已忽略其他配置
  configureWebpack: config => {
    let plugins = [];
    if (process.env.NODE_ENV === 'production') {
      plugins = [
        new webpack.DefinePlugin({
          'CESIUM_BASE_URL': JSON.stringify('static')
        }),
        new CopywebpackPlugin([{ from: path.join(cesiumSource, cesiumWorkers), to: 'static/Workers' }]),
        new CopywebpackPlugin([{ from: path.join(cesiumSource, 'Assets'), to: 'static/Assets' }]),
        new CopywebpackPlugin([{ from: path.join(cesiumSource, 'Widgets'), to: 'static/Widgets' }]),
      ]
    } else {
      plugins = [
        new webpack.DefinePlugin({
          'CESIUM_BASE_URL': JSON.stringify('')
        }),
        new CopywebpackPlugin([{ from: path.join(cesiumSource, cesiumWorkers), to: 'Workers' }]),
        new CopywebpackPlugin([{ from: path.join(cesiumSource, 'Assets'), to: 'Assets' }]),
        new CopywebpackPlugin([{ from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' }]),
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
 

## Mars3D 是什么 
> `Mars3D三维地球平台软件` 是[火星科技](http://marsgis.cn/)团队研发的二三维一体的WebGIS地图开发平台，是火星科技团队成员多年GIS开发和Cesium使用的技术沉淀。基于[Cesium](https://cesium.com/cesiumjs/)开源库和现代Web技术栈全新构建，该平台框架优化了Cesium的使用方式和增添了更多高级功能。集成了领先的开源地图库、可视化库，提供了全新的三维大数据可视化、实时流数据可视化功能，通过本产品可快速实现浏览器和移动端上美观、流畅的三维地图呈现与空间分析。

### 相关网站 
- Mars3D官网：[http://mars3d.cn](http://mars3d.cn)  

- GitHub导航列表：[https://github.com/marsgis/mars3d](https://github.com/marsgis/mars3d)


## 版权说明
1. 任何`个人或组织`可以在遵守Mars3D相关要求下`免费无限制`使用。
2. 如有`个性化需求`或`商业应用`，请联系[火星科技](http://mars3d.cn)购买。