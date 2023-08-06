// 引入路径模块
const path = require("path");
const HTMLWebPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
//   entry: path.join(__dirname, "../src/index.ts"), //'./src/index.ts',
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name]_[hash:8].js",//设置输出的文件名
    environment: { //配置打包环境
      arrowFunction: false, //不使用箭头函数
      const: false,//不使用const
    },
  },
  module: {
    rules: [//配置loader
      {
        test: /\.tsx?$/,
        use: [
          // {
          //     loader: 'babel-loader', 
          //     options: {
          //         presets: ['@babel/preset-env']
          //     }
          // },
          "ts-loader",
        ],
        exclude: /node_modules/, //排除node_modules目录
      },
      //添加解析样式文件的功能
      {
        test: /\.s?css$/, 
        use: [
          MiniCssExtractPlugin.loader, //提取css文件
          "css-loader",
          "sass-loader",
          // {
          //     loader: "postcss-loader",
          //     options: {
          //         postcssOptions: {
          //             plugins: [
          //                 [
          //                     "postcss-preset-env", {
          //                         browsers: 'last 2 versions'
          //                     }
          //                 ]
          //             ]
          //         }
          //     }
          // }
        ],
      },
      {
        test: /\.(jpg|png|jpeg)$/i, 
        type: "asset/inline", //url-loader
        parser: {
          dataUrlCondition: {//图片小于8kb，就会被转换为base64
            maxSize: 1024,
          },
        },
      },
    ],
  },
  resolve: {//配置解析模块的规则
    extensions: [".ts", ".tsx", ".js", ".jsx"], //配置可以省略的文件后缀名
  },
  mode: "development",//设置打包的模式
  plugins: [
    new HTMLWebPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({ //提取css文件
      filename: "[name]_[hash:8].css", //设置输出的文件名
      chunkFilename: "[id].css",//  设置代码分割后的文件名
    }),
    new CleanWebpackPlugin(), //清理dist文件夹
  ],
  devServer: { //配置开发服务器
    host: "localhost",//服务器的ip地址
    port: 8085,
    open: true,
  },
};

