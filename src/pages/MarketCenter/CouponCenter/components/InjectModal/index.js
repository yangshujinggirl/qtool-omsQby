import React, { Component } from "react";
import { Button, Modal, Form, Input, Select, message } from "antd";
const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;

const InjectCoupon=({...props})=>{
  const onOk = async() => {
    try {
      let values = await props.form.validateFields(['userMobiles','resonance']);
      const { userMobiles } = values;
      let mobileArr = [];
      let isTrue = false;
      if (userMobiles.split("\n").length > 100) {
        this.props.setConfirmLoading(false);
        return message.error("最多支持100行");
      }
      if (userMobiles.indexOf("\n") != -1) {
        mobileArr = userMobiles.split("\n");
        mobileArr.map((item, index) => {
          if (item.length > 11) {//手机号最多11位
            isTrue = true;
          }
          return item;
        });
      } else if (userMobiles.length > 11) {//只输入一个手机号
        isTrue = true;
      }
      if (isTrue) {
        this.props.setConfirmLoading(false);
        return message.error("一行只能输入一个手机号码", 0.8);
      }
      props.onOk(values)
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };
  return (
      <Modal
        destroyOnClose={true}
        visible={props.visible}
        title="注券"
        okText="确定"
        onCancel={props.onCancel}
        onOk={onOk}>
          <FormItem
            label="优惠券名称">
            {props.record.couponName}
          </FormItem>
          <FormItem
            label="用户手机号"
            name="userMobiles"
            rules={[{ required: true, message: "请输入用户手机号" }]}>
            <TextArea
              rows={10}
              placeholder="最多支持100行"
              autoComplete="off"/>
          </FormItem>
          <FormItem
            label="注券理由"
            name="resonance"
            rules={[{ required: true, message: "请输入注券理由" }]}>
            <Select allowClear={true} placeholder="注券理由">
              <Option value="1">售后安抚</Option>
              <Option value="2">高消费赠送</Option>
              <Option value="3">运营活动</Option>
            </Select>
          </FormItem>
      </Modal>
  );
}
export default InjectCoupon;
