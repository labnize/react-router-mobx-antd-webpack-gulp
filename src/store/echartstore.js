import { observable } from 'mobx';
import Ajax from 'util/ajax';

export default class Echartstore {
  @observable data = {
    list: [],
    pieList: []
  };

  fetchData(param) {
    const that = this;
    const params = {
      successFn(data) {
        const dataObserve = { ...that.data };
        dataObserve.list = data.list;
        that.data = dataObserve;
      },
      ...param
    };
    console.log(params);
    Ajax.fetch(params);
  }

  fetchPieData(param) {
    const that = this;
    const params = {
      successFn(data) {
        const dataObserve = { ...that.data };
        dataObserve.pieList = data.list;
        that.data = dataObserve;
      },
      ...param
    };
    console.log(params);
    Ajax.fetch(params);
  }
}
