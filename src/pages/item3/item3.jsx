import React, { Component } from 'react';
import { Button } from 'antd';
import { observer } from 'mobx-react';
import Layout from 'components/layout2/layout2';
import Positionstore from 'store/positionstore';
import './item3.less';

const store = new Positionstore();
const url = 'claa/positionlist';

@observer
class PageComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    PageComponent.doQuery();
  }

  static doQuery() {
    const param = {
      loadingFlag: true,
      url,
      method: 'GET',
      data: {}
    };
    store.fetchData(param);
  }

  enlarge() {}

  diminsh() {}

  render() {
    const positionData = store.data.list.slice();
    return (
      <Layout name="item3">
        <div className="item3">
          <div className="search">
            <Button type="primary" onClick={this.enlarge} >放大</Button >
            <span className="apart-line" />
            <Button type="primary" onClick={this.diminsh} >缩小</Button >
          </div>
          <div className="pos">
            {positionData.length ? positionData.map(value =>
              <img key={value.id} className="pos-pin-img" id={`pin-img${value.id}`} src="res/images/pin.png" alt="" />
            ) : ''}
            <img className="pos-bg-img" src="res/images/position.jpg" alt="" />
          </div>
        </div>
      </Layout>
    );
  }
}

export default PageComponent;
