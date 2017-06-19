var gulp = require('gulp'),
  open = require('open'),
  webpack = require('webpack'),
  webpackDevServer = require('webpack-dev-server'),
  defaultSettings = require('./config/defaults.js'),
  webpackDevConfig = require('./config/webpack.config.js'),
  filePath = defaultSettings.filePath;

gulp.task('dev', function () {
  var compiler = webpack(webpackDevConfig);
  new webpackDevServer(compiler, {
    contentBase: './',
    historyApiFallback: true,
    hot: true,
    noInfo: false,
    publicPath: filePath.publicPath
  }).listen(defaultSettings.port, function (err) {
    console.log('http://127.0.0.1:' + defaultSettings.port);
    console.log('Opening your system browser...');
    open('http://127.0.0.1:' + defaultSettings.port);
  })
});

gulp.task('default', ['dev']);
