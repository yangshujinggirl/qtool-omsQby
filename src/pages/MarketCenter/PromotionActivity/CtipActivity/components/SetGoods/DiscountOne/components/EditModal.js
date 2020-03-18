import React, { Component } from "react";
import { Form, Modal, Input } from "antd";
import "../index.less";
const FormItem = Form.Item;
class EditModal extends Component {
  resetFields = () => {
    this.props.form.resetFields();
  };
  handleCancel = () => {
    this.props.handleCancel(this.resetFields);
  };
  handleOk = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.handleOk(values, this.resetFields);
      }
    });
  };

  render() {
    const { visible, editType, pdCode, max } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Modal  
          width={600}
          title={editType == "edit" ? "编辑赠品" : "新增赠品"}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form>
            {editType == "edit" && (
              <FormItem
                labelCol={{ span: 7 }}
                wrapperCol={{ span: 16 }}
                label="赠品编码"
              >
                <span>{pdCode}</span>
              </FormItem>
            )}
            {editType == "add" && (
              <FormItem
                labelCol={{ span: 7 }}
                wrapperCol={{ span: 16 }}
                label="赠品编码"
              >
                {getFieldDecorator("pdCode", {
                  rules: [{ required: true, message: "请填写赠品编码" }]
                })(
                  <Input
                    autoComplete="off"
                    style={{ width: "120px" }}
                    placeholder="请输入赠品编码"
                  />
                )}
              </FormItem>
            )}
            <FormItem
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 16 }}
              label="最多可参与活动的赠品数:"
            >
              {getFieldDecorator("max", {
                initialValue: editType == "edit" ? max : ""
              })(
                <Input
                  autoComplete="off"
                  style={{ width: "120px" }}
                  placeholder="请输入赠品数"
                />
              )}
              <span className="suffix_tips">
                如不填写视为赠品的所有库存均参与活动
              </span>
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}
const EditModals = Form.create({})(EditModal);
export default EditModals;
