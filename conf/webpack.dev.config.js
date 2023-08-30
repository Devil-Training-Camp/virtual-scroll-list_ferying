// 引入路径模块
const path = require("path");
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js'); // 公共配置
const HTMLWebPlugin = require("html-webpack-plugin");

const devConfig = {
  mode: "development",//设置打包的模式
  entry: path.join(__dirname, "../demo/index.tsx"), // 入口，处理资源文件的依赖关系

  plugins: [
    new HTMLWebPlugin({
      template: "./public/index.html",
    }),
  ],

  devServer: {
    // static: path.join(__dirname, '../demo/'), // 静态资源目录
    // compress: true, // gzip压缩
    host: 'localhost',
    port: 8085, // 启动端口
    open: true // 打开浏览器
  },
};

module.exports = merge(baseConfig, devConfig); // 合并配置

