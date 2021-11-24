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

    let cesiumRunPath = config.output.publicPat || './cesium/' //cesium运行时主目录
    let plugins = [
      //标识cesium资源所在的主目录，cesium内部资源加载、多线程等处理时需要用到
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify(cesiumRunPath)
      }),
      //cesium相关资源目录需要拷贝到系统目录下面
      new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Workers'), to: cesiumRunPath + 'Workers' }]),
      new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Assets'), to: cesiumRunPath + 'Assets' }]),
      new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'ThirdParty'), to: cesiumRunPath + 'ThirdParty' }]),
      new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Widgets'), to: cesiumRunPath + 'Widgets' }])
    ]

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
