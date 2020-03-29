
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
              <Form.Item name="orderNo" label="订单号">
                <Input placeholder="请输入订单号" autoComplete="off" />
              </Form.Item>
            </Col>
            <Col {...this.colspan}>
              <Form.Item name="channelName" label="门店名称">
                <Input placeholder="请输入门店名称" autoComplete="off" />
              </Form.Item>
            </Col>
            <Col {...this.colspan}>
              <Form.Item name="skuCode" label="SKU编码">
                <Input placeholder="请输入SKU编码" autoComplete="off" />
              </Form.Item>
            </Col>
            <Col {...this.colspan}>
              <Form.Item name="productName" label="商品名称">
                <Input placeholder="请输入商品名称" autoComplete="off" />
              </Form.Item>
            </Col>
            <Col {...this.colspan}>
              <Form.Item name="sort" label="订单类型">
                <Select allowClear={true} placeholder="请选择订单类型">
                  <Option value={1}>门店采购单</Option>
                  <Option value={2}>用户订单</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col {...this.colspan}>
              <Form.Item name="deliveryType" label="商品类型">
                <Select allowClear={true} placeholder="请选择商品类型">
                  <Option value={1}>一般贸易商品</Option>
                  <Option value={2}>跨境商品</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col {...this.colspan}>
              <Form.Item label="创建时间" name="time">
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
