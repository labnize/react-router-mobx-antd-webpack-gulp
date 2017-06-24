import React, { Component } from 'react';
import Layout from 'components/layout/layout';

class PageComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout activeTab={1} name="item1SubList1">
        <div>item1SubList1</div>
      </Layout>
    );
  }
}

export default PageComponent;
