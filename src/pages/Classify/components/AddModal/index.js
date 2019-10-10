import React, { Component } from "react";
import { Modal, Form, Select } from "antd";
const FormItem = Form.Item;
const Option = Select.Option;

class AddModal extends Component {
  renderForm() {
    const { level } = this.props;
    const { getFieldDecorator } = this.props.form;
    switch (level) {
      case 1:
        return (
          <div>
            <FormItem
              label="一级分类名称"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator("name1", {
                rules: [{ required: true, message: "请输入类目名称" }],
                initialValue: 1
              })(<Input placeholder="最多20个字符" autoComplete="off" />)}
            </FormItem>
          </div>
        );
      case 2:
        return (
          <div>
            <FormItem
              label="所属一级类目名称"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator("name1", {
                rules: [{ required: true, message: "请输入类目名称" }],
                initialValue: 1
              })(
                <Select>
                  <Option></Option>
                </Select>
              )}
            </FormItem>
            <FormItem
              label="二级类目名称"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator("name1", {
                rules: [{ required: true, message: "请输入类目名称" }],
                initialValue: 1
              })(<Input placeholder="最多20个字符" autoComplete="off" />)}
            </FormItem>
          </div>
        );
      case 3:
        return (
          <div>
            <FormItem
              label="所属一级类目名称"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator("name1", {
                rules: [{ required: true, message: "请输入类目名称" }],
                initialValue: 2
              })(
                <Select>
                  <Option></Option>
                </Select>
              )}
            </FormItem>
            <FormItem
              label="所属二级类目名称"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator("name1", {
                rules: [{ required: true, message: "请输入二级类目名称" }],
                initialValue: 1
              })(
                <Select>
                  <Option></Option>
                </Select>
              )}
            </FormItem>
            <FormItem
              label="三级类目名称"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator("name1", {
                rules: [{ required: true, message: "请输入三级类目名称" }],
                initialValue: 1
              })(<Input placeholder="最多20个字符" autoComplete="off" />)}
            </FormItem>
          </div>
        );
        case 4:
        return (
          <div>
            <FormItem
              label="所属一级类目名称"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator("name1", {
                rules: [{ required: true, message: "请输入类目名称" }],
                initialValue: 2
              })(
                <Select>
                  <Option></Option>
                </Select>
              )}
            </FormItem>
            <FormItem
              label="所属二级类目名称"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator("name1", {
                rules: [{ required: true, message: "请输入二级类目名称" }],
                initialValue: 1
              })(
                <Select>
                  <Option></Option>
                </Select>
              )}
            </FormItem>
            <FormItem
              label="所属三级类目名称"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator("name1", {
                rules: [{ required: true, message: "请输入二级类目名称" }],
                initialValue: 1
              })(
                <Select>
                  <Option></Option>
                </Select>
              )}
            </FormItem>
            <FormItem
              label="四级类目名称"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator("name1", {
                rules: [{ required: true, message: "请输入四级类目名称" }],
                initialValue: 1
              })(<Input placeholder="最多20个字符" autoComplete="off" />)}
            </FormItem>
          </div>
        );
    }
  }
  render() {
    const { visible } = this.props;
    return (
      <div>
        <Modal
          title="新增title"
          onCancel={this.onCancel}
          onOk={this.onOk}
          visible={visible}
        >
          <Form></Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create({})(AddModal);
