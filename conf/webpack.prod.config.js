// 引入路径模块
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js'); // 公共配置

const prodConfig = {
  mode: "production",//设置打包的模式
  devtool: false,//不生成source-map
  entry: path.join(__dirname, "../src/index.tsx"), //'./src/index.ts',
  output: {
    path: path.resolve(__dirname, "../dist"),
    // filename: "[name]_[hash:8].js",//设置输出的文件名
    filename: "index.js",
    // libary: "react-component-template", // 指定库的全局变量
    libraryTarget: "umd", // 采用通用模块定义
    // libraryExport: "default", //指定哪一个导出应该被暴露为一个库。
    environment: { //配置打包环境
      arrowFunction: false, //不使用箭头函数
      const: false,//不使用const
    },
  },

  externals: { //不打包react和react-dom
    'react': 'react',
    "react-dom": 'reackt-dom',
  },
  optimization: { //配置代码分割
    usedExports:true  
  },
  
  plugins: [
    new CleanWebpackPlugin(), //清理dist文件夹
  ]
};
module.exports = merge(baseConfig, prodConfig); // 合并配置
