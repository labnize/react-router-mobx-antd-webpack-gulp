import React, { Component } from 'react';
import { Button } from 'antd';
import { observer } from 'mobx-react';
import Layout from 'components/layout2/layout2';
import Positionstore from 'store/positionstore';
import imgPin from 'images/pin.png';
import imgPosition from 'images/position.jpg';
import './item3.less';

const store = new Positionstore();
const url = 'claa/positionlist';
const nn6 = document.getElementById && !document.all;
let orign = 1;
let oDragObj;
let isdrag = false;
let x;
let y;
let nTX;
let nTY;

@observer
class PageComponent extends Component {
  static doQuery() {
    const param = {
      loadingFlag: true,
      url,
      method: 'GET',
      data: {}
    };
    store.fetchData(param);
  }

  // 获取div的四个顶点坐标
  static getDivPosition() {
    const odiv = document.getElementById('picDiv');
    const screnWidth = document.body.clientWidth;
    return {
      xLeft: odiv.getBoundingClientRect().left,
      xRigh: odiv.getBoundingClientRect().left + screnWidth - 145,
      yTop: odiv.getBoundingClientRect().top,
      yBottom: odiv.getBoundingClientRect().top + screnWidth - 145
    };
  }

  // 获取鼠标坐标
  static mousePos(e) {
    const ev = e || window.event;
    return {
      x: ev.clientX + document.body.scrollLeft + document.documentElement.scrollLeft,
      y: ev.clientY + document.body.scrollTop + document.documentElement.scrollTop
    };
  }

  // 鼠标按下才初始化
  static initDrag(e) {
    let oDragHandle = nn6 ? e.target : event.srcElement;
    const topElement = 'HTML';
    while (oDragHandle.tagName !== topElement && oDragHandle.className !== 'dragAble') {
      oDragHandle = nn6 ? oDragHandle.parentNode : oDragHandle.parentElement;
    }
    if (oDragHandle.className === 'dragAble') {
      isdrag = true;
      oDragObj = oDragHandle;
      nTY = parseInt(oDragObj.style.top + 0, 10);
      y = nn6 ? e.clientY : event.clientY;
      nTX = parseInt(oDragObj.style.left + 0, 10);
      x = nn6 ? e.clientX : event.clientX;
      document.onmousemove = PageComponent.moveMouse;
      return false;
    }
    return true;
  }

  // 鼠标移动
  static moveMouse(e) {
    // 鼠标的坐标
    const x1 = PageComponent.mousePos(e).x;
    const y1 = PageComponent.mousePos(e).y;
    // div的四个顶点坐标
    const xLeft = PageComponent.getDivPosition().xLeft;
    const xRigh = PageComponent.getDivPosition().xRigh;
    const yTop = PageComponent.getDivPosition().yTop;
    const yBottom = PageComponent.getDivPosition().yBottom;

    if (isdrag && x1 > xLeft && x1 < xRigh && y1 > yTop && y1 < yBottom) {
      oDragObj.style.top = `${nn6 ? nTY + e.clientY - y : nTY + event.clientY - y}px`;
      oDragObj.style.left = `${nn6 ? nTX + e.clientX - x : nTX + event.clientX - x}px`;
      return false;
    }
    return true;
  }

  static offDrag() {
    isdrag = false;
  }

  static imgScale(status) {
    if (status) {
      orign += 0.2;
      if (orign >= 2) {
        orign = 2;
      }
      $('#imgWrap').css('transform', `scale(${orign})`);
    } else {
      orign -= 0.2;
      if (orign <= 0.1) {
        orign = 0.1;
      }
      $('#imgWrap').css('transform', `scale(${orign})`);
    }
  }

  static enlarge() {
    PageComponent.imgScale(true);
  }

  static diminsh() {
    PageComponent.imgScale(false);
  }

  /* 以下是为了兼容切换到手机模式的拖拽事件*/
  static initTouchDrag(e) {
    let oDragHandle = nn6 ? e.target : event.srcElement;
    const topElement = 'HTML';
    while (oDragHandle.tagName !== topElement && oDragHandle.className !== 'dragAble') {
      oDragHandle = nn6 ? oDragHandle.parentNode : oDragHandle.parentElement;
    }
    if (oDragHandle.className === 'dragAble') {
      isdrag = true;
      oDragObj = oDragHandle;
      nTY = parseInt(oDragObj.style.top + 0, 10);
      y = nn6 ? e.touches[0].clientY : event.touches[0].clientY;
      nTX = parseInt(oDragObj.style.left + 0, 10);
      x = nn6 ? e.touches[0].clientX : event.touches[0].clientX;
      document.addEventListener('touchmove', PageComponent.touchmoveMouse);
      return false;
    }
    return true;
  }

  // touch鼠标移动
  static touchmoveMouse(e) {
    oDragObj.style.top = `${nn6 ? nTY + e.touches[0].clientY - y : nTY + event.touches[0].clientY - y}px`;
    oDragObj.style.left = `${nn6 ? nTX + e.touches[0].clientX - x : nTX + event.touches[0].clientX - x}px`;
    return false;
  }
  /* 以上是为了兼容切换到手机模式的拖拽事件*/

  componentDidMount() {
    const picDiv = $('#picDiv');
    let layoutHeight = $(window).height() - 157;
    let picHeight = `${layoutHeight - 91.5}px`;
    picDiv.css('height', picHeight);
    $(window).resize(() => {
      layoutHeight = $(window).height() - 157;
      picHeight = `${layoutHeight - 91.5}px`;
      picDiv.css('height', picHeight);
    });
    PageComponent.doQuery();
    document.onmousedown = PageComponent.initDrag;
    document.onmouseup = PageComponent.offDrag;
    document.addEventListener('touchstart', PageComponent.initTouchDrag);
    document.ontouchend = PageComponent.offDrag;
  }


  render() {
    const positionData = store.data.list.slice();
    return (
      <Layout name="item3">
        <div className="item3">
          <div className="search">
            <Button type="primary" onClick={PageComponent.enlarge} >放大</Button >
            <span className="apart-line" />
            <Button type="primary" onClick={PageComponent.diminsh} >缩小</Button >
          </div>
          <div className="pos">
            <div id="picDiv">
              <div id="imgWrap" className="dragAble">
                {positionData.length ? positionData.map(value =>
                  (<img
                    key={value.id}
                    className="pos-pin-img"
                    id={`pin-img${value.id}`}
                    src={imgPin}
                    alt=""
                    style={{ left: `${value.left}px`, top: `${value.top}px`, width: '35px', position: 'absolute' }}
                  />)
                ) : ''}
                <img className="pos-bg-img" src={imgPosition} alt="" />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default PageComponent;
