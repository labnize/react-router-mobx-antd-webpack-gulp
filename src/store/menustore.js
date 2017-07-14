import { observable } from 'mobx';
import Ajax from 'util/ajax';

const menulistUrl = 'claa/menulist';

class Menustore {
  @observable list = [];

  fetchData() {
    const that = this;
    const param = {
      loadingFlag: true,
      url: menulistUrl,
      method: 'GET',
      data: {},
      successFn(data) {
        that.list = data.list;
      }
    };
    console.log(param);
    Ajax.fetch(param);
  }
}

export default Menustore;
