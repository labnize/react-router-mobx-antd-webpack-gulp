const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const theme = require('./antd.theme');

const webpackConfig = {
  entry: {
    app: path.join(__dirname, '../src/main.jsx')
  },
  output: {
    path: path.join(__dirname, '../build'),
    filename: '[name].js',
    publicPath: '/'
  },
  cache: true,
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      components: path.join(__dirname, '../src/components'),
      images: path.join(__dirname, '../res/images'),
      pages: path.join(__dirname, '../src/pages'),
      localData: path.join(__dirname, '../src/testdata/localdata'),
      mockData: path.join(__dirname, '../src/testdata/mockdata'),
      util: path.join(__dirname, '../src/utils'),
      store: path.join(__dirname, '../src/store'),
      jquery: path.join(__dirname, '../node_modules/jquery/dist/jquery.min.js')
    }
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        use: [
          {
            loader: 'react-hot-loader'
          },
          {
            loader: 'babel-loader'
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ['url-loader?limit=1&name=images/[name].[hash:8].[ext]']
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        use: ['url-loader?limit=1&name=iconfont/[name].[hash:8].[ext]']
      },
      {
        test(file) {
          return /\.less$/.test(file) && !/\.module\.less$/.test(file);
        },
        use: ExtractTextPlugin.extract(
                    'css-loader?sourceMap&-autoprefixer!' +
                    `less-loader?{"sourceMap":true,"modifyVars":${JSON.stringify(theme)}}`
                )
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
      filename: 'styles.[contenthash].css',
      disable: false,
      allChunks: false
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/index.html'),
      inject: true
    })
  ]
};

module.exports = webpackConfig;
