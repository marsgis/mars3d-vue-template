<p align="center">
<img src="https://muyao1987.gitee.io/cdn/mars3d.cn/logo.png" width="300px" />
</p>

<p align="center">Mars3d development template based on Vue template</p>

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
 
 🌎 Mars3D platform, the simplest application project template under the `Vue technology stack`, based on vueCli 4.x
    
 > For other technology stacks, please refer to: [https://github.com/marsgis/mars3d](https://github.com/marsgis/mars3d)


## Run the command
 
###  Install dependencies before first run
 `npm install` or `cnpm install`
 
### http run project
 `npm run serve` after run access:`http://localhost:3001/` 

### Package and compile project
 Run `npm run build` to build the project. 

## Operation effect 

 [Online Demo](http://marsgis.gitee.io/mars3d-es5-template/)  
 

  
## How to integrate into your existing projects
1. ### Install the Mars3D dependency package
```bash
npm install mars3d   //  or yarn add mars3d
```

2. ### Copy files
 > Scene profile：`public\config\config.json`

 > Component definition file：`src\components\mars3d\Map.vue`


3. ### configuration vue.config.js 

The current warehouse is based on vueCli 4.x 
```js
// vue.config.js  
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
```
For vueCli 3.x, configure plugins as follows

```js
// vue.config.js
const CopyWebpackPlugin = require('copy-webpack-plugin') 

module.exports = {
  //Other configurations have been ignored
  configureWebpack: config => {
    let cesiumSourcePath = 'node_modules/mars3d-cesium/Build/Cesium/' //cesium库目录
    let cesiumRunPath = config.output.publicPath || './cesium/' //cesium运行时主目录
    let plugins = [
      //标识cesium资源所在的主目录，cesium内部资源加载、多线程等处理时需要用到
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify(cesiumRunPath)
      }),
      //cesium相关资源目录需要拷贝到系统目录下面
      new CopyWebpackPlugin([{ from: path.join(cesiumSourcePath, 'Workers'), to: path.join(config.output.path,cesiumRunPath, 'Workers') }]),
      new CopyWebpackPlugin([{ from: path.join(cesiumSourcePath, 'Assets'), to: path.join(config.output.path,cesiumRunPath, 'Assets') }]),
      new CopyWebpackPlugin([{ from: path.join(cesiumSourcePath, 'ThirdParty'), to: path.join(config.output.path,cesiumRunPath, 'ThirdParty') }]),
      new CopyWebpackPlugin([{ from: path.join(cesiumSourcePath, 'Widgets'), to: path.join(config.output.path,cesiumRunPath, 'Widgets') }])
    ]

    return {
      plugins: plugins
    }
  },
}
```

#### When vue.config.js is not configured, the cesium Library of CDN is imported directly  
If you encounter various strange problems that cannot be solved during the integration in step 3 above, most of them are the configuration problems of vue.config.
Modify the following comments in `public\index.html`
```html
<link href="https://unpkg.com/mars3d-cesium/Build/Cesium/Widgets/widgets.css" rel="stylesheet"   type="text/css" />
<script src="https://unpkg.com/mars3d-cesium/Build/Cesium/Cesium.js"  type="text/javascript"></script>
<script src="https://unpkg.com/@turf/turf/turf.min.js" type="text/javascript" ></script>
```

#### When vue.config.js is not configured, the external cesium library is imported directly
If you encounter various strange problems that cannot be solved during the integration in step 3 above, most of them are the configuration problems of vue.config.

The Cesium library introduced by Script can be used directly in HTML without modifying `vue.config` 

Copy cesium from the SDK downloaded from the official website, put it under`public\lib\Cesium\`,and cancel the following comments in`public\index.html`
```html
<script type="text/javascript" >
  window.CESIUM_BASE_URL ="<%= BASE_URL %>lib/Cesium/"
</script>
<link rel="stylesheet" href="<%= BASE_URL %>lib/Cesium/Widgets/widgets.css">
<script type="text/javascript" src="<%= BASE_URL %>lib/Cesium/Cesium.js"></script>
```




4. ### Create the earth 
Refer to the `src\views\Index.vue` file to introduce the Map component and construct the creation of the earth, focusing on the following code

```js
<Map :url="configUrl" @onload="onMapload" />

import Map from '../components/mars3d/Map.vue'
```
5. ### Common problem
When running an error, please check whether there is any conflict between the related versions, such as webpack 4.43.0 and copy-webpack-plugin 7.0.0

  >1. Check the compatibility between webpack and copy-webpack-plugin versions
  >2. Check whether webpack and copy-webpack-plugin are compatible with Node and NPM versions

 

## What is Mars3D
>  `Mars3D platform` is [Mars technology](http://marsgis.cn/) a 3D client development platform based on WebGL technology, which is based on [Cesium](https://cesium.com/cesiumjs/) optimization and B / S architecture design,The lightweight and efficient GIS development platform supporting multi industry expansion can run efficiently in the browser without installation and plug-ins, and can quickly access and use a variety of GIS data and three-dimensional models, present the visualization of three-dimensional space, and complete the flexible application of the platform in different industries.

 > Mars3d platform can be used to build 3D GIS applications without plug-ins, across operating systems and across browsers. The platform uses WebGL for hardware accelerated graphics, and realizes real dynamic big data 3D visualization across platforms and browsers. The Mars3D product can quickly realize beautiful and smooth 3D map presentation and spatial analysis on browsers and mobile terminals.

### Related websites
- Mars3D official website: [http://mars3d.cn](http://mars3d.cn)

- Making navigation list: [https://github.com/marsgis/mars3d](https://github.com/marsgis/mars3d)
 



