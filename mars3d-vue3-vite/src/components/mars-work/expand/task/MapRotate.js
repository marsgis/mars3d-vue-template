import * as mars3d from "mars3d"

/**
 * 地球自旋转
 *
 * @param {object} [options] 参数对象，包括以下：
 * @param {string} [options.name]  标题名称
 * @param {string} [options.type]  类型标识，自动赋值的，无需手动传入
 * @param {number} [options.start]  开始时间，相当于map.clock.startTime的秒数
 * @param {number} [options.duration]  时长
 *
 * @param {object} [options.center]  初始视角
 * @param {number} [options.speed]  旋转速度
 */
export class MapRotate extends mars3d.TaskItem {
  constructor(options = {}) {
    super(options)

    this._speed = this.options.speed || 0.01
    this._center = this.options.center || { lat: 29.093038, lng: 108.804459, alt: 23321232.7, heading: 0, pitch: -90 }
  }

  // 进入，激活开始处理事务
  _activateWork() {
    this._map.setCameraView(this._center, {
      duration: 1,
      complete: () => {
        this._map.on(mars3d.EventType.clockTick, this._map_onClockTick, this)
      }
    })
  }

  // 离开，释放相关对象
  _disableWork() {
    this._map.off(mars3d.EventType.clockTick, this._map_onClockTick, this)
  }

  _map_onClockTick() {
    if (this.isPause) {
      return // 暂停时不执行
    }

    this._map.scene.camera.rotate(mars3d.Cesium.Cartesian3.UNIT_Z, this._speed)
  }
}
mars3d.thing.Task.register("mapRotate", MapRotate)
