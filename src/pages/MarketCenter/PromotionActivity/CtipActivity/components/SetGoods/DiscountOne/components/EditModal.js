import React, { Component } from "react";
import { Form, Modal, Input } from "antd";
import "../index.less";
const FormItem = Form.Item;
class EditModal extends Component {
  handleCancel = () => {
    this.props.handleCancel();
  };
  handleOk = async() => {
    try {
      let values = await this.props.form.validateFields(['pdCode','max']);
      this.props.handleOk(values);
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };

  render() {
    const { visible, editType, pdCode, max, record } = this.props;
    return (
      <div>
        <Modal
          destroyOnClose={true}
          width={600}
          title={editType == "edit" ? "编辑赠品" : "新增赠品"}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}>
          <div>
            {record.pdCode?
              <FormItem
                labelCol={{ span: 7 }}
                wrapperCol={{ span: 16 }}
                label="赠品编码">
                <span>{record.pdCode}</span>
              </FormItem>
              :
              <FormItem
                labelCol={{ span: 7 }}
                wrapperCol={{ span: 16 }}
                label="赠品编码"
                name="pdCode"
                rules={[{ required: true, message: "请填写赠品编码" }]}>
                  <Input
                    autoComplete="off"
                    style={{ width: "120px" }}
                    placeholder="请输入赠品编码"/>
              </FormItem>
            }
            <FormItem
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 16 }}
              label="最多可参与活动的赠品数">
              <FormItem name="max" noStyle>
                <Input autoComplete="off" style={{ width: "120px" }} placeholder="请输入赠品数"/>
              </FormItem>
              <span className="suffix_tips">
                如不填写视为赠品的所有库存均参与活动
              </span>
            </FormItem>
          </div>
        </Modal>
      </div>
    );
  }
}
export default EditModal;
