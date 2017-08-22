import React, { Component } from 'react';
import echarts from 'echarts';
import PropTypes from 'prop-types';

let LineChart = echarts;

class PageComponent extends Component {
  static resizeLines() {
    const lineInstance = echarts.getInstanceByDom(document.getElementById('lineChart'));
    lineInstance.resize();
  }
  componentDidMount() {
    LineChart = echarts.init(document.getElementById('lineChart'));
    if (this.props.param && this.props.param.length) {
      this.initLines();
    }
    $(window).on('resize', PageComponent.resizeLines);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.props = nextProps;
      if (this.props.param && this.props.param.length) {
        this.initLines();
      }
    }
  }

  componentWillUnmount() {
    $(window).off('resize');
  }

  initLines() {
    const { param } = this.props;
    const successrate = [];
    const maxsuccessimagerate = [];
    const maxsuccessregionrate = [];
    const maxfailimagerate = [];
    const maxfailregionrate = [];
    const counttime = [];
    param.forEach((value) => {
      successrate.push(value.successrate);
      maxsuccessimagerate.push(value.maxsuccessimagerate);
      maxsuccessregionrate.push(value.maxsuccessregionrate);
      maxfailimagerate.push(value.maxfailimagerate);
      maxfailregionrate.push(value.maxfailregionrate);
      counttime.push(value.counttime);
    });

    const option = {
      title: {
        text: '堆叠区域图',
        x: 'center'
      },
      color: ['#dd5820', '#007ac2', '#81c267', '#facc41'],
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        top: '30',
        data: ['测试一', '测试二', '测试三', '测试四', '测试五']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        right: 60,
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: counttime
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLabel: {
            textStyle: {
              color: '#5a6c77',
              fontSize: '12',
              extraCssText: 'line-height:30px'
            }
          }
        }
      ],
      series: [
        {
          name: '测试一',
          type: 'line',
          data: successrate
        }, {
          name: '测试二',
          type: 'line',
          data: maxsuccessimagerate
        }, {
          name: '测试三',
          type: 'line',
          data: maxsuccessregionrate
        }, {
          name: '测试四',
          type: 'line',
          data: maxfailimagerate
        }, {
          name: '测试五',
          type: 'line',
          data: maxfailregionrate
        }
      ]
    };

    LineChart.setOption(option);
  }

  render() {
    return (
      <div id="lineChart" style={{ width: '100%', height: '100%' }} />
    );
  }
}

PageComponent.propTypes = {
  param: PropTypes.array.isRequired
};
export default PageComponent;
