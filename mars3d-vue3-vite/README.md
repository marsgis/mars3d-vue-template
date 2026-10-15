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
```

### 运行效果

[在线体验](http://marsgis.gitee.io/mars3d-es5-template/)

## 如何集成到自己已有的项目中

1. ### 安装 mars3d 依赖包

```bash
npm install mars3d   //或  cnpm install mars3d   或  yarn add mars3d
```

2. ### 拷贝文件
   > 场景配置文件：`public\config\config.json`

> 组件定义文件：`src\components\mars-work\mars-map.vue`

3. ### 需要的组件中引入 Map 组件创建地球

参考 `src\App.vue`文件引入 Map 组件和构造创建地球，主要关注下下面代码处

```javascript
// script

import MarsMap from "./components/mars-work/mars-map.vue";
```

```html
<!-- template -->
<MarsMap :url="configUrl" map-key="test" @onload="marsOnload" />
```

4. ### 访问 mars3d 和 Cesium 实例

项目中已经将 mars3d 和 Cesium 实例挂载到 globalProperties，通过如下方式获取

```javascript
const instance = getCurrentInstance();
const mars3d = instance?.appContext.config.globalProperties.mars3d;
const Cesium = instance?.appContext.config.globalProperties.Cesium;
```

## Mars3D 是什么

> `Mars3D平台` 是一款基于 WebGL 技术实现的三维客户端开发平台，基于[Cesium](https://cesium.com/cesiumjs/)优化提升与 B/S 架构设计，支持多行业扩展的轻量级高效能 GIS 开发平台，能够免安装、无插件地在浏览器中高效运行，并可快速接入与使用多种 GIS 数据和三维模型，呈现三维空间的可视化，完成平台在不同行业的灵活应用。

> Mars3D 平台可用于构建无插件、跨操作系统、 跨浏览器的三维 GIS 应用程序。平台使用 WebGL 来进行硬件加速图形化，跨平台、跨浏览器来实现真正的动态大数据三维可视化。通过 Mars3D 产品可快速实现浏览器和移动端上美观、流畅的三维地图呈现与空间分析。

### 相关网站

- Mars3D 官网：[http://mars3d.cn](http://mars3d.cn)

- Mars3D 开源项目列表：[https://github.com/marsgis/mars3d](https://github.com/marsgis/mars3d)

## 📄 开源协议 / License

### 1. 本项目的授权

**mars3d-vue3-vite** 的项目源代码（包括但不限于 `src/` 目录下的页面、
组件、路由、状态管理、配置及项目模板代码）基于 **Apache License 2.0**
**完全开源**。在遵守协议的前提下，您可以自由地使用、复制、修改、合并、
发布、分发和再授权，**包括用于商业目的**。

### 2. 请注意：项目与 SDK 是两层相互独立的授权

本项目是 Mars3D SDK 的**示例工程 / 项目模板**，运行时依赖 **Mars3D SDK
核心类库**（`mars3d` 命名空间下的类库文件，通过 `npm install mars3d` 安装，或通过 CDN 引入）。Mars3D SDK 是
独立授权的产品，其授权条款与本项目**相互独立**：

| 对比项 | 本项目（mars3d-vue3-vite） | Mars3D SDK |
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
请购买 Mars3D SDK 商业授权👉 <https://mall.marsgis.cn>

购买后只需用授权版 SDK 覆盖项目中的类库文件，**项目代码无需任何修改**。
