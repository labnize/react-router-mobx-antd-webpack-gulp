const gulp = require('gulp');
const open = require('open');
const del = require('del');
const webpack = require('webpack');
const gulpWebpack = require('gulp-webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackDistConfig = require('./config/webpack.dist.config.js');
const defaultSettings = require('./config/defaults.js');
const webpackDevConfig = require('./config/webpack.config.js');

const filePath = defaultSettings.filePath;

gulp.task('dev', () => {
  const compiler = webpack(webpackDevConfig);
  new WebpackDevServer(compiler, {
    contentBase: './',
    historyApiFallback: true,
    hot: true,
    noInfo: false,
    publicPath: filePath.publicPath,
    stats: { colors: true }
  }).listen(defaultSettings.port, (err) => {
    console.log(`http://127.0.0.1:${defaultSettings.port}`);
    console.log('Opening your system browser...');
    open(`http://127.0.0.1:${defaultSettings.port}`);
  });
});

gulp.task('default', ['dev']);

gulp.task('clean', () => {
  console.log('build folder has been cleaned successfully');
  return del(['build/**/*']);
});

gulp.task('build', ['clean'], () => gulp.src(filePath.srcPath)
  .pipe(gulpWebpack(webpackDistConfig))
  .pipe(gulp.dest('build/')));
