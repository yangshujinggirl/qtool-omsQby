import { Modal, Button } from 'antd';

class AddDescModal extends React.Component {
  handleOk() {

  }
  handleCancel=()=> {
    this.props.onCancel()
  }
  render() {
    return(
      <div>
      <Modal
        title="选择后台类目"
        visible={this.props.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      </div>
    )
  }
}
export default AddDescModal;
