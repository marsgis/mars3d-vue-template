const path = require("path")
const webpack = require("webpack")
const CopyWebpackPlugin = require("copy-webpack-plugin")

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.BASE_URL,
  outputDir: "dist",
  assetsDir: "static",
  productionSourceMap: false,
  configureWebpack: (config) => {
    // console.log(config)
    // const cesiumRunPath = path.join(config.output.path, config.output.publicPath) // cesium运行时主目录
    const cesiumRunPath = "./cesium" // cesium运行时主目录

    const cesiumSourcePath = "node_modules/mars3d-cesium/Build/Cesium/" // cesium库目录

    const plugins = [
      // 标识cesium资源所在的主目录，cesium内部资源加载、多线程等处理时需要用到
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify(cesiumRunPath)
      }),
      // cesium相关资源目录需要拷贝到系统目录下面
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.join(cesiumSourcePath, "Workers"),
            to: path.join(config.output.path, cesiumRunPath, "Workers")
          },
          {
            from: path.join(cesiumSourcePath, "Assets"),
            to: path.join(config.output.path, cesiumRunPath, "Assets")
          },
          {
            from: path.join(cesiumSourcePath, "ThirdParty"),
            to: path.join(config.output.path, cesiumRunPath, "ThirdParty")
          },
          {
            from: path.join(cesiumSourcePath, "Widgets"),
            to: path.join(config.output.path, cesiumRunPath, "Widgets")
          }
        ]
      })
    ]

    config.plugins = [...config.plugins, ...plugins]
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@comp", resolve("src/components"))
  },
  css: {
    requireModuleExtension: true,
    loaderOptions: {
      less: {
        modifyVars: {
          "border-color-base": "#cde1de",
          "primary-color": "#4db3ff",
          "body-background": "#1c222b",
          "font-size-base": "12px"
        },
        javascriptEnabled: true
      }
    }
  }
}
