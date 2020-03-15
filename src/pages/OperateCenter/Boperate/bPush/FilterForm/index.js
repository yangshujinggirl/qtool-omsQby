import React, { Component } from "react";
import { Qbtn, BaseFilter } from "common";
import { Form, Row, Col, Input, Button, Select, DatePicker } from "antd";
import "../index.css";
import moment from "moment";
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
              <Form.Item name="title" label="推送标题">
                <Input placeholder="推送标题" autoComplete="off" />
              </Form.Item>
            </Col>
            <Col {...this.colspan}>
              <Form.Item name="creater" label="创建人">
                <Input placeholder="请输入创建人" autoComplete="off" />
              </Form.Item>
            </Col>
            <Col {...this.colspan}>
              <Form.Item name="status" label="推送状态">
                <Select
                  allowClear={true}
                  placeholder="请选择推送状态"
                  className="select"
                >
                  <Option value={10}>待推送</Option>
                  <Option value={20}>已推送</Option>
                  <Option value={30}>已撤销</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col {...this.colspan}>
              <Form.Item name="alertType" label="推送类型">
                <Select
                  allowClear={true}
                  placeholder="请选择推送类型"
                  className="select"
                >
                  <Option value={10}>banner</Option>
                  <Option value={20}>商品</Option>
                  <Option value={30}>url</Option>
                  <Option value={40}>文本</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col {...this.colspan}>
              <Form.Item label="推送时间" name="rangePicker">
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
