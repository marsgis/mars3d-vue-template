// vue.config.js 配置说明
// 这里只列一部分，具体配置参考官方文档https://cli.vuejs.org/zh/config/#css-loaderoptions
const webpack = require('webpack')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')


module.exports = {
  publicPath: './',
  assetsDir: './static',
  productionSourceMap: false,
  lintOnSave: true, // 是否开启eslint
  // 它支持webPack-dev-server的所有选项
  devServer: {
    open: true
  },
  configureWebpack: (config) => {

    let cesiumSourcePath = 'node_modules/mars3d-cesium/Build/Cesium/' //cesium库目录
    let cesiumRunPath = config.output.publicPath || './cesium/' //cesium运行时主目录
    let plugins = [
      //标识cesium资源所在的主目录，cesium内部资源加载、多线程等处理时需要用到
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify(cesiumRunPath)
      }),
      //cesium相关资源目录需要拷贝到系统目录下面
      new CopyWebpackPlugin([{ from: path.join(cesiumSourcePath, 'Workers'), to: path.join(config.output.path,cesiumRunPath, 'Workers') }]),
      new CopyWebpackPlugin([{ from: path.join(cesiumSourcePath, 'Assets'), to: path.join(config.output.path,cesiumRunPath, 'Assets') }]),
      new CopyWebpackPlugin([{ from: path.join(cesiumSourcePath, 'ThirdParty'), to: path.join(config.output.path,cesiumRunPath, 'ThirdParty') }]),
      new CopyWebpackPlugin([{ from: path.join(cesiumSourcePath, 'Widgets'), to: path.join(config.output.path,cesiumRunPath, 'Widgets') }])
    ]


    return {
      module: {
        unknownContextCritical: false,
        rules: [
          {
            test: /\.js$/,
            enforce: 'pre',
            include: path.resolve(__dirname, 'node_modules/mars3d-cesium/Source'),
            sideEffects: false,
            use: [
              {
                loader: 'strip-pragma-loader',
                options: {
                  pragmas: {
                    debug: false
                  }
                }
              }
            ]
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
            commons: {
              name: 'Cesium',
              test: /[\\/]node_modules[\\/]mars3d-cesium[\\/]Build[\\/]Cesium/,
              priority: 10,
              chunks: 'all'
            }
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
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: 'marsgis.cn', // 开发者标示
        win: {
          icon: 'mars3d.ico' // windows系统中icon需要256*256的ico格式图片，更换应用图标亦在此处
        },
        nsis: {
          // nsis配置参数
          oneClick: false, // 可单击打开
          allowToChangeInstallationDirectory: true, // 允许用户选择安装位置
          perMachine: true
        }
      }
    }
  }
}
