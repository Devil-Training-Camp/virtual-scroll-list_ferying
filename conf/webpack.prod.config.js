// 引入路径模块
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js'); // 公共配置

const prodConfig = {
  mode: "production",//设置打包的模式
  entry: path.join(__dirname, "../src/index.tsx"), //'./src/index.ts',
  output: {
    path: path.resolve(__dirname, "../dist"),
    // filename: "[name]_[hash:8].js",//设置输出的文件名
    filename: "index.js",
    libraryTarget: "umd", // 采用通用模块定义
    libraryExport: "default", // 兼容 ES6 Module、CommonJS 和 AMD 模块规范
    environment: { //配置打包环境
      arrowFunction: false, //不使用箭头函数
      const: false,//不使用const
    },
  },
  
  plugins: [
    new CleanWebpackPlugin(), //清理dist文件夹
  ]
};
module.exports = merge(baseConfig, prodConfig); // 合并配置
