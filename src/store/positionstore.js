import { observable } from 'mobx';
import Ajax from 'util/ajax';

export default class Echartstore {
  @observable data = {
    list: []
  };

  fetchData(param) {
    const that = this;
    const params = {
      successFn(data) {
        if (data.list && data.list.length) {
          const dataObserve = { ...that.data };
          dataObserve.list = data.list;
          that.data = dataObserve;
        }
      },
      ...param
    };
    console.log(params);
    Ajax.fetch(params);
  }
}
