import React, { Component } from 'react';
import { Table, Input, Button } from 'antd';
import Tablestore from 'store/tablestore';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import Layout from 'components/layout2/layout2';
import ModalDialog from 'components/modal/modaldialog';
import UserConfig from './userconfig';
import './item1.less';

const Search = Input.Search;
const store = new Tablestore();
const url = 'claa/tablelist';

@observer
class PageComponent extends Component {
  constructor(props) {
    super(props);

    this.handleTableChange = this.handleTableChange.bind(this);
    this.createUser = this.createUser.bind(this);
    this.editUser = this.editUser.bind(this);
    this.eventListener = this.eventListener.bind(this);

    this.columns = [{
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
      render: (text, record, index) => (
        <span >
          <a onClick={() => this.editUser(index)} role="presentation" >编辑</a >
          <span className="ant-divider" />
          <a >删除</a >
        </span >
      )
    }];
  }

  componentDidMount() {
    this.doQuery();
  }

  onSelectChange = (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  };

  @observable obserdata = {
    sorterField: '',
    sorterOrder: '',
    title: '',
    visible: false,
    tableList: [],
    param: {}
  };

  doQuery() {
    const param = {
      loadingFlag: true,
      url,
      method: 'GET',
      data: {
        pageSize: store.data.pagination.pageSize,
        current: store.data.pagination.current,
        sorterField: this.obserdata.sorterField,
        sorterOrder: this.obserdata.sorterOrder
      }
    };
    store.fetchData(param);
  }

  handleTableChange(pagination, filters, sorter) {
    store.changeCurrentPage(pagination.current);
    this.obserdata.sorterField = sorter.field;
    this.obserdata.sorterOrder = sorter.order;
    this.doQuery();
  }

  createUser() {
    this.obserdata.title = '新增用户';
    this.obserdata.visible = true;
    this.obserdata.param = {};
  }

  editUser(index) {
    this.obserdata.title = '编辑用户';
    this.obserdata.visible = true;
    this.obserdata.param = this.obserdata.tableList[index];
  }

  eventListener(type, param) {
    if (type === 'visible') {
      this.obserdata.visible = param;
    }
    if (type === 'doQuery') {
      this.doQuery();
    }
  }

  render() {
    const option = {
      title: this.obserdata.title,
      visible: this.obserdata.visible,
      dialog: UserConfig,
      param: this.obserdata.param
    };
    const dataSource = store.data.list.slice();
    this.obserdata.tableList = dataSource;
    const rowSelection = {
      onChange: this.onSelectChange
    };
    return (
      <Layout name="item1" >
        <div className="item1" >
          <div className="search" >
            <Search
              placeholder="用户名"
              style={{ width: 200 }}
              onSearch={value => console.log(value)}
            />
            <span className="apart-line" />
            <Button type="primary" onClick={this.createUser} >新增用户</Button >
          </div >
          <div className="table" >
            <Table
              rowSelection={rowSelection}
              columns={this.columns}
              dataSource={dataSource}
              pagination={store.data.pagination}
              onChange={this.handleTableChange}
              title={this.title}
            />
          </div >
          <ModalDialog option={option} onTrigger={this.eventListener} />
        </div >
      </Layout >
    );
  }
}

export default PageComponent;
