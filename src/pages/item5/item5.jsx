import React, { Component } from 'react';
import Layout from 'components/layout2/layout2';
import vis from 'vis';
import './item5.less';

class PageComponent extends Component {
  componentDidMount() {
    const container = document.getElementById('mynetwork');
    const nodes = new vis.DataSet([
      { id: 1, label: 'Node 1' },
      { id: 2, label: 'Node 2' },
      { id: 3, label: 'Node 3' },
      { id: 4, label: 'Node 4' },
      { id: 5, label: 'Node 5' }
    ]);
    const edges = new vis.DataSet([
      { from: 1, to: 3 },
      { from: 1, to: 2 },
      { from: 2, to: 4 },
      { from: 2, to: 5 }
    ]);

    const data = {
      nodes,
      edges
    };
    const options = {};
    const network = new vis.Network(container, data, options);
  }
  render() {
    return (
      <Layout name="item5">
        <div id="mynetwork" />
      </Layout>
    );
  }
}

export default PageComponent;
