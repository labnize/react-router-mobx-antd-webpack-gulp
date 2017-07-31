/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { Table, Input, Button } from 'antd';
import Tablestore from 'store/tablestore';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import Layout from 'components/layout2/layout2';
import modal from 'components/modal/modal';
import UserConfig from './userconfig';
import './item1.less';

const Search = Input.Search;
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
  title: '创建时间',
  dataIndex: 'createTime',
  key: 'createTime',
  sorter: true
}, {
  title: '操作',
  dataIndex: 'action',
  key: 'action',
  render: text => (
    <span >
      <a href="#" >编辑</a >
      <span className="ant-divider" />
      <a href="#" >删除</a >
    </span >
  )
}];


@observer
class PageComponent extends Component {
  constructor(props) {
    super(props);

    this.handleTableChange = this.handleTableChange.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  componentDidMount() {
    this.doQuery();
  }

  onSelectChange = (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  };

  title = () => '用户管理';

  @observable sorter = {
    sorterField: '',
    sorterOrder: ''
  };

  doQuery() {
    const param = {
      loadingFlag: true,
      url,
      method: 'GET',
      data: {
        pageSize: store.data.pagination.pageSize,
        current: store.data.pagination.current,
        sorterField: this.sorter.sorterField,
        sorterOrder: this.sorter.sorterOrder
      }
    };
    store.fetchData(param);
  }

  handleTableChange(pagination, filters, sorter) {
    store.changeCurrentPage(pagination.current);
    this.sorter.sorterField = sorter.field;
    this.sorter.sorterOrder = sorter.order;
    this.doQuery();
  }

  createUser() {
    modal.showModel({
      type: 'dialog',
      title: '新增用户',
      dialog: UserConfig
    });
  }

  render() {
    const dataSource = store.data.list.slice();
    const rowSelection = {
      onChange: this.onSelectChange
    };
    return (
      <Layout name="item1">
        <div className="item1">
          <div className="search">
            <Search
              placeholder="用户名"
              style={{ width: 200 }}
              onSearch={value => console.log(value)}
            />
            <span className="apart-line" />
            <Button type="primary" onClick={this.createUser}>新增用户</Button>
          </div>
          <div className="table">
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={dataSource}
              pagination={store.data.pagination}
              onChange={this.handleTableChange}
              title={this.title}
            />
          </div>
        </div >
      </Layout >
    );
  }
}

export default PageComponent;