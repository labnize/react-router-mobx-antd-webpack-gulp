var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var path = require('path');
var defaultSettings = require('./defaults');
var filePath = defaultSettings.filePath;
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var webpackConfig = {
  entry: {},
  output: {
    path: filePath.build,
    filename: '[name].js',
    publicPath: filePath.publicPath
  },
  cache: true,
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      jquery: path.join(__dirname, '../node_modules/jquery/dist/jquery.min.js')
    }
  },
  module: {
    noParse: [
      path.join(__dirname, '../node_modules/jquery/dist/jquery.min.js')
    ],
    loaders: [
      {
        test: /.jsx?$/,
        loaders: ['react-hot', 'babel-loader', 'webpack-module-hot-accept'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style!css!postcss'
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=1&name=res/[name].[hash:8].[ext]'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  postcss: [autoprefixer],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('[name].css'),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ]
};

function injectEntry() {
  webpackConfig.entry[defaultSettings.pagesToPath().name] = [
    defaultSettings.pagesToPath().entry
  ];
}

function injectHtmlWebpack() {
  webpackConfig.plugins.push(
    new HtmlWebpackPlugin({
      filename: defaultSettings.pagesToPath().fln,
      template: defaultSettings.pagesToPath().templates,
      chunks: [defaultSettings.pagesToPath().name],
      inject: true
    })
  );
}

(function () {
  injectEntry();
  injectHtmlWebpack();
})();

module.exports = webpackConfig;
