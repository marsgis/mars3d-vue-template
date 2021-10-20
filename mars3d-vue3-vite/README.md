<p align="center">
<img src="https://mars3d.cn/static/img/logo.png" width="100px" />
</p>
<p align="center">基于Vue + vite的mars3d开发模板</p>

### 环境配置

1. 推荐使用 Visual Studio Code 编辑器
2. 推荐安装 ESlint、Volar 插件（如果已经安装Vetur插件，需要禁用）并将格式化工具设置为eslint （settings.json配置如下）

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

### 项目安装

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

### 使用 mars3d

```javascript
// script

import MarsMap from "@comp/MarsMap/index.vue";
```

```html
<!-- template -->

<MarsMap url="config/config.json" map-key="yourkey" @onload="loadHandler" />
```

### 访问 mars3d 和 Cesium 实例

项目中已经将 mars3d 和 Cesium 实例挂载到 globalProperties，通过如下方式获取

```javascript
const instance = getCurrentInstance()
const mars3d = instance?.appContext.config.globalProperties.mars3d;
const Cesium = instance?.appContext.config.globalProperties.Cesium;
```
