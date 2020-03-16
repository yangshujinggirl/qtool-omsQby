import React, { Component } from "react";
import { Qbtn, BaseFilter } from "common";
import { Form, Row, Col, Input, Button, Select, DatePicker } from "antd";
const Option = Select.Option;

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
              <Form.Item name="name" label="banner名称">
                <Input placeholder="请输入banner名称" autoComplete="off" />
              </Form.Item>
            </Col>
            <Col {...this.colspan}>
              <Form.Item name="urUserName" label="创建人">
                <Input placeholder="请输入创建人" autoComplete="off" />
              </Form.Item>
            </Col>
            <Col {...this.colspan}>
              <Form.Item name="status" label="banner状态">
                <Select allowClear={true} placeholder="请选择banner状态">
                  <Option value="1">上线</Option>
                  <Option value="0">下线</Option>
                </Select>
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
