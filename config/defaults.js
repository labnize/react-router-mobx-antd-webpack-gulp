var path = require('path');
var chunks = [];
var filePath = {
  publicPath: '/',
  srcPath: path.join(__dirname, '../src'),
  tplPath: path.join(__dirname, '../src'),
  build: path.join(__dirname, '../build')
}

var pages = {
  name: 'index.html',
  entry: 'main.jsx',
  fln: 'index.html'
};

var pagesToPath = function () {
  var _obj = {
    name: pages.name,
    entry: path.join(filePath.srcPath, pages.entry),
    fln: pages.fln,
    templates: path.join(filePath.tplPath, pages.fln)
  };
  chunks.push(pages.name);
  return _obj;
};

module.exports = {
  filePath: filePath,
  pages: pages,
  pagesToPath: pagesToPath,
  port: 8090,
  chunks: chunks
};
