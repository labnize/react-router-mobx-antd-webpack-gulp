import { observable } from 'mobx';
import Ajax from 'util/ajax';

export default class Tablestore {
  @observable list = [];

  fetchData(param) {
    const that = this;
    const params = {
      successFn(data) {
        that.list = data.list;
      },
      ...param
    };
    console.log(params);
    Ajax.fetch(params);
  }
}
