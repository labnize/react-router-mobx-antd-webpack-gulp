# 基于React搭建的管理后台系统

## 技术框架

- ES6/7 Vanilla JS
- ESLint (代码规范)
- React
- Mobx (统一状态管理)
- React Router (路由)
- Antd (UI框架)
- ECharts (常规图表框架)
- Mock.js (模拟数据服务)
- Babel (ES6/7代码转译浏览器可执行)
- Webpack (打包工具)
- React Amap (高德地图)

## 目录结构

```bash
.
├── config # webpack 配置目录
├── res # 静态文件目录
└── src # 前端源码目录
    ├── index.html # layout
    ├── main.js # 入口文件
    ├── component # 组件目录
    ├── pages # 页面目录
    ├── store # Mobx状态管理
    ├── testdata # 模拟数据目录
    	├── localdata # 本地测试数据
    │   └── mockdata # 模拟数据服务器
    └── utils # 基础配置文件
```
## 安装

```bash
git clone https://github.com/labnize/react-router-antd-webpack-gulp.git
cd react-router-antd-webpack-gulp
npm install
```

## 调试

Just run "gulp" in this root folder
```
gulp
```

## 打包

Just run "gulp build" in this root folder
```
gulp build
```

