# Mars3D三维地球 - Vue脚手架
 Vue技术栈下的一个最简[Mars3D](http://cesium.marsgis.cn)应用的三维地球项目模版,Mars3D等库都是采用import方式引入。
 这是一个基于 [VueCli](https://cli.vuejs.org/config/)并整合了Cesium、MarsGIS的基础项目。

当前脚手架内Mars3D等所有js库都是**采用import方式引入的**。
```javascript
import * as Cesium from "cesium/Cesium";
import mars3d from "./mars3d/mars3d";
```

 其他技术栈，请参考 [Mars3D开源导航](https://github.com/marsgis/mars3d)
 

## 运行效果 
 [在线Demo](http://cesium.marsgis.cn/project/vue-cli/)  

 ![image](http://cesium.marsgis.cn/project/img/vue-cli.jpg)
 
 [更多项目体验](http://cesium.marsgis.cn/project.html)

 
 

## 运行命令
 
### 首次运行前安装依赖
 `npm install` 或 `cnpm install`
 
### http运行项目
 `npm run serve`  运行后访问：`http://localhost:3001/`  。 修改代码自动热部署，无缓存不用手动刷新

### 打包编译项目
 运行`npm run build`来构建项目。 


## 项目说明
 当前仓库是一个最简的项目模板，并且所有第3方js库都是import的标准引入方式（所以Cesium使用的是原生Cesium，因此有少部分mars3d分析相关功能无法使用），该仓库主要提供给 特定简单项目 或 有代码洁癖的童鞋 使用。
 
 
### 更新项目
 此脚手架中类库不保证是最新版本，请您自行拷贝交付资料中任意包下的 `lib\mars3d\`(需要import版本) 覆盖至: `src\components\mars-map\mars3d\` 目录下
 
 
### 切换Cesium为火星修改版本步骤
 1. 请使用  [mars3d-vue-cli-cdn](https://github.com/marsgis/mars3d-vue-cli-cdn)仓库，代码基本与本仓库相同，就Cesium的引入方式不一样。



### 与[mars3d-vue-project](https://github.com/marsgis/mars3d-vue-project)仓库的区别
1. 当前是import方式引入lib的（包含mars3d），而 mars3d-vue-project是head静态资源引入。
2. 当前仓库使用的是npm原生的Cesium库。


## 版权说明
1. 当前[Mars3D](http://cesium.marsgis.cn)免费版本可以免费无限制使用.
2. 如有更高需求或商业应用，请联系购买[火星科技](http://cesium.marsgis.cn)进行SDK授权(去除logo、添加授权信息等)。 
