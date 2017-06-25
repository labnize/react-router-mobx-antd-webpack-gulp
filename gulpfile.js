var gulp = require('gulp'),
  open = require('open'),
  del = require('del'),
  webpack = require('webpack'),
  gulpWebpack = require('gulp-webpack'),
  webpackDevServer = require('webpack-dev-server'),
  webpackDistConfig = require('./config/webpack.dist.config.js'),
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

gulp.task('clean', function () {
  console.log("build folder has been cleaned successfully");
  return del(['build/**/*']);
});

gulp.task('build', ['clean'], function () {
  return gulp.src(filePath.srcPath)
    .pipe(gulpWebpack(webpackDistConfig))
    .pipe(gulp.dest('build/'));
});
