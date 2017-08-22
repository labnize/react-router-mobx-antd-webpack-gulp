import React, { Component } from 'react';
import echarts from 'echarts';
import PropTypes from 'prop-types';

let pieChart = echarts;

class PageComponent extends Component {
  static resizePie() {
    const pieInstance = echarts.getInstanceByDom(document.getElementById('pieChart'));
    pieInstance.resize();
  }
  componentDidMount() {
    pieChart = echarts.init(document.getElementById('pieChart'));
    if (this.props.param && this.props.param.length) {
      this.initPie();
    }
    $(window).on('resize', PageComponent.resizePie);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.props = nextProps;
      if (this.props.param && this.props.param.length) {
        this.initPie();
      }
    }
  }

  componentWillUnmount() {
    $(window).off('resize');
  }

  initPie() {
    const { param } = this.props;
    const legendData = [];
    const pieData = [];
    param.forEach((value) => {
      legendData.push(value.clusterName);
      const { usableNodes, clusterName } = value;
      pieData.push({
        value: usableNodes,
        name: clusterName
      });
    });

    const option = {
      title: {
        text: '区域分布图',
        x: 'center'
      },
      color: ['#dd5820', '#007ac2', '#81c267', '#5686cb', '#facc41'],
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        bottom: '10',
        data: legendData
      },
      toolbox: {
        right: 60,
        feature: {
          saveAsImage: {}
        }
      },
      series: [
        {
          name: '来源',
          type: 'pie',
          radius: '65%',
          center: ['50%', '48%'],
          data: pieData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    pieChart.setOption(option);
  }

  render() {
    return (
      <div id="pieChart" style={{ width: '100%', height: '100%' }} />
    );
  }
}

PageComponent.propTypes = {
  param: PropTypes.array.isRequired
};
export default PageComponent;
