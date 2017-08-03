import React, { Component } from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';

class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.eventListener = this.eventListener.bind(this);
  }

  setVisible(modalVisible) {
    this.props.onTrigger('visible', modalVisible);
  }

  eventListener(type, param) {
    this.props.onTrigger(type, param);
  }

  render() {
    const { option } = this.props;
    // let modalContent = '';
    // if (option.operateType === 'delete') {
    //   modalContent = (<Modal
    //     title={option.title}
    //     wrapClassName="vertical-center-dialog"
    //     visible={option.visible}
    //     width={440}
    //     footer={null}
    //     onCancel={() => this.setVisible(false)}
    //     className="modal-header"
    //   />);
    // }
    const Dialog = option.dialog;
    return (
      <div >
        <Modal
          title={option.title}
          wrapClassName="vertical-center-dialog"
          visible={option.visible}
          width={440}
          footer={null}
          onCancel={() => this.setVisible(false)}
          className="modal-header"
        >
          <Dialog onTrigger={this.eventListener} param={option.param} />
        </Modal >
      </div >
    );
  }
}

PageComponent.propTypes = {
  option: PropTypes.object.isRequired,
  onTrigger: PropTypes.func.isRequired
};

export default PageComponent;
