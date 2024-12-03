import * as mars3d from "mars3d"

/**
 * 单个视角定位
 *
 * @param {object} [options] 参数对象，包括以下：
 * @param {string} [options.name]  标题名称
 * @param {string} [options.type]  类型标识，自动赋值的，无需手动传入
 * @param {number} [options.start]  开始时间，相当于map.clock.startTime的秒数
 * @param {number} [options.duration]  时长
 *
 * @param {object} [options.center]  视角参数
 */
export class CameraView extends mars3d.TaskItem {
  // 进入，激活开始处理事务
  _activateWork() {
    this._map.setCameraView(this.options.center, { duration: this._duration })
  }

  // 离开，释放相关对象
  _disableWork() {
    this._map.cancelFlyTo()
  }
}
mars3d.thing.Task.register("camera", CameraView)
