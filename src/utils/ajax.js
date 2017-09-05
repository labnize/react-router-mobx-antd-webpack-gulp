import modal from 'components/modal/modal';
import 'util/mockdata';

export default class AJAX {
  static localData = require('util/localdata');

  static getEnvPrefix() {
    if (window.isDebug) {
      return '';
    }
    return window.apiUrl;
  }

  static fetch(fetchObj) {
    const {
      loadingFlag,
      method,
      successFn,
      errorFn
    } = fetchObj;
    let {
      url,
      data = {}
    } = fetchObj;

    if (loadingFlag) {
      modal.showModel({
        type: 'loading'
      });
    }

    if (window.isDebug) {
      setTimeout(() => {
        if (loadingFlag) {
          modal.closeModel();
        }
        const localData = AJAX.localData[url];
        // console.log('localData', localData);
        if (localData.code === 0) {
          successFn(localData);
        } else if (errorFn) {
          errorFn(localData);
        } else {
          AJAX.modalError(localData);// TODO ajax错误统一处理
        }
      }, 500);
      return;
    }

    url = AJAX.getEnvPrefix() + url;

    if (method.toLowerCase() === 'get') {
      data = null;
    } else {
      data = JSON.stringify(data);
    }

    $.ajax({
      method,
      url,
      data: AJAX.isExisty(data) ? data : {},
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      dataType: 'json',
      traditional: true,
      xhrFields: {
        withCredentials: false
      },
      crossDomain: true,
      success(result) {
        if (loadingFlag) {
          modal.closeModel();
        }
        successFn(result);
      },
      error(...args) {
        if (errorFn) {
          errorFn(args);
        } else {
          AJAX.modalError(args);
        }
      }
    });
  }

  static isExisty(obj) {
    return obj !== null;
  }

  static modalError(data) {
    return modal.showModel({
      type: 'error',
      message: data.message
    });
  }
}
