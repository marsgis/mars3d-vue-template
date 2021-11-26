/**
 * ts下为window定义全局变量
 * @copyright 火星科技 mars3d.cn
 * @author 木遥 2021-11-01
 */

export {}
declare global {
  interface Window {
    mars3d: any
    configLibs:any
    $message: any
    $alert: any
    $notify: any
    $showLoading: any
    $hideLoading: any
  }
}
