const webpack = require('webpack');
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
    common: ['react', 'react-dom']
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
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/,
        use: ['url-loader?limit=1&name=images/[name].[hash:8].[ext]']
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
      filename: 'styles.[hash].css',
      disable: false,
      allChunks: true
    }),
    new webpack.optimize.UglifyJsPlugin({
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
    new webpack.LoaderOptionsPlugin({
      minimize: true
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
