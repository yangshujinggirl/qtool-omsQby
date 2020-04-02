import React, { Component } from "react";
import { Qbtn, BaseFilter } from "common";
import { Form, Row, Col, Input, Button, Select, DatePicker } from "antd";
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

class NormalForm extends BaseFilter {
  formRef = React.createRef();
  //初始化
  render() {
    return (
      <div className="qtoolOms-condition">
        <Form
          ref={this.formRef}
          className="serach-common-form"
          {...this.formItemLayout}
        >
          <Row>
            <Col {...this.colspan}>
              <Form.Item name="reOrderNo" label="退单号">
                <Input placeholder="请输入退单号" autoComplete="off" />
              </Form.Item>
            </Col>
            <Col {...this.colspan}>
              <Form.Item name="channelOrderNo" label="用户订单号">
                <Input placeholder="请输入用户订单号" autoComplete="off" />
              </Form.Item>
            </Col>
            <Col {...this.colspan}>
              <Form.Item name="phone" label="用户手机号">
                <Input placeholder="请输入用户手机号" autoComplete="off" />
              </Form.Item>
            </Col>
            <Col {...this.colspan}>
              <Form.Item name="deliveryType" label="订单类型">
                <Select allowClear={true} placeholder="请选择订单类型">
                  <Option value={1}>仓库直邮</Option>
                  <Option value={2}>保税订单</Option>
                  <Option value={3}>保税订单</Option>
                  <Option value={4}>混合单</Option>
                  <Option value={5}>快递邮寄</Option>
                  <Option value={6}>门店自提</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col {...this.colspan}>
              <Form.Item name="refundType" label="退款类型">
                <Select allowClear={true} placeholder="请选择退款类型">
                  <Option value={1}>售中退款</Option>
                  <Option value={2}>售后退款</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col {...this.colspan}>
              <Form.Item label="创建时间" name="rangePicker">
                <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Col span={24}>
          <Form.Item className="oms-condition-operate">
            <Qbtn type="primary" onClick={this.handleSubmit.bind(this)}>
              搜索
            </Qbtn>
          </Form.Item>
        </Col>
      </div>
    );
  }
}

export default NormalForm;