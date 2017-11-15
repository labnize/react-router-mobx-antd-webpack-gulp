import React, { Component } from 'react';
import Layout from 'components/layout2/layout2';
import DataSet from 'vis/lib/DataSet';
import Network from 'vis/lib/network/Network';
import nodeImage from 'images/computer.png';
import './item5.less';

class PageComponent extends Component {
  componentDidMount() {
    const container = document.getElementById('mynetwork');
    const nodes = new DataSet([
      {
        id: 1, label: '网关1', shape: 'image', image: `${nodeImage}`
      },
      {
        id: 2, label: '网关2', shape: 'image', image: `${nodeImage}`
      },
      {
        id: 3, label: '网关3', shape: 'image', image: `${nodeImage}`
      },
      {
        id: 4, label: '网关4', shape: 'image', image: `${nodeImage}`
      },
      {
        id: 5, label: '网关5', shape: 'image', image: `${nodeImage}`
      }
    ]);
    const edges = new DataSet([
      { from: 1, to: 3, dashes: true },
      {
        from: 1,
        to: 2,
        color: {
          color: 'red',
          highlight: 'blue',
          hover: '#faff00',
          inherit: false
        }
      },
      { from: 2, to: 4 },
      { from: 2, to: 5 }
    ]);

    const data = {
      nodes,
      edges
    };
    const options = {
      interaction: {
        hover: true
      },
      physics: {
        barnesHut: {
          damping: 0.5,
          avoidOverlap: 0.5
        }
      }
    };
    const network = new Network(container, data, options);
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
