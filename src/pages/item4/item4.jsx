import React, { Component } from 'react';
import Layout from 'components/layout2/layout2';
import { Map, GroundImage, Markers } from 'react-amap';
import srcImg from 'images/dongwuyuan.jpg';
import './item4.less';

class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.center = {
      longitude: 116.33719,
      latitude: 39.942384
    };
    this.markers = [
      {
        position: {
          longitude: 116.333124,
          latitude: 39.941849
        }
      },
      {
        position: {
          longitude: 116.340934,
          latitude: 39.944794
        }
      }
    ];
    this.bounds = {
      sw: {
        longitude: 116.327911,
        latitude: 39.939229
      },
      ne: {
        longitude: 116.342659,
        latitude: 39.946275
      }
    };
  }

  render() {
    return (
      <Layout name="item4">
        <div className="item4">
          <div id="container">
            <Map
              plugins={['ToolBar']}
              center={this.center}
              zoom={15}
              zooms={[12, 20]}
              expandZoomRange
              resizeEnable
            >
              <Markers
                markers={this.markers}
              />
              <GroundImage
                bounds={this.bounds}
                src={srcImg}
              />
            </Map>
          </div>
        </div>
      </Layout>
    );
  }
}

export default PageComponent;
