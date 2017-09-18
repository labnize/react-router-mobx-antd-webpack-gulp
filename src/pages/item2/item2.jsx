import React, { Component } from 'react';
import { Tabs } from 'antd';
import { observer } from 'mobx-react';
import Layout from 'components/layout2/layout2';
import Echartstore from 'store/echartstore';
import Lines from './line';
import Pie from './pie';
import './item2.less';


const TabPane = Tabs.TabPane;
const urlLine = 'claa/linelist';
const urlPie = 'claa/pielist';
const store = new Echartstore();

@observer
class PageComponent extends Component {
  static doQueryLine() {
    const param = {
      loadingFlag: true,
      url: urlLine,
      method: 'GET',
      data: {}
    };
    store.fetchData(param);
  }

  static doQueryPie() {
    const param = {
      loadingFlag: true,
      url: urlPie,
      method: 'GET',
      data: {}
    };
    store.fetchPieData(param);
  }

  componentDidMount() {
    PageComponent.doQueryLine();
    PageComponent.doQueryPie();
  }

  render() {
    const lineData = store.data.list.slice();
    const pieData = store.data.pieList.slice();
    return (
      <Layout name="item2">
        <div className="item2">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Tab 1" key="1">
              <div className="tabLine">
                <Lines param={lineData} />
              </div>
            </TabPane>
            <TabPane tab="Tab 2" key="2">
              <div className="tabLine">
                <Pie param={pieData} />
              </div>
            </TabPane>
          </Tabs>
        </div>
      </Layout>
    );
  }
}

export default PageComponent;
