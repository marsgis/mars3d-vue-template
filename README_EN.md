# Mars3D Vue template
 
<p>
<a target="_black" href="https://github.com/marsgis/mars3d">
<img alt="GitHub stars" src="https://img.shields.io/github/stars/marsgis/mars3d?style=flat&logo=github">
</a>
<a target="_black" href="https://github.com/marsgis/mars3d">
<img alt="GitHub forks" src="https://img.shields.io/github/forks/marsgis/mars3d?style=flat&logo=github">
</a>
<a target="_black" href="https://www.npmjs.com/package/mars3d">
<img alt="Npm downloads" src="https://img.shields.io/npm/dt/mars3d?style=flat&logo=npm">
</a>
<a target="_black" href="https://www.npmjs.com/package/mars3d">
<img alt="Npm version" src="https://img.shields.io/npm/v/mars3d.svg?style=flat&logo=npm&label=version"/>
</a>
</p>

[**中文**](./README.md) | [**English**](./README_EN.md)

An open-source JavaScript library for world-class 3D globes and maps 🌎

Mars3D platform, the simplest application project template under the 'Vue technology stack', based on vueCli 4.x
    
 > For other technology stacks, please refer to: [https://github.com/marsgis/mars3d](https://github.com/marsgis/mars3d)


## Run the command
 
###  Get Started
 `npm install` or `cnpm install`
 
### Run project
 `npm run serve`  After run access:`http://localhost:3001/` 

### build project
 run `npm run build` to build the project. 

## Demo 
 [Online Demo](http://mars3d.cn/project/vue-template/)  

 ![image](http://mars3d.cn/project/vue-template/screenshot.jpg)
 

  
## How to integrate into your existing projects
1. ### nstall the Mars3D dependency package
```bash
npm install mars3d   //  or yarn add mars3d
```

2. ### Copy files
 > Scenario Configuration File：`public\config\config.json`

 > Component definition file：`src\components\mars3d\Map.vue`


3. ### configuration vue.config.js 

The current repository is based on vueCli 4.x 
```js
// vue.config.js  Add the following configuration
const CopywebpackPlugin = require('copy-webpack-plugin') 
const cesiumSource = 'node_modules/mars3d-cesium/Build/Cesium/'

//Copy cesium related resources
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
For vueCli 3.x, configure plugins as follows

```js
// vue.config.js  Add the following configuration

const CopyWebpackPlugin = require('copy-webpack-plugin') 
const cesiumSource = 'node_modules/mars3d-cesium/Build/Cesium/'

module.exports = {
  //Other configurations have been ignored
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

#### Import external Cesium library directly without vue.config.js configuration
If you encounter a variety of strange problems that cannot be resolved in step 3 above integration, most of which are configuration problems with vue.config.

The Cesium library introduced by Script can be used directly in HTML without modifying `vue.config`

Copy Cesium from the SDK and place it in `public\lib\Cesium\` and uncomment the following comment in `public\index.html`
```html
<script type="text/javascript" >
  window.CESIUM_BASE_URL ="<%= BASE_URL %>lib/Cesium/"
</script>
<link rel="stylesheet" href="<%= BASE_URL %>lib/Cesium/Widgets/widgets.css">
<script type="text/javascript" src="<%= BASE_URL %>lib/Cesium/Cesium.js"></script>
```




4. ### To create the earth 
Refer to the   `src\views\Index.vue` file to introduce the Map component and construct the creation of the earth, focusing on the following code

```js
<Map :url="configUrl" @onload="onMapload" />

import Map from '../components/mars3d/Map.vue'
```
5. ### Q&A
When running an error, please check whether there is any conflict between the related versions, such as webpack 4.43.0 and copy-webpack-plugin 7.0.0

  >1. Check the compatibility between webpack and copy-webpack-plugin versions
  >2. Check whether webpack and copy-webpack-plugin are compatible with Node and NPM versions


6. ### If you encounter a variety of strange integration problems that cannot be solved, you can switch to the following template for use (easier to use)
   Minimal Project (CDN Version)[https://github.com/marsgis/mars3d-vue-template-cdn](https://github.com/marsgis/mars3d-vue-template-cdn)    `Non-npm introduces Cesium and Mars3D`


7. ### f you purchased the licensed version, you can refer to the following repository to integrate the mars3D library with non-NPM versions.
   Minimal Project (Local Version)[https://gitee.com/marsgis/mars3d-vue-template-local](https://gitee.com/marsgis/mars3d-vue-template-local)    `Mars3d library non-NPM introduced`



## What is Mars3D
>  `Mars3D` Is [Mars technology] Mars (http://marsgis.cn/) developed a WebGL based 3 d client development platform, based on [Cesium] (https://cesium.com/cesiumjs/) is optimized with B/S structure design, The lightweight and efficient GIS development platform supports multi-industry expansion. It can run efficiently in the browser without installation and plug-in, and can quickly access and use a variety of GIS data and 3D models to present 3d space visualization and complete the flexible application of the platform in different industries.

 > The Mars3D platform can be used to build plug-in free, cross-operating system, cross-browser 3D GIS applications. The platform uses WebGL for hardware-accelerated graphics, cross-platform and cross-browser to achieve real dynamic 3d visualization of big data. Through Mars3D products, beautiful and smooth 3D map presentation and spatial analysis can be quickly realized on browsers and mobile terminals.

### Related websites
- Mars3D official website: [http://mars3d.cn](http://mars3d.cn)

- Making navigation list: [https://github.com/marsgis/mars3d] (https://github.com/marsgis/mars3d)
 
