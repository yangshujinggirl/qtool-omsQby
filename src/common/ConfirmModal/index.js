import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import './index.less';

class ConfirmModal extends Component {
  static defaultProps={
    confirmLoading:false,
    title:'温馨提示',
    okText:'确认',
    cancelText:'取消',
  }
  handleOk() {

  }
  handleCancel() {

  }
  render() {
    const { visible, confirmLoading, title, onOk, onCancel, okText, cancelText } =this.props;
    return(
      <Modal
        className="confirm-modal-components"
        width={570}
        centered
        closable={false}
        cancelText={cancelText}
        okText={okText}
        title={title}
        visible={visible}
        confirmLoading={confirmLoading}
        onOk={onOk}
        onCancel={onCancel}>
          {this.props.children}
        </Modal>
    )
  }
}

export default ConfirmModal;
