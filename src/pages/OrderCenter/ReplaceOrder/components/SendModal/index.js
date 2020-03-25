import { Modal, Form, Select, Input } from "antd";
import React, { useState, useEffect } from "react";
import { getExpressListApi } from "api/home/OrderCenter/ReplaceOrder";
const SendModal = props => {
  const [form] = Form.useForm();
  const { visible, order_no } = props;
  const { expressList, setExpressList } = useState([]);
  useEffect(() => {
    getExpressListApi().then(res => {
      if (res.httpCode == 200) {
        setExpressList(res.result);
      }
    });
  }, []);
  //onOk
  const onOk = async () => {
    const [form] = Form.useForm();
    const values = form.validateFields();
    props.onOk(values, resetForm);
  };
  const resetForm = () => {
    form.resetFields();
  };
  //取消
  const onCancel = () => {
    resetForm();
    props.onCancel();
  };
  return (
    <Modal title="发货" visible={visible} onOk={onOk} onCancel={onCancel}>
      <Form form={form}>
        <Form.Item label="单号" name="orderDetailNo">
          {order_no}
        </Form.Item>
        <Form.Item label="快递公司" name="logisticsCode">
          <Select placeholder='请选择快递公司' allowClear={true}>
            {expressList.map(item => (
              <Option value={item.logisticscode}>{item.logisticsname}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="快递单号"
          name="trackingNumber"
          rules={[{ required: true, message: "请选择快递单号" }]}
        >
          <Input placeholder="请输入快递单号" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default SendModal;
