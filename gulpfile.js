const gulp = require('gulp');
const open = require('open');
const del = require('del');
const webpack = require('webpack');
const gulpWebpack = require('webpack-stream');
const WebpackDevServer = require('webpack-dev-server');
const webpackDistConfig = require('./config/webpack.dist.config.js');
const webpackDevConfig = require('./config/webpack.config.js');
const path = require('path');

gulp.task('dev', () => {
  const compiler = webpack(webpackDevConfig);
  new WebpackDevServer(compiler, {
    contentBase: './',
    historyApiFallback: true,
    hot: true,
    noInfo: false,
    publicPath: '/',
    stats: { colors: true }
  }).listen(8090, (err) => {
    console.log('http://127.0.0.1:8090');
    console.log('Opening your system browser...');
    open('http://127.0.0.1:8090');
  });
});

gulp.task('default', ['dev']);

gulp.task('clean', () => {
  console.log('build folder has been cleaned successfully');
  return del(['build/**/*']);
});

gulp.task('build', ['clean'], () => gulp.src(path.join(__dirname, '../src'))
  .pipe(gulpWebpack(webpackDistConfig))
  .pipe(gulp.dest('build/')));
