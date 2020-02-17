// vue.config.js 配置说明
//官方vue.config.js 参考文档 https://cli.vuejs.org/zh/config/#css-loaderoptions
// 这里只列一部分，具体配置参考文档

const webpack = require('webpack')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const cesiumSource = 'node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';

module.exports = {
  baseUrl: './',
  assetsDir: './static',
  productionSourceMap: false,
  devServer: {
    host: "localhost", //也可以直接写IP地址这样方便真机测试
    port: 3001, // 端口号
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
  },
  chainWebpack: config => {
    config
      .node.set('fs', 'empty').end()
      .resolve.alias.set('cesium', path.resolve(__dirname, cesiumSource)).end().end()
      .amd({
        toUrlUndefined: true
      })
      .module
      .set('unknownContextCritical', false)
      .rule()
      .include
      .add(path.resolve(__dirname, cesiumSource))
      .end()
      .post()
      .pre()
      .test(/\.js$/)
      .use('strip')
      .loader('strip-pragma-loader')
      .options({
        pragmas: {
          debug: false
        }
      })
      .end()
      .end()
  },
  configureWebpack: config => {
    let plugins = [];
    if (process.env.NODE_ENV === 'production') {
      plugins = [
        new webpack.DefinePlugin({
          'CESIUM_BASE_URL': JSON.stringify('static')
        }),
        new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Assets'), to: 'static/Assets' }]),
        new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'ThirdParty'), to: 'static/ThirdParty' }]),
        new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Widgets'), to: 'static/Widgets' }]),
        new CopyWebpackPlugin([{ from: path.join(cesiumSource, cesiumWorkers), to: 'static/Workers' }]),
      ]
    } else {
      plugins = [
        new webpack.DefinePlugin({
          'CESIUM_BASE_URL': JSON.stringify('')
        }),
        new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Assets'), to: 'Assets' }]),
        new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'ThirdParty'), to: 'ThirdParty' }]),
        new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' }]),
        new CopyWebpackPlugin([{ from: path.join(cesiumSource, cesiumWorkers), to: 'Workers' }]),
      ]
    }
    return {
      plugins: plugins
    }
  }
}