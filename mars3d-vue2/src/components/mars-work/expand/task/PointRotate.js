import * as mars3d from "mars3d"

/**
 * 内或外旋转
 * @param {object} [options] 参数对象，包括以下：
 * @param {string} [options.name]  标题名称
 * @param {string} [options.type]  类型标识，自动赋值的，无需手动传入
 * @param {number} [options.start]  开始时间，相当于map.clock.startTime的秒数
 * @param {number} [options.duration]  时长
 *
 * @param {boolean} [options.isRotateOut]  true:绕外旋转 ,false:绕内旋转
 * @param {boolean} [options.direction=false] 旋转方向, true逆时针，false顺时针
 * @param {number} [options.time=60] 飞行一周所需时间(单位 秒)，控制速度
 * @param {boolean} [options.autoStop]  是否自动停止
 * @param {number} [options.autoStopAngle]  自动停止的角度值（0-360度），未设置时不自动停止
 * @param {object} [options.point]  绕点旋转对应的中心点位置
 */
export class PointRotate extends mars3d.TaskItem {
  // 进入，激活开始处理事务
  _activateWork() {
    if (this.options.center) {
      this._map.setCameraView(this.options.center, { duration: 0 })
    }

    if (this.options.autoStop) {
      delete this.options.autoStopAngle // 是否自动停止
    }

    if (this.options.isRotateOut) {
      this._rotateOut = new mars3d.thing.RotateOut(this.options)
      this._map.addThing(this._rotateOut)
    } else {
      this._rotatePoint = new mars3d.thing.RotatePoint(this.options)
      this._map.addThing(this._rotatePoint)
    }

    if (this.options.isRotateOut) {
      this._rotateOut.start()
    } else {
      this._rotatePoint.start(this.options.point)
    }
  }

  // 离开，释放相关对象
  _disableWork() {
    if (this._rotatePoint) {
      this._rotatePoint.stop()
      this._rotatePoint.destroy()
      delete this._rotatePoint
    }
    if (this._rotateOut) {
      this._rotateOut.stop()
      this._rotateOut.destroy()
      delete this._rotateOut
    }
  }
}
mars3d.thing.Task.register("pointRotate", PointRotate)
