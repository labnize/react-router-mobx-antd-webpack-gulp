import React, { Component } from 'react';
import Layout from 'components/layout/layout';

class PageComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout activeTab={2} name="item2SubList1" >
        <div>item2SubList1</div>
      </Layout>
    );
  }
}

export default PageComponent;
