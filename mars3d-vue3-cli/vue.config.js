const path = require('path')
const { getThemeVariables } = require('ant-design-vue/dist/theme')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const cesiumSource = 'node_modules/mars3d-cesium/Build/Cesium/'

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.BASE_URL,
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: false,
  configureWebpack: (config) => {
    let plugins = []
    if (process.env.NODE_ENV === 'production') {
      plugins = [
        new webpack.DefinePlugin({
          CESIUM_BASE_URL: JSON.stringify('./static')
        }),
        new CopyWebpackPlugin({
          patterns: [
            { from: path.join(cesiumSource, 'Workers'), to: './static/Workers' },
            { from: path.join(cesiumSource, 'Assets'), to: './static/Assets' },
            { from: path.join(cesiumSource, 'ThirdParty'), to: './static/ThirdParty' },
            { from: path.join(cesiumSource, 'Widgets'), to: './static/Widgets' }
          ]
        })
      ]
    } else {
      plugins = [
        new webpack.DefinePlugin({
          CESIUM_BASE_URL: JSON.stringify('./')
        }),
        new CopyWebpackPlugin({
          patterns: [
            { from: path.join(cesiumSource, 'Workers'), to: './Workers' },
            { from: path.join(cesiumSource, 'Assets'), to: './Assets' },
            { from: path.join(cesiumSource, 'ThirdParty'), to: './ThirdParty' },
            { from: path.join(cesiumSource, 'Widgets'), to: './Widgets' }
          ]
        })
      ]
    }
    config.plugins = [
      ...config.plugins,
      ...plugins
    ]
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@comp', resolve('src/components'))
  },
  css: {
    requireModuleExtension: true,
    loaderOptions: {
      less: {
        modifyVars: {
          ...getThemeVariables({
            dark: true
          })
        },

        javascriptEnabled: true
      }
    }
  }
}
