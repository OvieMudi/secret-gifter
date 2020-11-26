const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  node: {
    fs: 'empty',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.(jpg|png|svg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: './index.html',
      favicon: './public/favicon.ico',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    port: 8082,
    open: true,
    historyApiFallback: true,
    hot: true,
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      '@assets': path.resolve('src/assets'),
      '@common': path.resolve('src/components/common'),
      '@utils': path.resolve('src/utils'),
    },
  },
  devtool: 'eval-source-map',
};
