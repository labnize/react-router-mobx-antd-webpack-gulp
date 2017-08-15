const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const path = require('path');
const defaultSettings = require('./defaults');

const filePath = defaultSettings.filePath;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const fs = require('fs');

const pkgPath = path.join(__dirname, '../package.json');
const pkg = fs.existsSync(pkgPath) ? require(pkgPath) : {};
let theme = {};
if (pkg.theme && typeof (pkg.theme) === 'string') {
  let cfgPath = pkg.theme;
  // relative path
  if (cfgPath.charAt(0) === '.') {
    cfgPath = resolve(args.cwd, cfgPath);
  }
  const getThemeConfig = require(cfgPath);
  theme = getThemeConfig();
} else if (pkg.theme && typeof (pkg.theme) === 'object') {
  theme = pkg.theme;
}

const webpackConfig = {
  entry: {
    common: ['react', 'react-dom', 'jquery']
  },
  output: {
    path: filePath.build,
    filename: '[name].[hash].js',
    publicPath: '/'
  },
  cache: false,
  devtool: false,
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
            loader: 'react-hot'
          },
          {
            loader: 'babel-loader'
          },
          {
            loader: 'webpack-module-hot-accept'
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/,
        use: ['url-loader?limit=1&name=images/[name].[hash:8].[ext]']
      },
      {
        test(file) {
          return /\.less$/.test(file) && !/\.module\.less$/.test(file);
        },
        loader: ExtractTextPlugin.extract(
          `${require.resolve('css-loader')}?sourceMap&-autoprefixer!` +
          `${require.resolve('postcss-loader')}!` +
          `${require.resolve('less-loader')}?{"sourceMap":true,"modifyVars":${JSON.stringify(theme)}}`
        )
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss() {
          return [precss, autoprefixer];
        }
      }
    }),
    new webpack.optimize.DedupePlugin(), // JS库有自己的依赖树，并且这些库可能有交叉的依赖，DedupePlugin可以找出他们并删除重复的依赖
    // new webpack.optimize.OccurenceOrderPlugin(), // 为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
    new webpack.optimize.AggressiveMergingPlugin(),
    // definePlugin 接收字符串插入到代码当中, 所以你需要的话可以写上 JS 的字符串
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'common.[hash].js',
      chunks: defaultSettings.chunks
    }),
    new ExtractTextPlugin({
      filename: 'app.[hash].css',
      disable: false,
      allChunks: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      },
      mangle: {
        except: ['$super', '$', 'exports', 'require']  // 以上变量‘$super’, ‘$’, ‘exports’ or ‘require’，不会被混淆
      },
      output: {
        comments: false
      }
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new ProgressBarPlugin({
      format: '  build [:bar] :percent (:elapsed seconds)',
      clear: false,
      width: 60
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ]
};

function injectEntry() {
  webpackConfig.entry.app = defaultSettings.pagesToPath().entry;
}

function injectHtmlWebpack() {
  webpackConfig.plugins.push(
    new HtmlWebpackPlugin({
      filename: defaultSettings.pagesToPath().fln,
      template: defaultSettings.pagesToPath().templates,
      chunks: ['common', 'app'],
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: false
      }
    })
  );
}

(function init() {
  injectEntry();
  injectHtmlWebpack();
}());

module.exports = webpackConfig;
