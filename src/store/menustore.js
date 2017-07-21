import { observable } from 'mobx';
import Ajax from 'util/ajax';

// const menulistUrl = 'claa/menulist';

export default class Menustore {
  @observable list = [];

  static menulistUrl = 'claa/menulist';

  fetchData() {
    const that = this;
    const param = {
      loadingFlag: true,
      url: Menustore.menulistUrl,
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
