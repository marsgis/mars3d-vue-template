<template>
  <div id="centerDiv" class="mapcontainer">
    <Map :url="configUrl" @onload="onMapload" />
  </div>
</template>

<script>
import Map from "mars-map/Main.vue";
import * as Cesium from 'cesium/Cesium';
import mars3d from '../components/mars-map/mars3d/mars3d';

import axios from 'axios';


export default {
  name: "Index",

  components: {
    Map
  },

  data() {
    return {
      configUrl: "config/config.json"
    };
  },

  methods: {
    //地图构造完成回调
    onMapload(viewer) {
      this.addPointToMap(viewer);
    },
    //获取示例点数据
    getPointData() {
      const url = "http://data.marsgis.cn/file/apidemo/qiye/point.json";
      const data = "";
      return axios
        .get(url, {
          params: data
        })
        .then(res => {
          return Promise.resolve(res.data);
        });
    },
    //添加示例点数据  
    addPointToMap(viewer) {
      this.getPointData().then(data => {
        var dataSource = new Cesium.CustomDataSource();
        viewer.dataSources.add(dataSource);

        for (var item of data.Data) {
          var position = Cesium.Cartesian3.fromDegrees(item.JD, item.WD, 2);

          //添加实体
          var entity = dataSource.entities.add({
            name: item.JC,
            position: position,
            point: {
              //像素点
              color: new Cesium.Color.fromCssColorString("#3388ff"),
              pixelSize: 10,
              outlineColor: new Cesium.Color.fromCssColorString("#ffffff"),
              outlineWidth: 2,
              scaleByDistance: new Cesium.NearFarScalar(1000, 1, 1000000, 0.1)
            },
            label: {
              text: item.JC,
              font: "16px 楷体",
              style: Cesium.LabelStyle.FILL_AND_OUTLINE,
              fillColor: Cesium.Color.AZURE,
              outlineColor: Cesium.Color.BLACK,
              outlineWidth: 2,
              horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
              verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
              pixelOffset: new Cesium.Cartesian2(0, -10), //偏移量
              distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                0.0,
                200000
              )
            },
            data: item,
            click: (entity)=> {
              //单击回调 
              this.$message({message: "您单击了：" + entity.data.JC})
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="less">
.mapcontainer {
  position: relative;
  height: 100%;
  overflow: hidden;
}
</style>
