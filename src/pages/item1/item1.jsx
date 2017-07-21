import React, { Component } from 'react';
import { Table } from 'antd';
import Tablestore from 'store/tablestore';
import { observer } from 'mobx-react';
import Layout from 'components/layout2/layout2';

const store = new Tablestore();
const url = 'claa/tablelist';

const columns = [{
  title: '用户名',
  dataIndex: 'username',
  key: 'username',
  render: text => <a href="#" >{text}</a >
}, {
  title: '角色名',
  dataIndex: 'rolename',
  key: 'rolename'
}, {
  title: '归属组织',
  dataIndex: 'belongOrg',
  key: 'belongOrg'
}, {
  title: '归属用户',
  dataIndex: 'belongUser',
  key: 'belongUser'
}, {
  title: '操作',
  dataIndex: 'action',
  key: 'action',
  render: (text, record) => (
    <span >
      <a href="#" >Action 一 {record.name}</a >
      <span className="ant-divider" />
      <a href="#" >Delete</a >
      <span className="ant-divider" />
      <a href="#" className="ant-dropdown-link" >
        More actions <Icon type="down" />
      </a >
    </span >
  )
}];


@observer
class PageComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const param = {
      loadingFlag: true,
      url,
      method: 'GET',
      data: {}
    };
    store.fetchData(param);
  }

  render() {
    const dataSource = store.list;
    debugger;
    return (
      <Layout name="item1" >
        <div >
          <Table
            columns={columns}
            rowKey={record => record.registered}
            dataSource={dataSource ? [] : dataSource}
          />
        </div >
      </Layout >
    );
  }
}

export default PageComponent;
