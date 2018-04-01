import React, { Component } from 'react';
import Layout from 'components/layout2/layout2';
import { Map, GroundImage, Markers, Marker, Circle } from 'react-amap';
import srcImg from 'images/dongwuyuan.jpg';
import './item4.less';


class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.center = {
      longitude: 118.642807,
      latitude: 32.036538
    };
    this.currentPosition = {
      longitude: 116.397477,
      latitude: 39.908692
    };
    this.state = {
      radius: 600,
      visible: true,
      style: { strokeColor: '#f00' },
      draggable: true
    };
    this.circleEvents = {
      created: (ins) => { console.log(window.circle = ins); },
      click: () => { console.log('clicked'); },
      mouseover: () => { console.log('mouseover'); }
    };
    this.markers = [
      {
        position: {
          longitude: 116.333124,
          latitude: 39.941849
        },
        id: '1'
      },
      {
        position: {
          longitude: 116.340934,
          latitude: 39.944794
        },
        id: '2'
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
  componentDidMount() {
    // 调用高德地图原生LngLat类，使用distance方法，但需等高德地图加载完成
    setTimeout(() => {
      console.log(this.calculate(
        new window.AMap.LngLat(118.642807, 32.036538),
        new window.AMap.LngLat(116.397477, 39.908692)
      ));
    }, 2000);
  }
  markersEvents = {
    click(e, marker) {
      const extData = marker.getExtData();
      const deveui = extData.deveui;
      console.log(deveui);
    }
  };
  calculate(lnglat1, lnglat2) {
    return Math.round(lnglat1.distance(lnglat2));
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
                events={this.markersEvents}
              />
              <GroundImage
                bounds={this.bounds}
                src={srcImg}
              />
              <Circle
                center={this.center}
                radius={this.state.radius}
                events={this.circleEvents}
                visible={this.state.visible}
                style={this.state.style}
                draggable={this.state.draggable}
              />
            </Map>
          </div>
        </div>
      </Layout>
    );
  }
}

export default PageComponent;
