import React, { Component } from 'react';
import Layout from 'components/layout2/layout2';
import vis from 'vis';
import nodeImage from 'images/computer.png';
import './item5.less';

class PageComponent extends Component {
  componentDidMount() {
    const container = document.getElementById('mynetwork');
    const nodes = new vis.DataSet([
      {
        id: 1, label: '网关1', shape: 'image', image: `${nodeImage}`, x: 400, y: 500
      },
      {
        id: 2, label: '网关2', shape: 'image', image: `${nodeImage}`, x: 300, y: 400
      },
      {
        id: 3, label: '网关3', shape: 'image', image: `${nodeImage}`, x: 200, y: 300
      },
      {
        id: 4, label: '网关4', shape: 'image', image: `${nodeImage}`, x: 100, y: 200
      },
      {
        id: 5, label: '网关5', shape: 'image', image: `${nodeImage}`, x: 100, y: 100
      }
    ]);
    const edges = new vis.DataSet([
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
      physics: false
    };
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
