import { Component } from "react";
import { Modal, Form, Input, Select, message } from "antd";
import { AddAtrApi, UpdataAtrApi } from "api/home/Attributions";
const FormItem = Form.Item;
const Option = Select.Option;

class AddAtr extends Component {
  constructor(props) {
    super(props);
  }
  clearForm = () => {
    this.props.form.resetFields();
  };
  onOk = deBounce(() => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { attributeId } = this.props;
        if (attributeId) {//修改
          UpdataAtrApi({ id: attributeId, ...values }).then(res => {
            if (res.httpCode == 200) {
              message.success("保存成功");
              this.props.onOk(this.clearForm);
            }
          });
        } else {//新增
          AddAtrApi(values).then(res => {
            if (res.httpCode == 200) {
              message.success("保存成功");
              this.props.onOk(this.clearForm);
            }
          });
        }
      }
    });
  },500);
  onCancel = () => {
    this.props.onCancel(this.clearForm);
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { attributeId, visible, attributeName, attributeState } = this.props;
    return (
      <div>
        <Modal
          title={attributeId ? "编辑规格" : "新增规格"}
          visible={visible}
          onOk={this.onOk}
          onCancel={this.onCancel}
          okText="确定"
          cancelText="取消"
        >
          <Form>
            <FormItem
              label="规格名称"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator("attributeName", {
                rules: [{ required: true, message: "请输入规格名称" }],
                initialValue: attributeName
              })(<Input placeholder="请输入规格名称" autoComplete="off" />)}
            </FormItem>
            <FormItem
              label="状态"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator("attributeState", {
                rules: [{ required: true, message: "请选择状态" }],
                initialValue: attributeState
              })(
                <Select
                  allowClear={true}
                  placeholder="请选择状态"
                  className="select"
                >
                  <Option value={0}>禁用</Option>
                  <Option value={1}>启用</Option>
                </Select>
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}
const AddAtrs = Form.create({})(AddAtr);
export default AddAtrs;
