
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
              <Form.Item name="spShopName" label="门店名称">
                <Input placeholder="请输入门店名称" autoComplete="off" />
              </Form.Item>
            </Col>
            <Col {...this.colspan}>
              <Form.Item name="orderNo" label="订单号">
                <Input placeholder="请输入订单号" autoComplete="off" />
              </Form.Item>
            </Col>
            <Col {...this.colspan}>
              <Form.Item name="pdSpuName" label="商品名称">
                <Input placeholder="请输入商品名称" autoComplete="off" />
              </Form.Item>
            </Col>
            <Col {...this.colspan}>
              <Form.Item name="code" label="商品编码">
                <Input placeholder="请输入商品编码" autoComplete="off" />
              </Form.Item>
            </Col>
            <Col {...this.colspan}>
              <Form.Item name="orderType" label="订单类型">
                <Select allowClear={true} placeholder="请选择订单类型">
                  <Option value={1}>销售订单</Option>
                  <Option value={2}>退货订单</Option>
                  <Option value={3}>会员充值</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col {...this.colspan}>
              <Form.Item name="status" label="订单状态">
                <Select allowClear={true} placeholder="请选择订单状态">
                  <Option value={10}>代付款</Option>
                  <Option value={20}>已完成</Option>
                  <Option value={30}>已失效</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col {...this.colspan}>
              <Form.Item name="isLocalShop" label="消费门店类型">
                <Select allowClear={true} placeholder="请选择消费门店类型">
                  <Option value={0}>异店</Option>
                  <Option value={1}>本店</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col {...this.colspan}>
              <Form.Item label="订单时间" name="time">
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
