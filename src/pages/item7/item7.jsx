import React, { Component } from 'react';
import Layout from 'components/layout2/layout2';
import go from 'gojs';

class PageComponent extends Component {
  componentDidMount() {
    const $ = go.GraphObject.make; // for conciseness in defining templates in this function

    const myDiagram =
      $(
        go.Diagram, 'myDiagramDiv', // must be the ID or reference to div
        { initialContentAlignment: go.Spot.Center }
      );

    // define all of the gradient brushes
    const graygrad = $(go.Brush, 'Linear', { 0: '#F5F5F5', 1: '#F1F1F1' });
    const bluegrad = $(go.Brush, 'Linear', { 0: '#CDDAF0', 1: '#91ADDD' });
    const yellowgrad = $(go.Brush, 'Linear', { 0: '#FEC901', 1: '#FEA200' });
    const lavgrad = $(go.Brush, 'Linear', { 0: '#ffffff', 1: '#ffffff' });

    // define the Node template for non-terminal nodes
    myDiagram.nodeTemplate =
      $(
        go.Node, 'Auto',
        { isShadowed: true },
        // define the node's outer shape
        $(
          go.Shape, 'RoundedRectangle',
          { fill: graygrad, stroke: '#D8D8D8' },
          new go.Binding('fill', 'color')
        ),
        // define the node's text
        $(
          go.TextBlock,
          { margin: 5, font: 'bold 11px Helvetica, bold Arial, sans-serif' },
          new go.Binding('text', 'key')
        )
      );

    // define the Link template
    myDiagram.linkTemplate =
      $(
        go.Link, // the whole link panel
        { selectable: false },
        $(go.Shape)
      ); // the link shape

    // create the model for the double tree
    myDiagram.model = new go.TreeModel([
      // these node data are indented but not nested according to the depth in the tree
      { key: 'Root', color: lavgrad },
      {
        key: 'Left1', parent: 'Right1', dir: 'left', color: bluegrad
      },
      { key: 'leaf1', parent: 'Left1' },
      { key: 'leaf2', parent: 'Left1' },
      { key: 'Left2', parent: 'Left1', color: bluegrad },
      { key: 'leaf3', parent: 'Left2' },
      { key: 'leaf4', parent: 'Left2' },
      {
        key: 'Right1', parent: 'Right1', dir: 'right', color: yellowgrad
      },
      { key: 'Right2', parent: 'Right1', color: yellowgrad },
      { key: 'leaf5', parent: 'Right2' },
      { key: 'leaf6', parent: 'Right2' },
      { key: 'leaf7', parent: 'Right2' },
      { key: 'leaf8', parent: 'Right1' },
      { key: 'leaf9', parent: 'Right1' }
    ]);

    this.doubleTreeLayout(myDiagram);
  }
  doubleTreeLayout(diagram) {
    // Within this function override the definition of '$' from jQuery:
    const $ = go.GraphObject.make; // for conciseness in defining templates
    diagram.startTransaction('Double Tree Layout');

    // split the nodes and links into two Sets, depending on direction
    const leftParts = new go.Set(go.Part);
    const rightParts = new go.Set(go.Part);
    this.separatePartsByLayout(diagram, leftParts, rightParts);
    // but the ROOT node will be in both collections

    // create and perform two TreeLayouts, one in each direction,
    // without moving the ROOT node, on the different subsets of nodes and links
    const layout1 =
      $(
        go.TreeLayout,
        {
          angle: 180,
          arrangement: go.TreeLayout.ArrangementFixedRoots,
          setsPortSpot: false
        }
      );

    const layout2 =
      $(
        go.TreeLayout,
        {
          angle: 0,
          arrangement: go.TreeLayout.ArrangementFixedRoots,
          setsPortSpot: false
        }
      );

    layout1.doLayout(leftParts);
    layout2.doLayout(rightParts);

    diagram.commitTransaction('Double Tree Layout');
  }
  separatePartsByLayout(diagram, leftParts, rightParts) {
    const root = diagram.findNodeForKey('Right1');
    if (root === null) return;
    // the ROOT node is shared by both subtrees!
    leftParts.add(root);
    rightParts.add(root);
    // look at all of the immediate children of the ROOT node
    root.findTreeChildrenNodes().each((child) => {
      // in what direction is this child growing?
      const dir = child.data.dir;
      const coll = (dir === 'left') ? leftParts : rightParts;
      // add the whole subtree starting with this child node
      coll.addAll(child.findTreeParts());
      // and also add the link from the ROOT node to this child node
      coll.add(child.findTreeParentLink());
    });
  }
  render() {
    return (
      <Layout name="item7">
        <div
          id="myDiagramDiv"
          style={{
 border: 'solid 1px black', width: '100%', height: '500px', backgroundColor: 'white'
}}
        />
      </Layout>
    );
  }
}

export default PageComponent;
