/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { Table } from 'antd';
import Tablestore from 'store/tablestore';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
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
      <a href="#" >操作</a >
      <span className="ant-divider" />
      <a href="#" >删除</a >
      <span className="ant-divider" />
      <a href="#" className="ant-dropdown-link" >
        更多
      </a >
    </span >
  )
}];


@observer
class PageComponent extends Component {
  constructor(props) {
    super(props);

    this.handleTableChange = this.handleTableChange.bind(this);
  }

  componentDidMount() {
    this.doQuery();
  }

  onSelectChange = (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  };

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

  dataSourceTransform(data) {
    const dataSource = [];
    data.forEach((value) => {
      dataSource.push(value);
    });
    return dataSource;
  }

  handleTableChange(pagination, filters, sorter) {
    store.changeCurrentPage(pagination.current);
    this.sorter.sorterField = sorter.field;
    this.sorter.sorterOrder = sorter.order;
    this.doQuery();
  }

  render() {
    const dataSource = this.dataSourceTransform(store.data.list);
    const rowSelection = {
      onChange: this.onSelectChange
    };
    return (
      <Layout name="item1" >
        <div >
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={dataSource}
            pagination={store.data.pagination}
            onChange={this.handleTableChange}
          />
        </div >
      </Layout >
    );
  }
}

export default PageComponent;
