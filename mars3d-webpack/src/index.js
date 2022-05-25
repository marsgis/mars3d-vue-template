import "mars3d-cesium/Build/Cesium/Widgets/widgets.css";
import * as Cesium from "mars3d-cesium";
import "mars3d/dist/mars3d.css";

import * as mars3d from "mars3d";
import "./assets/css/style.css";

const Cesiums = mars3d.Cesium;
function init() {
  // 判断webgl支持
  if (!mars3d.Util.webglreport()) {
    mars3d.Util.webglerror();
  }

  let configUrl = "./config/config.json";

  // 读取 config.json 配置文件
  mars3d.Resource.fetchJson({ url: configUrl })
    .then(function (json) {
      console.log("读取 config.json 配置文件完成", json); // 打印测试信息

      //合并属性参数，可覆盖config.json中的对应配置
      let mapOptions = mars3d.Util.merge(json.map3d, {
        scene: {
          center: {
            lat: 30.183412,
            lng: 116.321017,
            alt: 74845,
            heading: 2,
            pitch: -46,
          },
        },
      });

      //创建三维地球场景
      const map = new mars3d.Map("mars3dContainer", mapOptions);

      const graphicLayer = new mars3d.layer.GraphicLayer();
      map.addLayer(graphicLayer);

      // 2.在layer上绑定监听事件
      graphicLayer.on(mars3d.EventType.click, function (event) {
        console.log("监听layer，单击了矢量对象", event);
      });
      graphicLayer.on(mars3d.EventType.mouseOver, function (event) {
        console.log("监听layer，鼠标移入了矢量对象", event);
      });
      graphicLayer.on(mars3d.EventType.mouseOut, function (event) {
        console.log("监听layer，鼠标移出了矢量对象", event);
      });

      // 可在图层绑定右键菜单,对所有加到这个图层的矢量数据都生效
      graphicLayer.bindContextMenu([
        {
          text: "删除对象",
          iconCls: "fa fa-trash-o",
          callback: function (e) {
            const graphic = e.graphic;
            if (graphic) {
              graphicLayer.removeGraphic(graphic);
            }
          },
        },
      ]);

      // 加一些演示数据
      testApi.addGraphic_e01(graphicLayer);
      testApi.addGraphic_e02(graphicLayer);
      testApi.addGraphic_e03(graphicLayer);
      testApi.addGraphic_e04(graphicLayer);
      testApi.addGraphic_e05(graphicLayer);
      testApi.addGraphic_e06(graphicLayer);
      testApi.addGraphic_e07(graphicLayer);
      testApi.addGraphic_e09(graphicLayer);
      testApi.addGraphic_e10(graphicLayer);
      testApi.addGraphic_e11(graphicLayer);
      testApi.addGraphic_e12(graphicLayer);
      testApi.addGraphic_e13(graphicLayer);
      testApi.addGraphic_e14(graphicLayer);
      testApi.addGraphic_e15(graphicLayer);
    })
    .catch(function (error) {
      console.log("加载JSON出错", error);
    });
}
init();

