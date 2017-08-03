import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Modal, Spin, Alert } from 'antd';

import './modal.less';

class PageComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal2Visible: false,
      option: {}
    };
    this.eventListener = this.eventListener.bind(this);
  }

  setModal2Visible(modal2Visible) {
    this.setState({ modal2Visible });
  }

  show(option) {
    this.setState({
      modal2Visible: true,
      option
    });
  }

  close() {
    this.setState({
      modal2Visible: false,
      option: this.state.option
    });
  }

  eventListener() {
    this.state.option.ok();
  }

  render() {
    const { modal2Visible, option } = this.state;
    let content = '';
    if (option.type && option.type === 'loading') {
      content = (
        <Modal
          title=""
          wrapClassName="vertical-center-modal"
          visible={modal2Visible}
          closable={false}
          footer={null}
          width={300}
          className="modal-header"
        >
          <Spin tip="加载中..." size="large" />
        </Modal >
      );
    } else if (option.type && option.type === 'notification') {
      content = (
        <Modal
          title=""
          wrapClassName="vertical-center-modal"
          visible={modal2Visible}
          width={340}
          footer={null}
          onCancel={() => this.setModal2Visible(false)}
          className="modal-header"
        >
          <Alert
            className="noti-alert"
            message={option.message}
            type="success"
            showIcon
          />
        </Modal >
      );
    } else if (option.type && option.type === 'error') {
      content = (
        <Modal
          title=""
          wrapClassName="vertical-center-modal"
          visible={modal2Visible}
          width={340}
          onOk={() => this.setModal2Visible(false)}
          onCancel={() => this.setModal2Visible(false)}
          className="modal-header"
        >
          <Alert
            className="noti-alert"
            message={option.message}
            // description="This is an error message about copywriting."
            type="error"
            showIcon
          />
        </Modal >
      );
    } else if (option.type && option.type === 'dialog') {
      const Dialog = option.Dialog;
      content = (
        <Modal
          title={option.title}
          wrapClassName="vertical-center-dialog"
          visible={modal2Visible}
          width={440}
          footer={null}
          onCancel={() => this.setModal2Visible(false)}
          className="modal-header"
        >
          <Dialog onTrigger={this.eventListener} param={option.param} />
        </Modal >
      );
    }

    return (
      <div >
        {content}
      </div >
    );
  }
}

const dialogDom = ReactDom.render(<PageComponent />, document.getElementById('dialog'));
const modal = {};

modal.showModel = (option) => {
  dialogDom.show(option);
};

modal.closeModel = () => {
  dialogDom.close();
};

export default modal;
