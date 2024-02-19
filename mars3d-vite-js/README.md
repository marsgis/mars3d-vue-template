<p align="center">
<img src="//mars3d.cn/logo.png" width="300px" />
</p>

<p align="center">基于 Vue3.x + Vite 的 Mars3D🌎最简项目模板</p>
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

## 建议环境配置

1. 推荐使用 Visual Studio Code 编辑器
2. 推荐安装 ESlint、Volar 插件（如果已经安装 Vetur 插件，需要禁用）并将格式化工具设置为 eslint （settings.json 配置如下）

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

## 运行命令

### 首次运行前安装依赖

```
npm i
```

### 启动开发环境

```
npm run dev
```

### 打包构建

```
npm run build
npm run preview
```

Navigate to `localhost:5173`. For the built version navigate to `localhost:4173`

## Available scripts

- `npm run eslint` - Lint this project
- `npm run prettier` - Format all the code to a consistant style
- `npm run prettier-check` - Check the format of code but do not change it
- `npm run dev` - Starts the Vite development server server at `localhost:5173`
- `npm run build` - Runs the Vite production build
- `npm run preview` - Starts a local preview of the production build using [`vite preview`](https://vitejs.dev/guide/cli.html#vite-preview)


# 来源cesium-vite-example

A minimal recommended setup for an applications using [Cesium](https://cesium.com) with [Vite](https://vitejs.dev/).

If you are using Webpack instead of Vite, check out our [`cesium-webpack-example`](https://github.com/CesiumGS/cesium-webpack-example) repo.

## UI framework support

This example was created to be the lowest common denominator in the Vite ecosystem and targets Vanilla JS. The same configuration has been tested with other UI frameworks in Vite (like Vue) by adding the relevant plugin. If you run into framework specific problems please [open an issue](https://github.com/CesiumGS/cesium-vite-example/issues/new).

If you create a new Vite project with [`create-vite`](https://vitejs.dev/guide/#scaffolding-your-first-vite-project) you can combine the `plugins` that it adds in `vite.config.js` with the ones in this example configuration.




## Requiring Cesium in your application

We recommend [importing named exports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) from the Cesium ES module, via the `import` keyword.

### Import named modules from Cesium

```js
import { Color } from "cesium";
var c = Color.fromRandom();
```

### Import Cesium static asset files

```js
import "cesium/Build/Cesium/Widgets/widgets.css";
```

## Cesium sub-packages

CesiumJS requires a few static files to be hosted on your server, like web workers and SVG icons. This example is already set up to copy these directories if you install the whole `cesium` package.

```js
viteStaticCopy({
  targets: [
    { src: `${cesiumSource}/ThirdParty`, dest: cesiumBaseUrl },
    { src: `${cesiumSource}/Workers`, dest: cesiumBaseUrl },
    { src: `${cesiumSource}/Assets`, dest: cesiumBaseUrl },
    { src: `${cesiumSource}/Widgets`, dest: cesiumBaseUrl },
  ],
}),
```

However if you only install `@cesium/engine` then you should change the paths in [`vite.config.js`](./vite.config.js) to the ones below:

```js
viteStaticCopy({
  targets: [
    { src: 'node_modules/@cesium/engine/Build/Workers', dest: cesiumBaseUrl },
    { src: 'node_modules/@cesium/engine/Build/ThirdParty', dest: cesiumBaseUrl },
    { src: 'node_modules/@cesium/engine/Source/Assets', dest: cesiumBaseUrl },
  ],
}),
```

Additionally you will have to import a different widgets css file in `src/main.js`.

```js
// Change this import
import "cesium/Build/Cesium/Widgets/widgets.css";

// To this one from the cesium/engine package
import "@cesium/engine/Source/Widget/CesiumWidget.css";
```

## CesiumJS before version `1.114`

If you are using a version of CesiumJS before `1.114` you will need to modify the config to tell it to ignore some external node dependencies. Add the `build` section below:

```js
  build: {
    rollupOptions: {
      external: ["http", "https", "url", "zlib"],
    },
  },
```

See cesium PR [#11773](https://github.com/CesiumGS/cesium/pull/11773) for more information

## Contributions

Pull requests are appreciated. Please use the same [Contributor License Agreement (CLA)](https://github.com/CesiumGS/cesium/blob/master/CONTRIBUTING.md) used for [Cesium](https://cesium.com/).

---

Developed by the Cesium team.
