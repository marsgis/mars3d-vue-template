/**
 * 公共静态Util方法
 *
 * @copyright 火星科技 mars3d.cn
 * @author 木遥 2021-11-01
 */
 
/**
 * 判断是否是pc端
 *
 * @export
 * @return { boolean } 是否是pc端
 */
 export function isPc () {
  const userAgentInfo = navigator.userAgent
  const Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"]
  let flag = true
  for (let v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false
      break
    }
  }
  return flag
}
