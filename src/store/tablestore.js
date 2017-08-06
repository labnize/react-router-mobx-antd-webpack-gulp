import { observable } from 'mobx';
import Ajax from 'util/ajax';

export default class Tablestore {
  @observable data = {
    list: [],
    pagination: {
      pageSize: 10,
      current: 1,
      total: 10
    }
  };

  fetchData(param) {
    const that = this;
    const params = {
      successFn(data) {
        const dataObserve = { ...that.data };
        dataObserve.list = data.list;
        dataObserve.pagination.total = parseInt(data.total, 10);
        that.data = dataObserve;
        // 防止数据更新后，当前点击的页码超过了总页码数
        if (that.data.pagination.current > Math.ceil(that.data.pagination.total / that.data.pagination.pageSize)) {
          that.changeCurrentPage(Math.ceil(that.data.pagination.total / that.data.pagination.pageSize));
        }
      },
      ...param
    };
    console.log(params);
    Ajax.fetch(params);
  }

  changeCurrentPage(value) {
    this.data.pagination.current = value;
  }

  createUser(param) {
    const params = {
      ...param
    };
    console.log(params);
    Ajax.fetch(params);
  }

  deleteUser(param) {
    const params = {
      ...param
    };
    console.log(params);
    Ajax.fetch(params);
  }
}
