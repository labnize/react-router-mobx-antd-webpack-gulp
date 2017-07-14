import { modal } from 'components/modal/modal';

export default class AJAX {
  static mockData = require('util/mock');
  // static config = require('util/config.json');
  // static currentENV = AJAX.config.current;

  static needMock() {
    return true;
  }

  static fetch(fetchObj) {
    let {
      loadingFlag,
      method,
      url,
      data = {},
      successFn,
      errorFn
    } = fetchObj;

    if (loadingFlag) {
      modal.showModel({
        type: 'loading'
      });
    }

    if (AJAX.needMock()) {
      setTimeout(() => {
        if (loadingFlag) {
          modal.closeModel();
        }
        const mockData = AJAX.mockData[url];
        console.log('mockData', mockData);
        if (mockData.code === 0) {
          successFn(mockData);
        } else if (errorFn) {
          errorFn(mockData);
        } else {
            // TODO ajax错误统一处理
        }
      }, 500);
      return;
    }

    if (method.toLowerCase() === 'get') {
      data = null;
    } else {
      data = JSON.stringify(data);
    }

    return $.ajax({
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

      },
      error(...args) {

      }
    });
  }

  static isExisty(obj) {
    return obj != null;
  }
}
