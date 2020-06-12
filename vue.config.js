const path = require("path");
const webpack = require("webpack");
const CompressionPlugin = require("compression-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const cesiumSource = "node_modules/cesium/Source";
const cesiumWorkers = "../Build/Cesium/Workers";

module.exports = {
  publicPath: "/",

  lintOnSave: false,

  productionSourceMap: false,

  devServer: {
    host: "localhost",
    port: 3001, // 端口号
    https: false,
    open: true
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
