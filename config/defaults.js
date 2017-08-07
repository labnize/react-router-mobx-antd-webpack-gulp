const path = require('path');

const chunks = [];
const filePath = {
  publicPath: '/',
  srcPath: path.join(__dirname, '../src'),
  tplPath: path.join(__dirname, '../src'),
  build: path.join(__dirname, '../build')
};

const pages = {
  name: 'index.html',
  entry: 'main.jsx',
  fln: 'index.html'
};

const pagesToPath = function () {
  const obj = {
    name: pages.name,
    entry: path.join(filePath.srcPath, pages.entry),
    fln: pages.fln,
    templates: path.join(filePath.tplPath, pages.fln)
  };
  chunks.push(pages.name);
  return obj;
};

module.exports = {
  filePath,
  pages,
  pagesToPath,
  port: 8090,
  chunks
};
