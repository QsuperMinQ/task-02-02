const webpack = require('webpack');
const common = require('./webpack.common');
const { default: merge } = require('webpack-merge');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  devServer: {
    host: 'localhost',
    port: '2001',
    open: true,
    hot: true,
    contentBase: 'public'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})
