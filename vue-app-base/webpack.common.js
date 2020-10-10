const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin') // 配合 vue-loader 使用，用于编译转换 .vue 文件

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'js/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      // 它会应用到普通的 `.css` 文件
      // 以及 `.vue` 文件中的 `<style>` 块
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test:/\.(png|jpe?g|gif)$/,
        use: {
          loader: 'file-loader',
          options:{
            outputPath: 'img',
            name: '[name].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      // 值要求的是一个代码片段
      BASE_URL: JSON.stringify('')
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'webpack 作业',
      template: './src/index.html'
    })
  ]
}