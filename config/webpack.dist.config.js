var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var path = require('path');
var defaultSettings = require('./defaults');
var filePath = defaultSettings.filePath;
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var fs = require('fs');

const pkgPath = path.join(__dirname, '../package.json');
const pkg = fs.existsSync(pkgPath) ? require(pkgPath) : {};
let theme = {};
if (pkg.theme && typeof(pkg.theme) === 'string') {
  let cfgPath = pkg.theme;
  // relative path
  if (cfgPath.charAt(0) === '.') {
    cfgPath = resolve(args.cwd, cfgPath);
  }
  const getThemeConfig = require(cfgPath);
  theme = getThemeConfig();
} else if (pkg.theme && typeof(pkg.theme) === 'object') {
  theme = pkg.theme;
}

var webpackConfig = {
  entry: {
    common: ['react', 'react-dom', 'jquery', 'babel-polyfill']
  },
  output: {
    path: filePath.build,
    filename: '[name].[hash].js',
    publicPath: '/build/'
  },
  cache: false,
  devtool: false,
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'jquery': path.join(__dirname, '../node_modules/jquery/dist/jquery.min.js')
    }
  },
  module: {
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
      },
      {
        test(filePath) {
          return /\.less$/.test(filePath) && !/\.module\.less$/.test(filePath);
        },
        loader: ExtractTextPlugin.extract(
          'css?sourceMap!' +
          'postcss!' +
          `less-loader?{"sourceMap":true,"modifyVars":${JSON.stringify(theme)}}`
        )
      },
      {
        test: /\.module\.less$/,
        loader: ExtractTextPlugin.extract(
          'css?sourceMap&modules&localIdentName=[local]___[hash:base64:5]!!' +
          'postcss!' +
          `less-loader?{"sourceMap":true,"modifyVars":${JSON.stringify(theme)}}`
        )
      }
    ]
  },
  postcss: function () {
    return [precss, autoprefixer];
  },
  plugins: [
    new webpack.optimize.DedupePlugin(), //JS库有自己的依赖树，并且这些库可能有交叉的依赖，DedupePlugin可以找出他们并删除重复的依赖
    new webpack.optimize.OccurenceOrderPlugin(),//为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
    new webpack.optimize.AggressiveMergingPlugin(),
    // definePlugin 接收字符串插入到代码当中, 所以你需要的话可以写上 JS 的字符串
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "common",
      filename: "common.[hash].js",
      chunks: defaultSettings.chunks
    }),
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      },
      mangle: {
        except: ['$super', '$', 'exports', 'require']  //以上变量‘$super’, ‘$’, ‘exports’ or ‘require’，不会被混淆
      },
      output: {
        comments: false
      }
    }),
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
      chunks: ['common', defaultSettings.pagesToPath().name],
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: false
      }
    })
  );
}

(function () {
  injectEntry();
  injectHtmlWebpack();
})();

module.exports = webpackConfig;