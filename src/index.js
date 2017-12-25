import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { LocaleProvider } from 'antd';
import App from './app';

ReactDOM.render(
  <BrowserRouter>
    <LocaleProvider locale={zhCN}>
      <App />
    </LocaleProvider>
  </BrowserRouter>,
  document.getElementById('app')
);
