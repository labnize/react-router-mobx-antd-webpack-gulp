import React, { Component } from 'react';
import Layout from 'components/layout2/layout2';

class PageComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout name="item2">
        <div>item2</div>
      </Layout>
    );
  }
}

export default PageComponent;
