import React, { Component } from 'react';
import Layout from 'components/layout2/layout2';
import { Map, GroundImage } from 'react-amap';
import srcImg from 'images/dongwuyuan.jpg';
import './item4.less';

const bounds = {
  sw: {
    longitude: 116.327911,
    latitude: 39.939229
  },
  ne: {
    longitude: 116.342659,
    latitude: 39.946275
  }
};

const center = {
  longitude: 116.33719,
  latitude: 39.942384
};

class PageComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout name="item4">
        <div className="item4">
          <div id="container">
            <Map
              plugins={['ToolBar']}
              center={center}
              zoom={15}
              zooms={[15, 20]}
              expandZoomRange
            >
              <GroundImage
                bounds={bounds}
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