const testApi = {
  // 以下为演示代码
  addGraphic_e01(graphicLayer) {
    const graphic = new mars3d.graphic.LabelEntity({
      position: new mars3d.LngLatPoint(116.1, 31.0, 1000),
      style: {
        text: "Mars3D平台",
        font_size: 25,
        font_family: "楷体",
        color: "#003da6",
        outline: true,
        outlineColor: "#bfbfbf",
        outlineWidth: 2,
        horizontalOrigin: Cesiums.HorizontalOrigin.CENTER,
        verticalOrigin: Cesiums.VerticalOrigin.BOTTOM,
        visibleDepth: false,
      },
    });
    graphicLayer.addGraphic(graphic);
  },

  addGraphic_e02(graphicLayer) {
    const graphic = new mars3d.graphic.PointEntity({
      position: [116.2, 31.0, 1000],
      style: {
        color: "#ff0000",
        pixelSize: 10,
        outline: true,
        outlineColor: "#ffffff",
        outlineWidth: 2,
      },
    });
    graphicLayer.addGraphic(graphic);
  },

  addGraphic_e03(graphicLayer) {
    const graphic = new mars3d.graphic.BillboardEntity({
      name: "贴地图标",
      position: [116.3, 31.0, 1000],
      style: {
        image:
          "https://cdn.jsdelivr.net/gh/marsgis/mars3d-es5-example/example/img/marker/mark2.png",
        scale: 1,
        horizontalOrigin: Cesiums.HorizontalOrigin.CENTER,
        verticalOrigin: Cesiums.VerticalOrigin.BOTTOM,
        clampToGround: true,
      },
    });
    graphicLayer.addGraphic(graphic);
  },

  addGraphic_e04(graphicLayer) {
    const graphic = new mars3d.graphic.PlaneEntity({
      position: new mars3d.LngLatPoint(116.4, 31.0, 1000),
      style: {
        plane: new Cesiums.Plane(Cesiums.Cartesian3.UNIT_Z, 0.0),
        dimensions: new Cesiums.Cartesian2(4000.0, 4000.0),
        material: mars3d.MaterialUtil.createMaterialProperty(
          mars3d.MaterialType.Image,
          {
            image:
              "https://cdn.jsdelivr.net/gh/marsgis/mars3d-es5-example/example/img/textures/movingRiver.png",
            transparent: true,
          }
        ),
      },
    });
    graphicLayer.addGraphic(graphic);
  },

  //
  addGraphic_e05(graphicLayer) {
    const graphic = new mars3d.graphic.BoxEntity({
      position: new mars3d.LngLatPoint(116.5, 31.0, 1000),
      style: {
        dimensions: new Cesiums.Cartesian3(2000.0, 2000.0, 2000.0),
        fill: true,
        color: "#00ffff",
        opacity: 0.9,
        heading: 45,
        roll: 45,
        pitch: 0,
      },
    });
    graphicLayer.addGraphic(graphic);
  },

  addGraphic_e06(graphicLayer) {
    const graphic = new mars3d.graphic.CircleEntity({
      position: [116.1, 30.9, 1000],
      style: {
        radius: 1800.0,
        color: "#00ff00",
        opacity: 0.3,
        outline: true,
        outlineWidth: 3,
        outlineColor: "#ffffff",
        clampToGround: true,
      },
      popup: "直接传参的popup",
    });
    graphicLayer.addGraphic(graphic);
  },

  addGraphic_e07(graphicLayer) {
    const graphic = new mars3d.graphic.CylinderEntity({
      position: [116.2, 30.9, 1000],
      style: {
        length: 3000.0,
        topRadius: 0.0,
        bottomRadius: 1300.0,
        color: "#00FFFF",
        opacity: 0.7,
      },
      popup: "直接传参的popup",
    });
    graphicLayer.addGraphic(graphic);
  },
  addGraphic_e09(graphicLayer) {
    const graphic = new mars3d.graphic.ModelEntity({
      name: "消防员",
      position: [116.4, 30.9, 1000],
      style: {
        url: "http://data.mars3d.cn/gltf/mars/firedrill/xiaofangyuan-run.gltf",
        scale: 16,
        minimumPixelSize: 100,
      },
    });
    graphicLayer.addGraphic(graphic);
  },

  addGraphic_e10(graphicLayer) {
    const graphic = new mars3d.graphic.PolylineEntity({
      positions: [
        [116.5, 30.9, 1000],
        [116.52, 30.91, 1000],
        [116.53, 30.89, 1000],
      ],
      style: {
        width: 5,
        color: "#3388ff",
      },
    });
    graphicLayer.addGraphic(graphic); // 还可以另外一种写法: graphic.addTo(graphicLayer)
  },

  addGraphic_e11(graphicLayer) {
    const graphic = new mars3d.graphic.PolylineVolumeEntity({
      positions: [
        [116.1, 30.8, 1000],
        [116.12, 30.81, 1000],
        [116.13, 30.79, 1000],
      ],
      style: {
        shape: "pipeline",
        radius: 80,
        color: "#3388ff",
        opacity: 0.9,
      },
    });
    graphicLayer.addGraphic(graphic); // 还可以另外一种写法: graphic.addTo(graphicLayer)
  },

  addGraphic_e12(graphicLayer) {
    const graphic = new mars3d.graphic.CorridorEntity({
      positions: [
        [116.2, 30.8, 1000],
        [116.22, 30.81, 1000],
        [116.23, 30.79, 1000],
        [116.247328, 30.806077, 610.41],
      ],
      style: {
        width: 500,
        color: "#3388ff",
      },
    });
    graphicLayer.addGraphic(graphic); // 还可以另外一种写法: graphic.addTo(graphicLayer)
  },

  addGraphic_e13(graphicLayer) {
    const graphic = new mars3d.graphic.WallEntity({
      positions: [
        [116.3, 30.8, 1000],
        [116.31, 30.81, 1000],
        [116.334639, 30.800735, 721.39],
        [116.32, 30.79, 1000],
      ],
      style: {
        closure: true,
        diffHeight: 500,
        // 动画线材质
        material: mars3d.MaterialUtil.createMaterialProperty(
          mars3d.MaterialType.LineFlow,
          {
            image:
              "https://cdn.jsdelivr.net/gh/marsgis/mars3d-es5-example/example/img/textures/fence.png",
            color: "#00ff00",
            speed: 10,
            axisY: true,
          }
        ),
      },
    });
    graphicLayer.addGraphic(graphic); // 还可以另外一种写法: graphic.addTo(graphicLayer)
  },

  addGraphic_e14(graphicLayer) {
    const graphic = new mars3d.graphic.RectangleEntity({
      positions: [
        [116.383144, 30.819978, 444.42],

        [116.42216, 30.793431, 1048.07],
      ],
      style: {
        color: "#3388ff",
        opacity: 0.5,
        outline: true,
        outlineWidth: 3,
        outlineColor: "#ffffff",
      },
    });
    graphicLayer.addGraphic(graphic); // 还可以另外一种写法: graphic.addTo(graphicLayer)
  },

  addGraphic_e15(graphicLayer) {
    const graphic = new mars3d.graphic.PolygonEntity({
      positions: [
        [116.510278, 30.834372, 567.29],
        [116.530085, 30.809331, 448.31],
        [116.507367, 30.788551, 98.21],
        [116.472468, 30.823091, 677.39],
      ],
      style: {
        material: mars3d.MaterialUtil.createMaterialProperty(
          mars3d.MaterialType.Water,
          {
            normalMap:
              "https://cdn.jsdelivr.net/gh/marsgis/mars3d-es5-example/example/img/textures/waterNormals.jpg", // 水正常扰动的法线图
            frequency: 8000.0, // 控制波数的数字。
            animationSpeed: 0.02, // 控制水的动画速度的数字。
            amplitude: 5.0, // 控制水波振幅的数字。
            specularIntensity: 0.8, // 控制镜面反射强度的数字。
            baseWaterColor: "#006ab4", // rgba颜色对象基础颜色的水。#00ffff,#00baff,#006ab4
            blendColor: "#006ab4", // 从水中混合到非水域时使用的rgba颜色对象。
          }
        ),
      },
    });
    graphicLayer.addGraphic(graphic); // 还可以另外一种写法: graphic.addTo(graphicLayer)
  },
};
