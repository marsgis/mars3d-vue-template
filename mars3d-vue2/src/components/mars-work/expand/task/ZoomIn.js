import * as mars3d from "mars3d"

/**
 * 放大地图
 *
 * @param {object} [options] 参数对象，包括以下：
 * @param {string} [options.name]  标题名称
 * @param {string} [options.type]  类型标识，自动赋值的，无需手动传入
 * @param {number} [options.start]  开始时间，相当于map.clock.startTime的秒数
 * @param {number} [options.duration]  时长
 *
 * @param {number} [options.relativeAmount=2]  相对量
 */
export class ZoomIn extends mars3d.TaskItem {
  // 进入，激活开始处理事务
  _activateWork() {
    this._map.zoomIn(this.options.relativeAmount)
  }
}
mars3d.thing.Task.register("zoomIn", ZoomIn)
