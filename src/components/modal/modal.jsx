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
    this.defaultOptions = {
      type: '',
      errorMessage: '',
      title: ''
    };
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

  eventListener(param) {
    this.state.option.ok(param);
  }

  render() {
    const { modal2Visible, option } = this.state;
    const options = Object.assign({}, this.defaultOptions, option);
    let content = '';
    if (options.type === 'loading') {
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
    } else if (options.type === 'notification') {
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
            message={options.errorMessage}
            type="success"
            showIcon
          />
        </Modal >
      );
    } else if (options.type === 'error') {
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
            message={options.errorMessage}
            // description="This is an error message about copywriting."
            type="error"
            showIcon
          />
        </Modal >
      );
    } else if (options.type === 'dialog') {
      content = (
        <Modal
          title={options.title}
          wrapClassName="vertical-center-dialog"
          visible={modal2Visible}
          width={440}
          footer={null}
          onCancel={() => this.setModal2Visible(false)}
          className="modal-header"
        >
          {
            options.Dialog ? (<options.Dialog onTrigger={this.eventListener} param={options.param} />) : ''
          }
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
