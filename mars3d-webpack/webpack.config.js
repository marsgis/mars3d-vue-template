const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 引入

const cesiumSourcePath = "node_modules/mars3d-cesium/Build/Cesium/"; // cesium库安装目录
const cesiumRunPath = "./mars3d-cesium/"; // cesium运行时路径

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      { test: /\.css$/, use: ["style-loader", "css-loader"], },
      { test: /\.js$/, use: { loader: 'babel-loader', options: { plugins: ['@babel/plugin-proposal-class-properties'] } } }
    ],
  },
  devServer: {
    compress: true,
    port: 5001,
  }, 
  plugins: [
    new HtmlWebpackPlugin({ template: "index.html" }),
    // CESIUM_BASE_URL是标识cesium资源所在的主目录，其内部资源加载、多线程等处理时需要用到
    new webpack.DefinePlugin({
      CESIUM_BASE_URL: JSON.stringify(cesiumRunPath),
    }),
    // Cesium相关资源目录需要拷贝到系统目录下面（部分CopyWebpackPlugin版本的语法可能没有patterns）
    new CopyWebpackPlugin({
      patterns: [
        { from: path.join(__dirname, "public/"), to: path.join(__dirname, "dist/"), }, 
       
        { from: path.join(cesiumSourcePath, 'Workers'), to: path.join(cesiumRunPath, 'Workers') },
        { from: path.join(cesiumSourcePath, 'Assets'), to: path.join(cesiumRunPath, 'Assets') },
        { from: path.join(cesiumSourcePath, 'ThirdParty'), to: path.join(cesiumRunPath, 'ThirdParty') },
        { from: path.join(cesiumSourcePath, 'Widgets'), to: path.join(cesiumRunPath, 'Widgets') }
      ]  
    }),
  ],
};
