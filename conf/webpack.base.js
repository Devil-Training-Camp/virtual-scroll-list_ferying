const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  module: {
    rules: [//配置loader
      {
        test: /\.tsx?$/,
        use: [
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
  plugins: [
    new MiniCssExtractPlugin({ //提取css文件
      filename: "[name]_[hash:8].css", //设置输出的文件名
      chunkFilename: "[id].css",//  设置代码分割后的文件名
    }),
  ],
};

