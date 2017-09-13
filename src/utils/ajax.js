import modal from 'components/modal/modal';
import 'util/mockdata';
import ErrorCode from './errorcode';

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
        } else {
          const errorMsg = ErrorCode(localData.code) || '服务器异常,请联系运维人员!';
          if (errorFn) {
            errorFn(errorMsg);
          } else {
            AJAX.modalError(errorMsg);// ajax错误统一处理
          }
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
      // traditional: true,
      // xhrFields: {
      //   withCredentials: false
      // },
      crossDomain: true,
      success(result) {
        if (loadingFlag) {
          modal.closeModel();
        }
        if (result.code === 0) {
          successFn(result);
        } else {
          const errorMsg = ErrorCode(result.code) || '服务器异常,请联系运维人员!';
          if (errorFn) {
            errorFn(errorMsg);
          } else {
            AJAX.modalError(errorMsg);
          }
        }
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

  static modalError(message) {
    return modal.showModel({
      type: 'error',
      errorMessage: message
    });
  }
}
