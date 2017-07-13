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
  }

  show(option) {
    this.setState({
      modal2Visible: true,
      option: option
    });
  }

  close() {
    this.setState({
      modal2Visible: false,
      option: this.state.option
    });
  }

  setModal2Visible(modal2Visible) {
    this.setState({ modal2Visible });
  }

  render() {
    let { modal2Visible, option } = this.state;
    let content = '';
    if (option.type && option.type === 'loading') {
      content = (<Modal
          title=""
          wrapClassName="vertical-center-modal"
          visible={modal2Visible}
          closable={false}
          footer={null}
          width={300}
          className='modal-header'
        >
          <Spin tip="加载中..." size="large" />
        </Modal>
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
          className='modal-header'
        >
          <Alert
            className="noti-alert"
            message={option.message}
            type="success"
            showIcon
          />
        </Modal>
      );
    } else {
      content = (
        <Modal
          title=""
          wrapClassName="vertical-center-modal"
          visible={modal2Visible}
          width={340}
          onOk={() => this.setModal2Visible(false)}
          onCancel={() => this.setModal2Visible(false)}
          className='modal-header'
        >
          {/*<Icon type="exclamation-circle-o" />*/}
          {/*{option.message}*/}
          <Alert
            className="noti-alert"
            message={option.message}
            // description="This is an error message about copywriting."
            type="error"
            showIcon
          />
        </Modal>
      );
    }

    return (
      <div>
        {content}
      </div>
    );
  }
}

let dialogDom = ReactDom.render(<PageComponent />, document.getElementById('dialog'));
let modal = {};

modal.showModel = function(option) {
  dialogDom.show(option);
};

modal.closeModel = function() {
  dialogDom.close();
};

export { modal };
