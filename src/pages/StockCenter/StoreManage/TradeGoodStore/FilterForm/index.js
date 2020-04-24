import React from "react";
import { Qbtn, BaseFilter } from "common";
import { Form, Row, Col, Input, Select } from "antd";
const Option = Select.Option;

class NormalForm extends BaseFilter {
  formRef = React.createRef();
  //初始化
  render() {
    return (
      <div className="qtoolOms-condition">
        <Form ref={this.formRef} className="serach-common-form">
          <Row>
            <Col {...this.colspan}>
              <Form.Item
                name="warehouseName"
                label="仓库名称"
                {...this.formItemLayout}
              >
                <Input placeholder="请输入仓库名称" autoComplete="off" />
              </Form.Item>
            </Col>
            <Col {...this.colspan}>
              <Form.Item
                name="warehouseType"
                label="仓库类型"
                {...this.formItemLayout}
              >
                <Select allowClear={true} placeholder="请选择推送平台">
                  <Option value={1}>大仓</Option>ßß
                  <Option value={2}>门店仓</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col {...this.colspan}>
              <Form.Item
                name="warehouseStatus"
                label="仓库状态"
                {...this.formItemLayout}
              >
                <Select allowClear={true} placeholder="请选择仓库状态">
                  <Option value={1}>启用</Option>
                  <Option value={2}>禁用</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item className="oms-condition-operate">
                <Qbtn type="primary" onClick={this.handleSubmit.bind(this)}>
                  搜索
                </Qbtn>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default NormalForm;
