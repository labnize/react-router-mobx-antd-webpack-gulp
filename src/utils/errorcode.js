const map = {
  4: '服务器异常'
};

module.exports = function (code) {
  return map[code];
};
