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
              <Form.Item name="title" label="问答标题">
                <Input placeholder="请输入问答标题" autoComplete="off"  allowClear={true} />
              </Form.Item>
            </Col>
            <Col {...this.colspan}>
              <Form.Item name="userName" label="最后修改人">
                <Input placeholder="请输入最后修改人" autoComplete="off"  allowClear={true} />
              </Form.Item>
            </Col>
            <Col {...this.colspan}>
              <Form.Item name="type" label="问题类型">
                <Select
                  allowClear={true}
                  placeholder="请选择问题类型"
                  className="select"
                >
                  <Option value={20}>运营问题 </Option>
                  <Option value={30}>商品问题</Option>
                  <Option value={40}>设计问题</Option>
                  <Option value={50}>招商问题 </Option>
                  <Option value={60}>系统类型 </Option>
                  <Option value={70}>其他 </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col {...this.colspan}>
              <Form.Item name="status" label="问答状态">
                <Select
                  allowClear={true}
                  placeholder="请选择问答状态"
                  className="select"
                >
                  <Option value={1}>上线</Option>
                  <Option value={0}>下线</Option>
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
