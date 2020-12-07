// vue.config.js 配置说明
// 这里只列一部分，具体配置参考官方文档https://cli.vuejs.org/zh/config/#css-loaderoptions

const path = require("path");
const webpack = require("webpack");
const CompressionPlugin = require("compression-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const cesiumSource = "node_modules/cesium/Source";
const cesiumWorkers = "../Build/Cesium/Workers";

module.exports = {
  publicPath: "/",

  //是否使用eslint
  lintOnSave: false,

  /**
   * 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
   *  打包之后发现map文件过大，项目文件体积很大，设置为false就可以不输出map文件
   *  map文件的作用在于：项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。
   *  有了map就可以像未加密的代码一样，准确的输出是哪一行哪一列有错。
   * */
  productionSourceMap: false,

  // 它支持webPack-dev-server的所有选项
  devServer: {
    host: "localhost", //也可以直接写IP地址这样方便真机测试
    port: 3001, // 端口号
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
  },

  chainWebpack: config => {
    config.node
      .set("fs", "empty")
      .end()
      .resolve.alias.set("cesium", path.resolve(__dirname, cesiumSource))
      .set("mars-map", path.resolve(__dirname, "./src/components/mars-map"))
      .set("mars-ui", path.resolve(__dirname, "./src/components/mars-ui"))
      .end()
      .end()
      .amd({
        toUrlUndefined: true
      })
      .module.set("unknownContextCritical", false)
      .rule()
      .include.add(path.resolve(__dirname, cesiumSource))
      .end()
      .post()
      .pre()
      .test(/\.js$/)
      .use("strip")
      .loader("strip-pragma-loader")
      .options({
        pragmas: {
          debug: false
        }
      })
      .end()
      .end();
  },

  configureWebpack: () => {
    if (process.env.NODE_ENV === "production") {
      return {
        plugins: [
          new CompressionPlugin({
            test: /\.js$|\.html$|\.css/,
            threshold: 10240,
            deleteOriginalAssets: false
          }),
          new webpack.DefinePlugin({ CESIUM_BASE_URL: JSON.stringify("static") }),
          new CopyWebpackPlugin([{ from: path.join(cesiumSource, "Assets"), to: "static/Assets" }]),
          new CopyWebpackPlugin([{ from: path.join(cesiumSource, "ThirdParty"), to: "static/ThirdParty" }]),
          new CopyWebpackPlugin([{ from: path.join(cesiumSource, "Widgets"), to: "static/Widgets" }]),
          new CopyWebpackPlugin([{ from: path.join(cesiumSource, cesiumWorkers), to: "static/Workers" }])
          // new BundleAnalyzerPlugin()
        ]
      };
    } else {
      return {
        devtool: "source-map",
        plugins: [
          new webpack.DefinePlugin({ CESIUM_BASE_URL: JSON.stringify("") }),
          new CopyWebpackPlugin([
            { from: path.join("./public", "data"), to: "data" },
            { from: path.join(cesiumSource, "Assets"), to: "Assets" },
            { from: path.join(cesiumSource, "ThirdParty"), to: "ThirdParty" },
            { from: path.join(cesiumSource, "Widgets"), to: "Widgets" },
            { from: path.join(cesiumSource, cesiumWorkers), to: "Workers" }
          ])
        ]
      };
    }
  }
};
