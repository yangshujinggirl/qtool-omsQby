import React, { Component } from "react";
import { Modal, Input,Form } from "antd";
const FormItem = Form.Item;
const TexteArea = Input.TexteArea;

class PassModal extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const { status,visible } = this.props;
    return (
      <div>
        <Modal
          title={status == 4 ? "审核通过" : "审核不通过"}
          visible={visible}
          onOk={this.onOk}
          onCancel={this.onCancel}
          okText="确定"
          cancelText="取消"
        >
          <div>
            {status == 4 ? (
              <p>审核通过后该商品可以上架售卖，确认审核？</p>
            ) : (
              <Form>
                <FormItem
                  label="理由"
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 16 }}
                >
                  {getFieldDecorator("remark", {
                    rules: [{ required: true, message: "请输入不通过的理由" }]
                  })(<TexteArea placeholder="请填写不通过理由" />)}
                </FormItem>
              </Form>
            )}
          </div>
        </Modal>
      </div>
    );
  }
}
const PassModals = Form.create({})(PassModal)
export default PassModals
