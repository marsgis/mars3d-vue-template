import * as mars3d from "mars3d"

/**
 * 矢量对象高亮闪烁(仅Entity)
 *
 * @param {object} [options] 参数对象，包括以下：
 * @param {string} [options.name]  标题名称
 * @param {string} [options.type]  类型标识，自动赋值的，无需手动传入
 * @param {number} [options.start]  开始时间，相当于map.clock.startTime的秒数
 * @param {number} [options.duration]  时长
 *
 * @param {string|number} [options.layerId]  图层ID
 * @param {string|number} [options.graphicId]  矢量对象ID
 *
 * @param {number} [options.step=10] 闪烁增量, 控制速度
 * @param {string} [options.color] 高亮的颜色
 * @param {number} [options.maxAlpha=0.3] 闪烁的最大透明度，从 0 到 maxAlpha 渐变
 */
export class FlickerEntity extends mars3d.TaskItem {
  // 进入，激活开始处理事务
  _activateWork() {
    const layer = this._map.getLayerById(this.options.layerId)
    if (layer) {
      layer.show = true
      layer.readyPromise.then(() => {
        this._graphic = layer.getGraphicById(this.options.graphicId)
        if (this._graphic) {
          this._graphic.show = true
          this._graphic.startFlicker({
            time: this._duration,
            step: this.options.step,
            maxAlpha: this.options.maxAlpha,
            color: this.options.color
          })
        }
      })
    }
  }

  // 离开，释放相关对象
  _disableWork() {
    if (this._graphic) {
      this._graphic.stopFlicker()
    }
  }
}
mars3d.thing.Task.register("flickerEntity", FlickerEntity)
