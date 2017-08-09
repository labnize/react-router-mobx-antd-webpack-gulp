import React, { Component } from 'react';
import { Tabs } from 'antd';
import { observer } from 'mobx-react';
import Layout from 'components/layout2/layout2';
import Echartstore from 'store/echartstore';
import Lines from './line';
import './item.less';


const TabPane = Tabs.TabPane;
const url = 'claa/linelist';
const store = new Echartstore();

@observer
class PageComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.doQuery();
    // window.onresize = this.doQuery;
  }

  doQuery() {
    const param = {
      loadingFlag: true,
      url,
      method: 'GET',
      data: {}
    };
    store.fetchData(param);
  }

  render() {
    const lineData = store.data.list.slice();
    return (
      <Layout name="item2">
        <div className="item2">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Tab 1" key="1">
              <div className="tabLine">
                <Lines param={lineData} />
              </div>
            </TabPane>
            <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
          </Tabs>
        </div>
      </Layout>
    );
  }
}

export default PageComponent;
