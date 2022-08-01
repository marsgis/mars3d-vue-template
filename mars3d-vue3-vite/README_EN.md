<p align="center">
<img src="//mars3d.cn/logo.png" width="300px" />
</p>

<p align="center">Mars3d development template based on Vue3.x + Vite </p>

<p align="center">
  <a target="_black" href="https://www.npmjs.com/package/mars3d">
    <img alt="Npm version" src="https://img.shields.io/npm/v/mars3d.svg?style=flat&logo=npm&label=版本号" />
  </a>
  <a target="_black" href="https://www.npmjs.com/package/mars3d">
    <img alt="Npm downloads" src="https://img.shields.io/npm/dt/mars3d?style=flat&logo=npm&label=下载量" />
  </a>
  <a target="_black" href="https://github.com/marsgis/mars3d">
    <img alt="GitHub stars" src="https://img.shields.io/github/stars/marsgis/mars3d?style=flat&logo=github" />
  </a>
  <a target="_black" href="https://gitee.com/marsgis/mars3d">
    <img src="https://gitee.com/marsgis/mars3d/badge/star.svg?theme=dark" alt="star" />
  </a>
</p>

 [**English**](./README_EN.md) |[**中文**](./README.md) 


### Recommended environment configuration

1. Visual Studio Code editor is recommended
2. It is recommended to install ESlint、Volar plug-ins (if the vehicle plug-in has been installed, it needs to be disabled) And set the formatting tool to eslint (settings.json is configured as follows)

```json
"[vue]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
},
"[typescript]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
},
"[javascript]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
},
```

## Run command

### Install dependencies before first run

```
npm i
```

### Start the development environment

```
npm run dev
```

### Package build

```
npm run build
```

### Operation effect 
 [online Demo](http://marsgis.gitee.io/mars3d-es5-template/)  
 

## How to integrate into your existing project
 
1. ### Install mars3d dependency package
```bash
npm install mars3d   //or  cnpm install mars3d   or  yarn add mars3d
```

2. ### Copy files
 > Scene profile：`public\config\config.json`

 > Component definition file：`src\components\mars3d\Map.vue`

3. ### The Map component is introduced into the required components to create the earth

 Refer to the `src\views\Index.vue` file to introduce map components and structures to create the earth. Mainly focus on the following code

```javascript
// script

import MarsMap from "@comp/MarsMap/index.vue";
```

```html
<!-- template -->

<MarsMap url="config/config.json" map-key="yourkey" @onload="loadHandler" />
```

4. ### Access mars3d and Cesium instances

Mars3d and Cesium instances have been mounted to globalproperties in the project, and can be obtained as follows

```javascript
const instance = getCurrentInstance()
const mars3d = instance?.appContext.config.globalProperties.mars3d;
const Cesium = instance?.appContext.config.globalProperties.Cesium;
```


## What is Mars3D
>  `Mars3D` is [Mars technology](http://marsgis.cn/) developed a WebGL based 3 d client development platform, based on [Cesium](https://cesium.com/cesiumjs/) is optimized with B/S structure design, The lightweight and efficient GIS development platform supports multi-industry expansion. It can run efficiently in the browser without installation and plug-in, and can quickly access and use a variety of GIS data and 3D models to present 3d space visualization and complete the flexible application of the platform in different industries.

 > The Mars3D platform can be used to build plug-in free, cross-operating system, cross-browser 3D GIS applications. The platform uses WebGL for hardware-accelerated graphics, cross-platform and cross-browser to achieve real dynamic 3d visualization of big data. Through Mars3D products, beautiful and smooth 3D map presentation and spatial analysis can be quickly realized on browsers and mobile terminals.

### Related websites
- Mars3D official website：[http://mars3d.cn](http://mars3d.cn)  

- Mars3D GitHub navigation list：[https://github.com/marsgis/mars3d](https://github.com/marsgis/mars3d)

 


