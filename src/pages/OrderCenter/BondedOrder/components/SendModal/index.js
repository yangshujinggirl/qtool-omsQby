import { Modal, Form, Select, Input } from "antd";
import React, { useState, useEffect } from "react";
import { getExpressListApi } from "api/home/OrderCenter/BondedOrder";
const formLayout = {
  labelCol:{span:6},
  wrapperCol:{span:12}
}
const SendModal = props => {
  const [form] = Form.useForm();
  const { visible,channelOrderNo } = props;
  const [ expressList, setExpressList ] = useState([]);
  useEffect(() => {
    getExpressListApi().then(res => {
      if (res.httpCode == 200) {
        setExpressList(res.result);
      }
    });
  }, []);
  //onOk
  const onOk = async () => {
    const values = await form.validateFields();
    values.channelOrderNo = channelOrderNo;
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
      <Form form={form} {...formLayout} >
        <Form.Item label="保税单号">
          {channelOrderNo}
        </Form.Item>
        <Form.Item label="快递公司" name="logisticsCode">
          <Select placeholder="请选择快递公司" allowClear={true}>
            {(expressList&&expressList.length>0)&&
              expressList.map(item => (
                <Select.Option key={item.logisticsid} value={item.logisticscode}>{item.logisticsname}</Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="快递单号"
          name="trackingNumber"
          rules={[{ required: true, message: "请选择快递单号" }]}
        >
          <Input placeholder="请输入快递单号" autoComplete='off'/>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default SendModal;
