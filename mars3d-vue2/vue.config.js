const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')


module.exports = {
  publicPath: './',
  assetsDir: './static',
  productionSourceMap: false,
  lintOnSave: true, // 是否开启eslint
  // 它支持webPack-dev-server的所有选项
  devServer: {
    host: 'localhost', // 也可以直接写IP地址这样方便真机测试
    port: 3001, // 端口号
    https: false, // https:{type:Boolean}
    open: true // 配置自动启动浏览器
  },
  configureWebpack: (config) => {


    // let cesiumSourcePath = 'node_modules/mars3d-cesium/Build/Cesium/' //cesium库目录
    // let cesiumRunPath = config.output.publicPath || './cesium/' //cesium运行时主目录
    let plugins = [
      //标识cesium资源所在的主目录，cesium内部资源加载、多线程等处理时需要用到
      // new webpack.DefinePlugin({
      //   CESIUM_BASE_URL: JSON.stringify(cesiumRunPath)
      // }),
      // //cesium相关资源目录需要拷贝到系统目录下面
      // new CopyWebpackPlugin([{ from: path.join(cesiumSourcePath, 'Workers'), to: path.join(config.output.path, cesiumRunPath, 'Workers') }]),
      // new CopyWebpackPlugin([{ from: path.join(cesiumSourcePath, 'Assets'), to: path.join(config.output.path, cesiumRunPath, 'Assets') }]),
      // new CopyWebpackPlugin([{ from: path.join(cesiumSourcePath, 'ThirdParty'), to: path.join(config.output.path, cesiumRunPath, 'ThirdParty') }]),
      // new CopyWebpackPlugin([{ from: path.join(cesiumSourcePath, 'Widgets'), to: path.join(config.output.path, cesiumRunPath, 'Widgets') }])
    ]


    return {
      module: {
        unknownContextCritical: false,
        rules: [
          {
            test: /\.js$/,
            enforce: 'pre',
            include: path.resolve(__dirname, 'node_modules/mars3d-cesium/Source'),
            sideEffects: false
          }
        ]
      },
      optimization: {
        usedExports: true,
        splitChunks: {
          maxInitialRequests: Infinity,
          minSize: 0,
          maxSize: 250000,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              chunks: 'all',
              name(module) {
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                return `npm.${packageName.replace('@', '')}`
              }
            },
            // commons: {
            //   name: 'Cesium',
            //   test: /[\\/]node_modules[\\/]mars3d-cesium[\\/]Build[\\/]Cesium/,
            //   priority: 10,
            //   chunks: 'all'
            // }
          }
        }
      },
      output: {
        sourcePrefix: ' '
      },
      amd: {
        toUrlUndefined: true
      },
      resolve: {
        alias: {
          vue$: 'vue/dist/vue.esm.js',
          '@': path.resolve('src')
        }
      },
      node: {
        fs: 'empty',
        Buffer: false,
        http: 'empty',
        https: 'empty',
        zlib: 'empty'
      },
      plugins: plugins
    }
  }
}
