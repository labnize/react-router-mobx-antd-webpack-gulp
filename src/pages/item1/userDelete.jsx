import React, { Component } from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import modal from 'components/modal/modal';

class PageComponent extends Component {
  static cancelClickHandler() {
    modal.closeModel();
  }
  constructor(props) {
    super(props);
    this.okClickHandler = this.okClickHandler.bind(this);
  }

  okClickHandler() {
    // const that = this;
    // const param = {
    //   loadingFlag: false,
    //   url,
    //   method: 'GET',
    //   data: {
    //     id: this.props.param.id
    //   },
    //   successFn() {
    //     that.props.onTrigger();
    //   }
    // };
    // Ajax.fetch(param);

    this.props.onTrigger();
  }

  render() {
    const { param } = this.props;
    return (
      <div className="userDelete">
        <div className="content">
          <p>{param.text}</p>
        </div>
        <div className="footer">
          <Button type="primary" htmlType="submit" onClick={this.okClickHandler} >
            确定
          </Button >
          <Button style={{ marginLeft: 8 }} onClick={PageComponent.cancelClickHandler} >
            取消
          </Button >
        </div >
      </div>
    );
  }
}
PageComponent.propTypes = {
  param: PropTypes.object.isRequired,
  onTrigger: PropTypes.func.isRequired
};

export default PageComponent;
