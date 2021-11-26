/**
 * 公共静态Util方法
 *
 * @copyright 火星科技 mars3d.cn
 * @author 木遥 2021-11-01
 */


/**
 * 判断是否 "经度,纬度" 字符串值
 *
 * @export
 * @param {string} text
 * @return {*}  {boolean}
 */
 export function isLonLat(text: string): boolean {
  const reg = /^-?((0|1?[0-7]?[0-9]?)(([.][0-9]*)?)|180(([.][0]*)?)),-?((0|[1-8]?[0-9]?)(([.][0-9]*)?)|90(([.][0]*)?))$/
  return reg.test(text)
}

/**
 * 设置自动高度值
 *
 * @export
 * @param {(v: number) => void} callback
 * @param {number} [lose=0]
 * @param {string} [container="sanbox-warpper"]
 * @return {*}  {number}
 */
export function setAutoHeight(callback: (v: number) => void, lose = 0, container = "sanbox-warpper"): number {
  const wapper = document.getElementById(container)
  let wapperHeight = wapper?.clientHeight || 0

  window.onresize = () => {
    wapperHeight = wapper?.clientHeight || 0
    const resizeHeight = wapperHeight - lose
    callback(resizeHeight)
  }
  return wapperHeight - lose
}

/**
 *  获取URL参数
 *
 * @export
 * @param {string} parameter
 * @return {*}  {(string | null)}
 */
export function getQueryString(parameter: string): string | null {
  return new URL(window.location.href).searchParams.get(parameter)
}
