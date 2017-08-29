import React, { Component } from 'react';
import Layout from 'components/layout2/layout2';
import { Input } from 'antd';
import './item4.less';

const Search = Input.Search;

class PageComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout name="item4">
        <div className="item4">
          <div className="search">
            <Search
              placeholder="用户名"
              style={{ width: 200 }}
              onSearch={value =>console.log(value)}
            />
          </div>
        </div>
      </Layout>
    );
  }
}

export default PageComponent;
