const webpack = require('webpack');
const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

module.exports = {
  devtool: isProd ? 'hidden-source-map' : 'cheap-eval-source-map',
  context: path.join(__dirname, './src'),
  entry: {
    app: './index.js',
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'mobx',
      'mobx-promise',
      'mobx-react'
    ]
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'scripts/[name]_[chunkhash].js',
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader'
        ],
        exclude: path.resolve(__dirname, 'src/assets/spritesheets') 
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: [
          'react-hot',
          'babel-loader'
        ]
      },
      { 
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader"),
        include: path.resolve(__dirname, 'src/assets/spritesheets') 
      },
      { 
        test: /\.(png|gif)$/, 
        loader: 'file-loader?name=spritesheets/[name].[ext]', 
        include: path.resolve(__dirname, 'src/assets/spritesheets') 
      },
      { 
        test: /\.(png)$/, 
        loader: 'file-loader?name=images/[name].[ext]', 
        include: path.resolve(__dirname, 'src/assets/images') 
      },
      { 
        test: /\.(jpg|gif)$/, 
        loader: 'file-loader?name=images/[name].[ext]', 
        include: path.resolve(__dirname, 'src/assets/images') 
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: [
      path.resolve('./src')
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'scripts/vendor.bundle.js'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: false
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
    }),
    new HtmlWebpackPlugin({
      title: 'ReactJS-MobX Application',
      template: 'index.ejs',
      path: path.join(__dirname, 'dist'),
      filename: 'index.html'
    }),
    new ExtractTextPlugin("[name].css"),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  devServer: {
    proxy: {
      '/api': {
        target:'http://phisix-api4.appspot.com/stocks.json',
        changeOrigin: true,
        secure: false
      }
    },
    contentBase: './dist',
    hot: true
  },
  node: {
    dns: 'mock',
    net: 'mock'
  }
};
