import { Modal, Form, Input, Select } from "antd";
import { updateLabelApi } from "api/home/GoodsCenter/BaseConfig/GoodLable";
import React, { useEffect } from "react";

const Option = Select.Option;
const FormItem = Form.Item;

const ExplainModal = props => {
  const [form] = Form.useForm();
  const { tabId, onOk, onCancel, visible } = props;
  useEffect(() => {
    if (tabId) {
      form.setFieldsValue(props);
    }
  });
  const clearForm = () => {
    form.resetFields();
    console.log(form.getFieldsValue());
  };
  const ok = async () => {
    const values = await form.validateFields();
    values.tabName = values.tabName.trim();
    values.tabId = tabId;
    updateLabelApi(values).then(res => {
      if (res.httpCode == 200) {
        onOk(clearForm);
      }
    });
  };
  const cancel = () => {
    onCancel(clearForm);
  };
  return (
    <div>
      <Modal
        title={tabId ? "修改标签" : "新建标签"}
        visible={visible}
        onOk={ok}
        onCancel={cancel}
        maskClosable={false}
      >
        <Form form={form}>
          <FormItem
            label="标签名称"
            name="tabName"
            rules={[{ required: true, message: "请输入标签名称，15字以内" }]}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            <Input
              maxLength="4"
              placeholder="请输入标签名称，4字以内"
              autoComplete="off"
            />
          </FormItem>
          <FormItem
            label="标签状态"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
            name="tabStatus"
            rules={[{ required: true, message: "请选择状态" }]}
          >
            <Select
              allowClear={true}
              placeholder="请选择状态"
              className="select"
            >
              <Option value={1}>启用</Option>
              <Option value={0}>禁用</Option>
            </Select>
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
};
export default ExplainModal;
